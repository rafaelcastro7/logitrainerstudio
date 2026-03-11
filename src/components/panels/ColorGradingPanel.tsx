import { motion } from 'framer-motion';
import { Palette, SunDim, Contrast, Droplets, Thermometer, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { useState, useCallback, useRef, useEffect } from 'react';

interface ColorGradingSettings {
  brightness: number; contrast: number; saturation: number; temperature: number;
  tint: number; exposure: number; highlights: number; shadows: number;
  vibrance: number; gamma: number; gain: number; lift: number;
}

const DEFAULT_SETTINGS: ColorGradingSettings = {
  brightness: 0, contrast: 0, saturation: 0, temperature: 0,
  tint: 0, exposure: 0, highlights: 0, shadows: 0,
  vibrance: 0, gamma: 0, gain: 0, lift: 0,
};

const PRESETS = [
  { name: 'Cinematic', settings: { brightness: -5, contrast: 15, saturation: -10, temperature: -8, tint: 0, exposure: -3, highlights: -10, shadows: 5, vibrance: 10, gamma: 0, gain: 5, lift: -3 } },
  { name: 'Warm Film', settings: { brightness: 5, contrast: 8, saturation: -5, temperature: 15, tint: 5, exposure: 3, highlights: -5, shadows: 8, vibrance: 5, gamma: 3, gain: 0, lift: 0 } },
  { name: 'Cool Tone', settings: { brightness: 0, contrast: 10, saturation: -8, temperature: -15, tint: -3, exposure: 0, highlights: -8, shadows: 3, vibrance: 8, gamma: -2, gain: 0, lift: 2 } },
  { name: 'Teal & Orange', settings: { brightness: 0, contrast: 12, saturation: 8, temperature: -10, tint: -5, exposure: 0, highlights: 5, shadows: -5, vibrance: 15, gamma: 0, gain: 3, lift: -2 } },
  { name: 'Bleach Bypass', settings: { brightness: -3, contrast: 25, saturation: -30, temperature: 0, tint: 0, exposure: -5, highlights: -15, shadows: -10, vibrance: -10, gamma: 5, gain: 8, lift: -5 } },
  { name: 'Day for Night', settings: { brightness: -25, contrast: 10, saturation: -15, temperature: -20, tint: -10, exposure: -15, highlights: -20, shadows: 5, vibrance: -5, gamma: -8, gain: -10, lift: 5 } },
  { name: 'Vintage', settings: { brightness: 3, contrast: -5, saturation: -20, temperature: 10, tint: 8, exposure: 5, highlights: -8, shadows: 12, vibrance: -15, gamma: 2, gain: -3, lift: 5 } },
  { name: 'High Key', settings: { brightness: 15, contrast: -5, saturation: -3, temperature: 3, tint: 0, exposure: 10, highlights: 15, shadows: 10, vibrance: -5, gamma: 5, gain: 10, lift: 8 } },
];

const LUTS = [
  { name: 'Rec.709', desc: 'Standard broadcast' },
  { name: 'Log to Rec.709', desc: 'S-Log / V-Log conversion' },
  { name: 'ACES', desc: 'Academy Color Encoding' },
  { name: 'Film Emulation', desc: 'Kodak 2393 print' },
];

function GradingSlider({ label, value, onChange, min = -100, max = 100, icon: Icon }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; icon: typeof SunDim;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const range = max - min;
  const percent = ((value - min) / range) * 100;
  const zeroPercent = ((0 - min) / range) * 100;

  return (
    <div className="space-y-0.5 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
          <span className="text-[10px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">{label}</span>
        </div>
        <span className={`text-[10px] font-mono tabular-nums cursor-pointer ${value !== 0 ? 'text-primary' : 'text-muted-foreground/30'}`} onDoubleClick={() => onChange(0)}>
          {value > 0 ? '+' : ''}{value}
        </span>
      </div>
      <div ref={trackRef} className="relative h-3 flex items-center cursor-pointer" onClick={(e) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        onChange(Math.round(min + pct * range));
      }}>
        <div className="absolute inset-x-0 h-1 rounded-full bg-border/60">
          {/* Zero mark */}
          <div className="absolute top-0 bottom-0 w-px bg-muted-foreground/20" style={{ left: `${zeroPercent}%` }} />
          {/* Fill */}
          <div className="absolute top-0 bottom-0 rounded-full bg-primary/60" style={{
            left: value >= 0 ? `${zeroPercent}%` : `${percent}%`,
            width: `${Math.abs(percent - zeroPercent)}%`
          }} />
        </div>
        {/* Thumb */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-primary border-2 border-card shadow-md -translate-x-1/2 hover:scale-125 transition-transform" style={{ left: `${percent}%` }} />
      </div>
    </div>
  );
}

/** Mini color wheel for Lift/Gamma/Gain */
function ColorWheel({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 64;
    canvas.width = size; canvas.height = size;
    const cx = size / 2; const cy = size / 2; const r = size / 2 - 4;

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.fillStyle = `hsl(${angle}, 70%, 50%)`; ctx.fill();
    }
    // Inner dark circle
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(228, 28%, 8%)'; ctx.fill();
    // Center indicator
    const indicatorAngle = (value / 100) * Math.PI * 2 - Math.PI / 2;
    const ix = cx + Math.cos(indicatorAngle) * r * 0.35;
    const iy = cy + Math.sin(indicatorAngle) * r * 0.35;
    ctx.beginPath(); ctx.arc(ix, iy, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1; ctx.stroke();
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1">
      <canvas ref={canvasRef} className="w-16 h-16 rounded-full cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
      <span className="text-[9px] font-mono text-muted-foreground/50 uppercase">{label}</span>
      <span className="text-[9px] font-mono text-primary">{value}</span>
    </div>
  );
}

export function ColorGradingPanel({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState<ColorGradingSettings>(DEFAULT_SETTINGS);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'basic' | 'wheels' | 'curves' | 'luts'>('basic');

  const updateSetting = useCallback((key: keyof ColorGradingSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  const applyPreset = (name: string, presetSettings: ColorGradingSettings) => {
    setSettings(presetSettings);
    setActivePreset(name);
  };

  const resetAll = () => { setSettings(DEFAULT_SETTINGS); setActivePreset(null); };

  const cssFilter = `brightness(${1 + settings.brightness / 100}) contrast(${1 + settings.contrast / 100}) saturate(${1 + settings.saturation / 100}) hue-rotate(${settings.temperature}deg)`;

  const tabs = [
    { id: 'basic' as const, label: 'Basic' },
    { id: 'wheels' as const, label: 'Wheels' },
    { id: 'curves' as const, label: 'Curves' },
    { id: 'luts' as const, label: 'LUTs' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg max-h-[90vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15"><Palette className="h-4 w-4 text-primary" /></div>
            <div>
              <h2 className="font-display text-sm font-bold text-foreground">Color Grading</h2>
              <p className="text-[9px] text-muted-foreground">DaVinci-style color correction</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowPreview(!showPreview)} className={`rounded-lg p-1.5 transition-colors ${showPreview ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted/50'}`}>
              {showPreview ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            </button>
            <button onClick={resetAll} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/50 transition-colors"><RotateCcw className="h-3.5 w-3.5" /></button>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted/50 transition-colors text-lg">✕</button>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="p-3 border-b border-border">
            <div className="relative h-28 rounded-lg bg-black overflow-hidden" style={{ filter: cssFilter }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-warning/10 to-success/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-6 gap-0.5 w-3/4">
                  {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#C0C0C0', '#808080', '#404040', '#202020', '#000000'].map((c, i) => (
                    <div key={i} className="aspect-square rounded-sm" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              {activePreset && (
                <div className="absolute top-2 right-2 text-[8px] font-mono text-white/60 bg-black/50 px-1.5 py-0.5 rounded">{activePreset}</div>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground/50 hover:text-muted-foreground'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'basic' && (
            <div className="p-4 space-y-2.5">
              {/* Presets */}
              <div className="mb-3">
                <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1.5">Presets</p>
                <div className="flex flex-wrap gap-1">
                  {PRESETS.map(({ name, settings: ps }) => (
                    <button key={name} onClick={() => applyPreset(name, ps)} className={`rounded-md px-2 py-1 text-[9px] font-medium transition-all ${activePreset === name ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-secondary/50 text-muted-foreground/70 hover:bg-secondary border border-transparent'}`}>
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider">Adjustments</p>
              <GradingSlider label="Exposure" value={settings.exposure} onChange={(v) => updateSetting('exposure', v)} icon={SunDim} />
              <GradingSlider label="Brightness" value={settings.brightness} onChange={(v) => updateSetting('brightness', v)} icon={SunDim} />
              <GradingSlider label="Contrast" value={settings.contrast} onChange={(v) => updateSetting('contrast', v)} icon={Contrast} />
              <GradingSlider label="Highlights" value={settings.highlights} onChange={(v) => updateSetting('highlights', v)} icon={SunDim} />
              <GradingSlider label="Shadows" value={settings.shadows} onChange={(v) => updateSetting('shadows', v)} icon={SunDim} />
              <GradingSlider label="Saturation" value={settings.saturation} onChange={(v) => updateSetting('saturation', v)} icon={Droplets} />
              <GradingSlider label="Vibrance" value={settings.vibrance} onChange={(v) => updateSetting('vibrance', v)} icon={Palette} />
              <GradingSlider label="Temperature" value={settings.temperature} onChange={(v) => updateSetting('temperature', v)} icon={Thermometer} />
            </div>
          )}

          {activeTab === 'wheels' && (
            <div className="p-4">
              <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-3">Color Wheels</p>
              <div className="flex justify-around">
                <ColorWheel label="Lift" value={settings.lift} onChange={(v) => updateSetting('lift', v)} />
                <ColorWheel label="Gamma" value={settings.gamma} onChange={(v) => updateSetting('gamma', v)} />
                <ColorWheel label="Gain" value={settings.gain} onChange={(v) => updateSetting('gain', v)} />
              </div>
              <div className="mt-4 space-y-2.5">
                <GradingSlider label="Lift" value={settings.lift} onChange={(v) => updateSetting('lift', v)} icon={SunDim} />
                <GradingSlider label="Gamma" value={settings.gamma} onChange={(v) => updateSetting('gamma', v)} icon={SunDim} />
                <GradingSlider label="Gain" value={settings.gain} onChange={(v) => updateSetting('gain', v)} icon={SunDim} />
              </div>
            </div>
          )}

          {activeTab === 'curves' && (
            <div className="p-4">
              <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-3">Tone Curves</p>
              <CurvesEditor />
            </div>
          )}

          {activeTab === 'luts' && (
            <div className="p-4 space-y-2">
              <p className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-2">Look-Up Tables</p>
              {LUTS.map((lut) => (
                <button key={lut.name} className="w-full flex items-center gap-3 rounded-lg border border-border/50 bg-secondary/20 px-3 py-2.5 text-left hover:border-primary/30 hover:bg-secondary/40 transition-all">
                  <div className="w-10 h-6 rounded bg-gradient-to-r from-primary/30 to-warning/30" />
                  <div>
                    <p className="text-[10px] font-bold text-foreground">{lut.name}</p>
                    <p className="text-[8px] text-muted-foreground/50">{lut.desc}</p>
                  </div>
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-3 text-[10px] text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                + Import Custom LUT
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Simple curves editor placeholder */
function CurvesEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [channel, setChannel] = useState<'rgb' | 'r' | 'g' | 'b'>('rgb');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width = 220; const h = canvas.height = 220;

    ctx.clearRect(0, 0, w, h);
    // Background
    ctx.fillStyle = 'hsl(228, 28%, 6%)'; ctx.fillRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo((w / 4) * i, 0); ctx.lineTo((w / 4) * i, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (h / 4) * i); ctx.lineTo(w, (h / 4) * i); ctx.stroke();
    }
    // Diagonal (identity)
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(w, 0); ctx.stroke();
    ctx.setLineDash([]);
    // Curve
    const colors = { rgb: '#ffffff', r: '#ff4444', g: '#44ff44', b: '#4488ff' };
    ctx.strokeStyle = colors[channel]; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, h);
    ctx.bezierCurveTo(w * 0.25, h * 0.85, w * 0.75, h * 0.15, w, 0);
    ctx.stroke();
    // Control points
    ctx.fillStyle = colors[channel];
    [[w * 0.25, h * 0.85], [w * 0.75, h * 0.15]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    });
    // Histogram hint
    ctx.globalAlpha = 0.1; ctx.fillStyle = colors[channel];
    for (let i = 0; i < w; i++) {
      const v = Math.sin(i / w * Math.PI) * h * 0.3 + Math.random() * h * 0.05;
      ctx.fillRect(i, h - v, 1, v);
    }
    ctx.globalAlpha = 1;
  }, [channel]);

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {(['rgb', 'r', 'g', 'b'] as const).map(ch => (
          <button key={ch} onClick={() => setChannel(ch)} className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${channel === ch ? 'bg-primary/15 text-primary' : 'text-muted-foreground/50 hover:text-muted-foreground'}`}>
            {ch}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} className="w-full rounded-lg border border-border/30 cursor-crosshair" style={{ aspectRatio: '1' }} />
      <p className="text-[8px] text-muted-foreground/40 mt-1 text-center">Click to add control points • Double-click to remove</p>
    </div>
  );
}
