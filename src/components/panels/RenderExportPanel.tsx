import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { X, Download, Film, Monitor, Zap, Loader2, Youtube, Instagram, Clapperboard, Smartphone, Tv, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PLATFORM_PRESETS = [
  { id: 'youtube', label: 'YouTube', icon: Youtube, res: '1920×1080', fps: 30, bitrate: '16 Mbps', format: 'mp4', color: 'text-destructive' },
  { id: 'youtube4k', label: 'YouTube 4K', icon: Youtube, res: '3840×2160', fps: 30, bitrate: '45 Mbps', format: 'mp4', color: 'text-destructive' },
  { id: 'instagram', label: 'Instagram Reels', icon: Instagram, res: '1080×1920', fps: 30, bitrate: '8 Mbps', format: 'mp4', color: 'text-primary' },
  { id: 'tiktok', label: 'TikTok', icon: Smartphone, res: '1080×1920', fps: 30, bitrate: '8 Mbps', format: 'mp4', color: 'text-warning' },
  { id: 'cinema', label: 'Cinema DCP', icon: Clapperboard, res: '4096×2160', fps: 24, bitrate: '250 Mbps', format: 'mov', color: 'text-success' },
  { id: 'broadcast', label: 'Broadcast TV', icon: Tv, res: '1920×1080', fps: 25, bitrate: '50 Mbps', format: 'mov', color: 'text-accent-foreground' },
];

const CODECS = [
  { id: 'h264', label: 'H.264 (AVC)', desc: 'Universal compatibility', ext: '.mp4' },
  { id: 'h265', label: 'H.265 (HEVC)', desc: 'Better compression', ext: '.mp4' },
  { id: 'prores', label: 'Apple ProRes 422', desc: 'Professional editing', ext: '.mov' },
  { id: 'prores_hq', label: 'ProRes 422 HQ', desc: 'High quality mastering', ext: '.mov' },
  { id: 'vp9', label: 'VP9 (WebM)', desc: 'Web optimized', ext: '.webm' },
  { id: 'av1', label: 'AV1', desc: 'Next-gen compression', ext: '.mp4' },
];

const QUALITY_PRESETS = [
  { id: 'proxy', label: 'Proxy', bitrate: '1 Mbps', desc: 'Ultra-fast review', icon: Zap },
  { id: 'draft', label: 'Draft', bitrate: '4 Mbps', desc: 'Quick preview', icon: Zap },
  { id: 'standard', label: 'Standard', bitrate: '12 Mbps', desc: 'Good quality', icon: Film },
  { id: 'high', label: 'High', bitrate: '25 Mbps', desc: 'Production ready', icon: Monitor },
  { id: 'master', label: 'Master', bitrate: '80 Mbps', desc: 'Lossless quality', icon: Download },
];

export function RenderExportPanel({ onClose }: { onClose: () => void }) {
  const { projectTitle, projectSettings, timeline, scenes } = useProjectStore();
  const [codec, setCodec] = useState('h264');
  const [quality, setQuality] = useState('high');
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [includeAudio, setIncludeAudio] = useState(true);
  const [burnCaptions, setBurnCaptions] = useState(false);

  const estimatedSize = () => {
    const bitrateMap: Record<string, number> = { proxy: 1, draft: 4, standard: 12, high: 25, master: 80 };
    const mbps = bitrateMap[quality] || 12;
    const sizeMB = (mbps * timeline.duration) / 8;
    return sizeMB < 1000 ? `~${Math.round(sizeMB)} MB` : `~${(sizeMB / 1000).toFixed(1)} GB`;
  };

  const handleSelectPlatform = (id: string) => {
    setSelectedPlatform(selectedPlatform === id ? null : id);
    const preset = PLATFORM_PRESETS.find(p => p.id === id);
    if (preset) {
      const codecMap: Record<string, string> = { mp4: 'h264', mov: 'prores', webm: 'vp9' };
      setCodec(codecMap[preset.format] || 'h264');
    }
  };

  const handleRender = async () => {
    setIsRendering(true);
    setProgress(0);
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 50));
      setProgress(i);
    }
    const exportData = {
      version: '2.0', codec, quality, platform: selectedPlatform,
      settings: projectSettings, includeAudio, burnCaptions,
      exportedAt: new Date().toISOString(),
      project: { title: projectTitle, scenes, timeline },
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '_').toLowerCase()}_render.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsRendering(false);
    toast.success('Export complete!');
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-[640px] max-h-[85vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 border border-success/20">
              <Download className="h-4 w-4 text-success" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">Render & Export</h2>
              <p className="text-[10px] text-muted-foreground">{projectSettings.resolution.width}×{projectSettings.resolution.height} · {projectSettings.fps}fps · {timeline.clips.length} clips</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary transition-colors"><X className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-5">
          {/* Platform presets */}
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              <Share2 className="inline h-3 w-3 mr-1 -mt-0.5" /> Platform Presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORM_PRESETS.map((p) => (
                <button key={p.id} onClick={() => handleSelectPlatform(p.id)} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all ${selectedPlatform === p.id ? 'border-primary/50 bg-primary/10' : 'border-border bg-secondary/20 hover:border-primary/30'}`}>
                  <p.icon className={`h-4 w-4 shrink-0 ${p.color}`} />
                  <div>
                    <p className={`text-[10px] font-bold ${selectedPlatform === p.id ? 'text-primary' : 'text-foreground'}`}>{p.label}</p>
                    <p className="text-[8px] font-mono text-muted-foreground/50">{p.res} · {p.fps}fps</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Codec */}
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Codec</label>
            <div className="grid grid-cols-3 gap-2">
              {CODECS.map((c) => (
                <button key={c.id} onClick={() => setCodec(c.id)} className={`rounded-lg border px-3 py-2 text-left transition-all ${codec === c.id ? 'border-primary/50 bg-primary/10' : 'border-border bg-secondary/20 hover:border-primary/30'}`}>
                  <p className={`text-[10px] font-bold ${codec === c.id ? 'text-primary' : 'text-foreground'}`}>{c.label}</p>
                  <p className="text-[8px] text-muted-foreground/50">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Quality</label>
            <div className="grid grid-cols-5 gap-2">
              {QUALITY_PRESETS.map(({ id, label, bitrate, icon: Icon }) => (
                <button key={id} onClick={() => setQuality(id)} className={`flex flex-col items-center rounded-lg border px-2 py-2.5 transition-all ${quality === id ? 'border-primary/50 bg-primary/10' : 'border-border bg-secondary/20 hover:border-primary/30'}`}>
                  <Icon className={`h-3.5 w-3.5 mb-1 ${quality === id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className={`text-[9px] font-bold ${quality === id ? 'text-primary' : 'text-foreground'}`}>{label}</p>
                  <p className="text-[7px] font-mono text-muted-foreground/50">{bitrate}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-[10px] text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)} className="rounded border-border accent-primary" />
              Include Audio
            </label>
            <label className="flex items-center gap-2 text-[10px] text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={burnCaptions} onChange={(e) => setBurnCaptions(e.target.checked)} className="rounded border-border accent-primary" />
              Burn-in Captions
            </label>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-border/50 bg-secondary/20 p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-wider">Output</p>
              <p className="text-xs text-foreground font-mono mt-0.5">
                {CODECS.find((c) => c.id === codec)?.label} · {QUALITY_PRESETS.find((q) => q.id === quality)?.bitrate} · {estimatedSize()}
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground/40">{Math.round(timeline.duration)}s</span>
          </div>

          {/* Render */}
          {isRendering ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-primary font-medium"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Rendering...</span>
                <span className="font-mono text-muted-foreground">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-border overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-success" animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
              </div>
            </div>
          ) : (
            <button onClick={handleRender} className="w-full flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-3 text-sm font-bold text-success-foreground transition-all hover:brightness-110 font-display">
              <Download className="h-4 w-4" /> Start Render
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
