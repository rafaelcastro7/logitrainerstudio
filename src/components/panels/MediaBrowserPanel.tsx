import { useProjectStore, Asset, AssetType } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { X, Search, Image, Mic, Video, Grid3X3, List, Plus, FolderOpen, Clock, HardDrive, ArrowDownUp, Tag, Star, StarOff, Info } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

const typeIcons: Record<AssetType, typeof Image> = { image: Image, audio: Mic, video: Video };
const typeColors: Record<AssetType, string> = { image: 'text-primary', audio: 'text-success', video: 'text-warning' };

type SortMode = 'name' | 'date' | 'type' | 'duration';

export function MediaBrowserPanel({ onClose }: { onClose: () => void }) {
  const { assets, addAsset, addClip, addLog, timeline } = useProjectStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<AssetType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('name');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [draggedAssetId, setDraggedAssetId] = useState<string | null>(null);

  const assetList = useMemo(() => {
    let list = Object.values(assets)
      .filter((a) => filterType === 'all' || a.type === filterType)
      .filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()));
    if (showFavoritesOnly) list = list.filter(a => favorites.has(a.id));
    list.sort((a, b) => {
      if (sortMode === 'name') return a.name.localeCompare(b.name);
      if (sortMode === 'type') return a.type.localeCompare(b.type);
      if (sortMode === 'duration') return (b.duration || 0) - (a.duration || 0);
      return 0;
    });
    return list;
  }, [assets, filterType, search, sortMode, showFavoritesOnly, favorites]);

  const handleAddToTimeline = (asset: Asset) => {
    const lastClipEnd = timeline.clips
      .filter((c) => c.track === (asset.type === 'audio' ? 'A1' : 'V1'))
      .reduce((max, c) => Math.max(max, c.startTime + c.duration), 0);
    addClip({
      assetId: asset.id,
      track: asset.type === 'audio' ? 'A1' : 'V1',
      startTime: lastClipEnd,
      duration: asset.duration || 5,
      name: asset.name,
    });
    addLog('success', `Added "${asset.name}" to timeline`);
    toast.success(`Added to timeline`);
  };

  const handleImportFiles = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.multiple = true; input.accept = 'image/*,audio/*,video/*';
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        const type: AssetType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('audio/') ? 'audio' : 'video';
        addAsset({ type, url, duration: 5, name: file.name });
        addLog('success', `Imported "${file.name}"`);
      });
      toast.success(`${files.length} file(s) imported`);
    };
    input.click();
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const totalSize = assetList.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-[800px] max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <FolderOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">Media Browser</h2>
              <p className="text-[10px] text-muted-foreground">{totalSize} assets · Drag to timeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleImportFiles} className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:brightness-110 transition-all">
              <Plus className="h-3 w-3" /> Import
            </button>
            <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary transition-colors"><X className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20" />
          </div>

          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            {(['all', 'image', 'audio', 'video'] as const).map((t) => (
              <button key={t} onClick={() => setFilterType(t)} className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-colors ${filterType === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                {t}
              </button>
            ))}
          </div>

          <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)} className={`p-1.5 rounded-lg border transition-colors ${showFavoritesOnly ? 'border-warning/50 bg-warning/10 text-warning' : 'border-border text-muted-foreground hover:bg-secondary'}`}>
            <Star className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Grid3X3 className="h-3.5 w-3.5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><List className="h-3.5 w-3.5" /></button>
          </div>

          <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} className="rounded-lg border border-border bg-background px-2 py-1.5 text-[10px] text-muted-foreground focus:outline-none">
            <option value="name">Name</option>
            <option value="type">Type</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            {assetList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <FolderOpen className="h-12 w-12 text-muted-foreground/15 mb-3" />
                <p className="text-sm text-muted-foreground/50">No assets yet</p>
                <p className="text-xs text-muted-foreground/30 mt-1">Import media or generate assets in Studio</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-4 gap-3">
                {assetList.map((asset) => {
                  const Icon = typeIcons[asset.type];
                  return (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      draggable
                      onDragStart={() => setDraggedAssetId(asset.id)}
                      onDragEnd={() => setDraggedAssetId(null)}
                      className={`group rounded-xl border overflow-hidden cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all ${selectedAsset?.id === asset.id ? 'border-primary/50 bg-primary/5' : 'border-border/50 bg-secondary/20'}`}
                      onClick={() => setSelectedAsset(asset)}
                      onDoubleClick={() => handleAddToTimeline(asset)}
                    >
                      <div className="aspect-video flex items-center justify-center bg-background/50 relative">
                        {asset.type === 'image' && asset.url ? (
                          <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <Icon className={`h-8 w-8 ${typeColors[asset.type]} opacity-30`} />
                        )}
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="text-[10px] font-bold text-primary font-display">+ Timeline</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(asset.id); }} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {favorites.has(asset.id) ? <Star className="h-3 w-3 text-warning fill-warning" /> : <StarOff className="h-3 w-3 text-muted-foreground/50" />}
                        </button>
                        <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white/60 bg-black/50 px-1 rounded">{asset.duration}s</span>
                      </div>
                      <div className="p-2">
                        <p className="text-[10px] font-medium text-foreground truncate">{asset.name}</p>
                        <p className="text-[9px] text-muted-foreground/50 font-mono uppercase">{asset.type}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                {assetList.map((asset) => {
                  const Icon = typeIcons[asset.type];
                  return (
                    <div
                      key={asset.id}
                      draggable
                      onDragStart={() => setDraggedAssetId(asset.id)}
                      onDragEnd={() => setDraggedAssetId(null)}
                      className={`flex items-center gap-3 rounded-lg border px-3 py-2 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group ${selectedAsset?.id === asset.id ? 'border-primary/50 bg-primary/5' : 'border-border/30 bg-secondary/10 hover:bg-secondary/30'}`}
                      onClick={() => setSelectedAsset(asset)}
                      onDoubleClick={() => handleAddToTimeline(asset)}
                    >
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(asset.id); }}>
                        {favorites.has(asset.id) ? <Star className="h-3 w-3 text-warning fill-warning" /> : <StarOff className="h-3 w-3 text-muted-foreground/30 hover:text-muted-foreground" />}
                      </button>
                      <Icon className={`h-4 w-4 ${typeColors[asset.type]}`} />
                      <span className="text-xs text-foreground flex-1 truncate">{asset.name}</span>
                      <span className="text-[9px] font-mono text-muted-foreground/50 uppercase">{asset.type}</span>
                      <span className="text-[9px] font-mono text-muted-foreground/50">{asset.duration}s</span>
                      <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">+ Add</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail sidebar */}
          {selectedAsset && (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} className="border-l border-border p-3 space-y-3 overflow-hidden bg-card/50">
              <div className="flex items-center gap-2">
                <Info className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Details</span>
              </div>
              {selectedAsset.type === 'image' && selectedAsset.url && (
                <img src={selectedAsset.url} alt={selectedAsset.name} className="w-full rounded-lg border border-border/30" />
              )}
              <div className="space-y-1.5">
                <div><span className="text-[9px] text-muted-foreground/50 block">Name</span><span className="text-[10px] text-foreground">{selectedAsset.name}</span></div>
                <div><span className="text-[9px] text-muted-foreground/50 block">Type</span><span className="text-[10px] text-foreground capitalize">{selectedAsset.type}</span></div>
                <div><span className="text-[9px] text-muted-foreground/50 block">Duration</span><span className="text-[10px] text-foreground font-mono">{selectedAsset.duration}s</span></div>
              </div>
              <button onClick={() => handleAddToTimeline(selectedAsset)} className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[10px] font-bold text-primary-foreground hover:brightness-110 transition-all">
                <Plus className="h-3 w-3" /> Add to Timeline
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
