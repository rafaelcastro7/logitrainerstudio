import { useProjectStore } from '@/store/useProjectStore';
import { useAPIStore } from '@/store/useAPIStore';
import { Monitor, Clock, Cpu, HardDrive, ZoomIn } from 'lucide-react';

export function StatusBar() {
  const { projectSettings, timeline, scenes } = useProjectStore();
  const { totalCalls, avgLatency } = useAPIStore();

  const totalDuration = scenes.reduce((acc, s) => acc + s.durationTargetSec, 0);
  const readyAssets = scenes.reduce(
    (acc, s) =>
      acc + (s.status.image === 'ready' ? 1 : 0) + (s.status.audio === 'ready' ? 1 : 0) + (s.status.video === 'ready' ? 1 : 0),
    0
  );

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s2 = Math.floor(sec % 60);
    return `${m}:${s2.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-6 items-center justify-between border-t border-border/40 bg-card/30 backdrop-blur-sm px-4 text-[10px] font-mono text-muted-foreground/50 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Monitor className="h-3 w-3" />
          <span>{projectSettings.resolution.width}×{projectSettings.resolution.height}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{projectSettings.fps} fps</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          <span>{formatDuration(totalDuration)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{scenes.length} scenes</span>
          <span className="text-border">·</span>
          <span>{readyAssets} assets</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <ZoomIn className="h-3 w-3" />
          <span>{timeline.zoom}px/s</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{timeline.clips.length} clips</span>
          <span className="text-border">·</span>
          <span>{timeline.tracks.length} tracks</span>
        </div>
        {totalCalls > 0 && (
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3 w-3" />
            <span>{totalCalls} API calls</span>
            {avgLatency > 0 && <span className="text-border">· {avgLatency}ms avg</span>}
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-success/80" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}
