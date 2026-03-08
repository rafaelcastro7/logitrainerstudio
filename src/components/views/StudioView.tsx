import { useProjectStore } from '@/store/useProjectStore';
import { Image, Mic, Video, Play, Loader2, Zap, Layers, Check, AlertCircle, Eye, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Simulated image thumbnails (colored placeholders)
const sceneColors = ['from-indigo-900/40 to-purple-900/40', 'from-cyan-900/40 to-blue-900/40', 'from-emerald-900/40 to-teal-900/40', 'from-amber-900/40 to-orange-900/40'];

export function StudioView({ onOpenImageLab }: { onOpenImageLab: (sceneId: string) => void }) {
  const { scenes, updateScene, addLog } = useProjectStore();
  const [generatingAssets, setGeneratingAssets] = useState<Record<string, Record<string, boolean>>>({});

  if (scenes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Layers className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Generate a script in the Architect first.</p>
        </div>
      </div>
    );
  }

  const simulateGenerate = (sceneId: string, type: 'image' | 'audio' | 'video') => {
    setGeneratingAssets((prev) => ({
      ...prev,
      [sceneId]: { ...prev[sceneId], [type]: true },
    }));
    updateScene(sceneId, {
      status: { ...scenes.find((s) => s.id === sceneId)!.status, [type]: 'generating' },
    });
    addLog('info', `Generating ${type} for scene ${scenes.find((s) => s.id === sceneId)?.sceneNumber}...`);

    const delay = type === 'video' ? 4000 : type === 'audio' ? 2500 : 2000;
    setTimeout(() => {
      updateScene(sceneId, {
        status: { ...scenes.find((s) => s.id === sceneId)!.status, [type]: 'ready' },
      });
      setGeneratingAssets((prev) => ({
        ...prev,
        [sceneId]: { ...prev[sceneId], [type]: false },
      }));
      addLog('success', `${type} ready for scene ${scenes.find((s) => s.id === sceneId)?.sceneNumber}`);
    }, delay);
  };

  const generateAll = () => {
    scenes.forEach((scene, i) => {
      setTimeout(() => simulateGenerate(scene.id, 'image'), i * 500);
      setTimeout(() => simulateGenerate(scene.id, 'audio'), i * 500 + 800);
    });
  };

  const statusIcon = (status: string) => {
    if (status === 'generating') return <Loader2 className="h-3 w-3 animate-spin text-warning" />;
    if (status === 'ready') return <Check className="h-3 w-3 text-success" />;
    if (status === 'error') return <AlertCircle className="h-3 w-3 text-destructive" />;
    return <div className="h-3 w-3 rounded-full border border-border" />;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1 text-lg font-semibold text-foreground">Asset Studio</h2>
            <p className="text-sm text-muted-foreground">Generate and preview assets for each scene.</p>
          </div>
          <button
            onClick={generateAll}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 glow-primary"
          >
            <Zap className="h-4 w-4" />
            Generate All Assets
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              {/* Scene header */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-surface-highlight/30">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-primary/20 text-xs font-bold text-primary font-mono">
                  {scene.sceneNumber}
                </span>
                <div className="flex-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{scene.sceneType}</span>
                  <span className="mx-2 text-border">•</span>
                  <span className="text-xs font-mono text-muted-foreground">{scene.durationTargetSec}s</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['image', 'audio', 'video'] as const).map((type) => (
                    <div key={type} className="flex items-center gap-1 rounded-full bg-background px-2 py-0.5">
                      {statusIcon(scene.status[type])}
                      <span className="text-[10px] font-mono text-muted-foreground capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scene content */}
              <div className="flex gap-4 p-4">
                {/* Preview / Thumbnail */}
                <div
                  className={`relative h-36 w-64 shrink-0 rounded-md bg-gradient-to-br ${sceneColors[i % sceneColors.length]} border border-border overflow-hidden group cursor-pointer`}
                  onClick={() => scene.status.image === 'ready' && onOpenImageLab(scene.id)}
                >
                  {scene.status.image === 'generating' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                      <div className="text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary mb-1" />
                        <span className="text-[10px] font-mono text-muted-foreground">Generating...</span>
                      </div>
                    </div>
                  )}
                  {scene.status.image === 'ready' && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Image className="mx-auto h-8 w-8 text-primary/60 mb-1" />
                          <span className="text-[10px] font-mono text-success">Ready</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 rounded bg-primary/20 px-2 py-1 text-[10px] font-medium text-primary">
                            <Eye className="h-3 w-3" /> View
                          </button>
                          <button className="flex items-center gap-1 rounded bg-primary/20 px-2 py-1 text-[10px] font-medium text-primary">
                            <Wand2 className="h-3 w-3" /> Edit
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {scene.status.image === 'idle' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                  )}

                  {/* Progress bar */}
                  {scene.status.image === 'generating' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: '0%' }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 2, ease: 'linear' }}
                      />
                    </div>
                  )}
                </div>

                {/* Prompt & Actions */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/80 leading-relaxed mb-2 line-clamp-2">{scene.visualPrompt}</p>
                  <p className="text-xs text-muted-foreground/60 italic mb-4 line-clamp-1">"{scene.voiceOverScript}"</p>

                  <div className="flex gap-2">
                    {[
                      { type: 'image' as const, icon: Image, label: 'Image' },
                      { type: 'audio' as const, icon: Mic, label: 'Audio' },
                      { type: 'video' as const, icon: Video, label: 'Video' },
                    ].map(({ type, icon: Icon, label }) => {
                      const isGen = generatingAssets[scene.id]?.[type];
                      const isReady = scene.status[type] === 'ready';
                      return (
                        <button
                          key={type}
                          onClick={() => !isGen && simulateGenerate(scene.id, type)}
                          disabled={isGen}
                          className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition-all ${
                            isReady
                              ? 'border-success/30 bg-success/10 text-success'
                              : isGen
                              ? 'border-warning/30 bg-warning/10 text-warning cursor-wait'
                              : 'border-border bg-secondary text-secondary-foreground hover:border-primary/30 hover:text-primary'
                          }`}
                        >
                          {isGen ? <Loader2 className="h-3 w-3 animate-spin" /> : <Icon className="h-3 w-3" />}
                          {isGen ? 'Working...' : isReady ? `${label} ✓` : `Gen ${label}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
