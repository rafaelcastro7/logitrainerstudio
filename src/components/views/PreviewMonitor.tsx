import { useProjectStore, TimelineClip, TimelineTransition, TransitionType } from '@/store/useProjectStore';
import { Film, Play, Pause, Maximize2, Volume2, VolumeX, Grid3X3, Scan, RectangleHorizontal, SkipBack, SkipForward, ChevronFirst, ChevronLast } from 'lucide-react';
import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRANSITION_LABELS: Record<TransitionType, string> = {
  'none': 'Cut', 'fade': 'Fade', 'dissolve': 'Dissolve',
  'wipe-left': 'Wipe ←', 'wipe-right': 'Wipe →', 'wipe-up': 'Wipe ↑', 'wipe-down': 'Wipe ↓',
  'zoom-in': 'Zoom In', 'zoom-out': 'Zoom Out', 'slide-left': 'Slide ←', 'slide-right': 'Slide →',
};

const ASPECT_RATIOS = [
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '2.39:1', value: 2.39 },
];

export function PreviewMonitor() {
  const { timeline, scenes, togglePlay, setPlayhead, projectSettings } = useProjectStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullPreview, setIsFullPreview] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [showAspectGuide, setShowAspectGuide] = useState(false);
  const [aspectGuide, setAspectGuide] = useState(16 / 9);
  const [showOverlayMenu, setShowOverlayMenu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentClip = useMemo(() => {
    return timeline.clips
      .filter((c) => c.track.startsWith('V'))
      .sort((a, b) => a.startTime - b.startTime)
      .find((c) => timeline.playheadPosition >= c.startTime && timeline.playheadPosition < c.startTime + c.duration);
  }, [timeline.clips, timeline.playheadPosition]);

  const currentScene = currentClip ? scenes.find((s) => s.id === currentClip.assetId) : null;

  const activeTransition = useMemo(() => {
    if (!currentClip) return null;
    const transitions = timeline.transitions || [];
    for (const t of transitions) {
      const fromClip = timeline.clips.find((c) => c.id === t.fromClipId);
      const toClip = timeline.clips.find((c) => c.id === t.toClipId);
      if (!fromClip || !toClip) continue;
      const transitionStart = fromClip.startTime + fromClip.duration - t.duration;
      const transitionEnd = fromClip.startTime + fromClip.duration;
      if (timeline.playheadPosition >= transitionStart && timeline.playheadPosition < transitionEnd) {
        return { transition: t, progress: (timeline.playheadPosition - transitionStart) / t.duration, fromClip, toClip };
      }
    }
    return null;
  }, [timeline.clips, timeline.transitions, timeline.playheadPosition, currentClip]);

  const videoClips = useMemo(() => {
    return timeline.clips.filter((c) => c.track.startsWith('V')).sort((a, b) => a.startTime - b.startTime);
  }, [timeline.clips]);

  const totalDuration = useMemo(() => {
    if (videoClips.length === 0) return timeline.duration;
    const last = videoClips[videoClips.length - 1];
    return Math.max(last.startTime + last.duration, timeline.duration);
  }, [videoClips, timeline.duration]);

  const formatTC = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor(sec % 60);
    const f = Math.floor((sec % 1) * (projectSettings?.fps || 30));
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${f.toString().padStart(2, '0')}`;
  };

  // Render transition effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    if (!activeTransition) return;
    const { transition, progress } = activeTransition;
    switch (transition.type) {
      case 'fade': ctx.fillStyle = `rgba(0,0,0,${progress})`; ctx.fillRect(0, 0, w, h); break;
      case 'dissolve': ctx.fillStyle = `rgba(0,0,0,${Math.sin(progress * Math.PI) * 0.5})`; ctx.fillRect(0, 0, w, h); break;
      case 'wipe-left':
        ctx.fillStyle = 'hsl(var(--primary))'; ctx.globalAlpha = 0.15; ctx.fillRect(0, 0, w * progress, h); ctx.globalAlpha = 1;
        ctx.strokeStyle = 'hsl(var(--primary))'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * progress, 0); ctx.lineTo(w * progress, h); ctx.stroke(); break;
      case 'wipe-right':
        ctx.fillStyle = 'hsl(var(--primary))'; ctx.globalAlpha = 0.15; ctx.fillRect(w * (1 - progress), 0, w * progress, h); ctx.globalAlpha = 1;
        ctx.strokeStyle = 'hsl(var(--primary))'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(w * (1 - progress), 0); ctx.lineTo(w * (1 - progress), h); ctx.stroke(); break;
      case 'wipe-up': case 'wipe-down': {
        const y = transition.type === 'wipe-down' ? h * progress : h * (1 - progress);
        ctx.fillStyle = 'hsl(var(--primary))'; ctx.globalAlpha = 0.15; ctx.fillRect(0, transition.type === 'wipe-down' ? 0 : y, w, h * progress); ctx.globalAlpha = 1;
        ctx.strokeStyle = 'hsl(var(--primary))'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); break;
      }
      case 'zoom-in': ctx.fillStyle = `rgba(0,0,0,${progress * 0.3})`; ctx.fillRect(0, 0, w, h); break;
      case 'zoom-out': ctx.fillStyle = `rgba(0,0,0,${(1 - progress) * 0.3})`; ctx.fillRect(0, 0, w, h); break;
      case 'slide-left': case 'slide-right':
        const dir = transition.type === 'slide-left' ? -1 : 1;
        ctx.fillStyle = 'hsl(var(--primary))'; ctx.globalAlpha = 0.08; ctx.fillRect(dir > 0 ? w * (1 - progress) : 0, 0, w * progress, h); ctx.globalAlpha = 1; break;
    }
  }, [activeTransition]);

  const handleMiniTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setPlayhead(Math.max(0, Math.min(pct * totalDuration, totalDuration)));
  }, [setPlayhead, totalDuration]);

  const jumpToClip = (direction: 'prev' | 'next') => {
    const sorted = videoClips;
    if (sorted.length === 0) return;
    if (direction === 'next') {
      const next = sorted.find(c => c.startTime > timeline.playheadPosition + 0.01);
      if (next) setPlayhead(next.startTime);
    } else {
      const prev = [...sorted].reverse().find(c => c.startTime < timeline.playheadPosition - 0.01);
      if (prev) setPlayhead(prev.startTime);
      else setPlayhead(0);
    }
  };

  const previewHeight = isFullPreview ? 340 : 180;

  return (
    <div className="flex flex-col border-b border-border bg-card/30">
      {/* Transport controls */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border/50">
        <div className="flex items-center gap-0.5">
          <button onClick={() => setPlayhead(0)} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <ChevronFirst className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => jumpToClip('prev')} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <SkipBack className="h-3 w-3" />
          </button>
          <button onClick={togglePlay} className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
            {timeline.isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
          </button>
          <button onClick={() => jumpToClip('next')} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <SkipForward className="h-3 w-3" />
          </button>
          <button onClick={() => setPlayhead(totalDuration)} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <ChevronLast className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mx-2 h-3 w-px bg-border/50" />

        <span className="font-mono text-[10px] text-primary tabular-nums tracking-tight">{formatTC(timeline.playheadPosition)}</span>
        <span className="text-[9px] text-muted-foreground/30 mx-1">/</span>
        <span className="font-mono text-[10px] text-muted-foreground/40 tabular-nums tracking-tight">{formatTC(totalDuration)}</span>

        {activeTransition && (
          <span className="ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            {TRANSITION_LABELS[activeTransition.transition.type]} {Math.round(activeTransition.progress * 100)}%
          </span>
        )}

        <div className="ml-auto flex items-center gap-1">
          {/* Overlay tools */}
          <div className="relative">
            <button
              onClick={() => setShowOverlayMenu(!showOverlayMenu)}
              className={`flex h-5 w-5 items-center justify-center rounded transition-colors ${showGrid || showSafeZones || showAspectGuide ? 'text-primary bg-primary/10' : 'text-muted-foreground/50 hover:text-foreground'}`}
            >
              <Grid3X3 className="h-3 w-3" />
            </button>
            {showOverlayMenu && (
              <div className="absolute right-0 top-6 z-30 w-44 rounded-lg border border-border bg-card shadow-xl p-1.5 space-y-0.5">
                <button onClick={() => { setShowGrid(!showGrid); }} className={`w-full flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[10px] transition-colors ${showGrid ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <Grid3X3 className="h-3 w-3" /> Rule of Thirds
                </button>
                <button onClick={() => { setShowSafeZones(!showSafeZones); }} className={`w-full flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[10px] transition-colors ${showSafeZones ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <Scan className="h-3 w-3" /> Safe Zones (Title/Action)
                </button>
                <button onClick={() => { setShowAspectGuide(!showAspectGuide); }} className={`w-full flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[10px] transition-colors ${showAspectGuide ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  <RectangleHorizontal className="h-3 w-3" /> Aspect Ratio Guide
                </button>
                {showAspectGuide && (
                  <div className="flex gap-1 px-2 pt-1">
                    {ASPECT_RATIOS.map(ar => (
                      <button key={ar.label} onClick={() => setAspectGuide(ar.value)} className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${aspectGuide === ar.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                        {ar.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setIsMuted(!isMuted)} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground transition-colors">
            {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
          </button>
          <button onClick={() => setIsFullPreview(!isFullPreview)} className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/50 hover:text-foreground transition-colors">
            <Maximize2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main preview area */}
      <div className="relative flex items-center justify-center bg-black overflow-hidden transition-all duration-300" style={{ height: previewHeight }} onClick={() => showOverlayMenu && setShowOverlayMenu(false)}>
        {currentScene ? (
          <div className="flex h-full w-full">
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center bg-secondary/5">
                  {/* Scene badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm text-[11px] font-bold text-primary font-mono border border-primary/20">
                      {currentScene.sceneNumber}
                    </span>
                    <span className="text-[10px] font-semibold text-foreground/80 font-display bg-background/60 backdrop-blur-sm rounded px-2 py-0.5">
                      {currentScene.sceneType}
                    </span>
                  </div>

                  {/* Center visual */}
                  <div className="text-center px-8 max-w-sm">
                    <Film className="mx-auto h-8 w-8 text-muted-foreground/15 mb-2" />
                    <p className="text-[11px] text-foreground/50 leading-relaxed line-clamp-3">{currentScene.visualPrompt}</p>
                  </div>

                  {/* Opacity overlay */}
                  {currentClip && (currentClip.opacity ?? 100) < 100 && (
                    <div className="absolute inset-0 bg-background pointer-events-none" style={{ opacity: 1 - (currentClip.opacity ?? 100) / 100 }} />
                  )}

                  {/* Transition canvas */}
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                  {/* === OVERLAY: Rule of Thirds === */}
                  {showGrid && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
                      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
                      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
                      {/* Power points */}
                      {[1/3, 2/3].map(x => [1/3, 2/3].map(y => (
                        <div key={`${x}-${y}`} className="absolute w-1.5 h-1.5 rounded-full bg-white/30" style={{ left: `calc(${x * 100}% - 3px)`, top: `calc(${y * 100}% - 3px)` }} />
                      )))}
                    </div>
                  )}

                  {/* === OVERLAY: Safe Zones === */}
                  {showSafeZones && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      {/* Action safe (90%) */}
                      <div className="absolute border border-dashed border-success/40" style={{ left: '5%', top: '5%', right: '5%', bottom: '5%' }}>
                        <span className="absolute -top-3.5 left-1 text-[7px] font-mono text-success/60 bg-black/40 px-1 rounded">ACTION SAFE</span>
                      </div>
                      {/* Title safe (80%) */}
                      <div className="absolute border border-dashed border-warning/40" style={{ left: '10%', top: '10%', right: '10%', bottom: '10%' }}>
                        <span className="absolute -top-3.5 left-1 text-[7px] font-mono text-warning/60 bg-black/40 px-1 rounded">TITLE SAFE</span>
                      </div>
                      {/* Center crosshair */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/25 -translate-x-1/2" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/25 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  {/* === OVERLAY: Aspect Ratio Guide === */}
                  {showAspectGuide && (
                    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                      <AspectGuide ratio={aspectGuide} />
                    </div>
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-2">
                      {(['image', 'audio', 'video'] as const).map((type) => (
                        <span key={type} className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${currentScene.status[type] === 'ready' ? 'bg-success/15 text-success' : currentScene.status[type] === 'generating' ? 'bg-warning/15 text-warning' : 'bg-secondary/50 text-muted-foreground/40'}`}>
                          {type}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-white/50">{currentScene.durationTargetSec}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded metadata */}
            {isFullPreview && (
              <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="border-l border-border/50 p-3 flex flex-col gap-3 bg-card/80 overflow-hidden">
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1">Visual Prompt</p>
                  <p className="text-[10px] text-foreground/60 leading-relaxed line-clamp-4">{currentScene.visualPrompt}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1">Voiceover</p>
                  <p className="text-[10px] text-foreground/40 italic leading-relaxed line-clamp-3">"{currentScene.voiceOverScript}"</p>
                </div>
                {currentClip && (
                  <div className="border-t border-border/30 pt-2 space-y-1">
                    <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1">Clip</p>
                    <div className="flex justify-between text-[10px]"><span className="text-muted-foreground/50">Opacity</span><span className="text-foreground/70 font-mono">{currentClip.opacity ?? 100}%</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-muted-foreground/50">Volume</span><span className="text-foreground/70 font-mono">{currentClip.volume ?? 100}%</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-muted-foreground/50">Speed</span><span className="text-foreground/70 font-mono">{currentClip.speed ?? 1}x</span></div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Film className="mx-auto h-8 w-8 text-muted-foreground/10 mb-1" />
            <p className="text-[10px] text-muted-foreground/30 font-mono">{timeline.clips.length === 0 ? 'Add clips to preview' : 'Move playhead over a clip'}</p>
          </div>
        )}

        {timeline.isPlaying && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-[9px] font-mono text-destructive font-bold">REC</span>
          </div>
        )}
      </div>

      {/* Mini timeline */}
      <div className="h-7 bg-card/50 border-t border-border/30 cursor-pointer relative group" onClick={handleMiniTimelineClick}>
        {videoClips.map((clip) => {
          const scene = scenes.find((s) => s.id === clip.assetId);
          const left = totalDuration > 0 ? (clip.startTime / totalDuration) * 100 : 0;
          const width = totalDuration > 0 ? (clip.duration / totalDuration) * 100 : 0;
          return (
            <div key={clip.id} className={`absolute top-0.5 bottom-0.5 rounded-sm ${clip.id === currentClip?.id ? 'bg-primary/30 border border-primary/50' : 'bg-primary/10 border border-primary/20'}`} style={{ left: `${left}%`, width: `${width}%` }}>
              <span className="text-[7px] font-mono text-primary/60 px-1 truncate block leading-6">{scene ? `S${scene.sceneNumber}` : ''}</span>
            </div>
          );
        })}
        {(timeline.transitions || []).map((t) => {
          const fromClip = timeline.clips.find((c) => c.id === t.fromClipId);
          if (!fromClip) return null;
          const pos = totalDuration > 0 ? ((fromClip.startTime + fromClip.duration) / totalDuration) * 100 : 0;
          return <div key={t.id} className="absolute top-0 bottom-0 w-0.5 bg-warning/60 z-10" style={{ left: `${pos}%` }} />;
        })}
        <div className="absolute top-0 bottom-0 w-0.5 bg-primary z-20 pointer-events-none" style={{ left: `${totalDuration > 0 ? (timeline.playheadPosition / totalDuration) * 100 : 0}%` }}>
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]" />
        </div>
      </div>
    </div>
  );
}

/** Aspect ratio guide overlay */
function AspectGuide({ ratio }: { ratio: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="border-2 border-cyan-400/40 rounded-sm"
        style={{
          aspectRatio: ratio,
          maxWidth: '90%',
          maxHeight: '90%',
          width: ratio >= 1 ? '90%' : 'auto',
          height: ratio < 1 ? '90%' : 'auto',
        }}
      >
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-400/70 bg-black/50 px-1.5 rounded">
          {ratio === 16/9 ? '16:9' : ratio === 9/16 ? '9:16' : ratio === 1 ? '1:1' : ratio === 4/3 ? '4:3' : '2.39:1'}
        </span>
      </div>
    </div>
  );
}
