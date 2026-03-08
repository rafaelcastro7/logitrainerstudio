import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sparkles, ArrowRight, Zap, Film, Clock, Cpu } from 'lucide-react';
import { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  { icon: Sparkles, title: 'AI Script Generation', desc: 'Multi-scene scripts from a single brief' },
  { icon: Film, title: 'Asset Orchestration', desc: 'Image, audio & video generation in one flow' },
  { icon: Clock, title: 'Timeline Editor', desc: 'Canvas-based editing with multi-track support' },
  { icon: Cpu, title: 'Neural Assistant', desc: 'AI copilot for creative direction' },
];

export function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const { setProjectTitle, addLog } = useProjectStore();
  const [title, setTitle] = useState('');
  const [step, setStep] = useState<'hero' | 'create'>('hero');

  const handleCreate = () => {
    const finalTitle = title.trim() || 'Untitled Project';
    setProjectTitle(finalTitle);
    addLog('success', `Project "${finalTitle}" initialized`);
    addLog('info', 'Neural systems online. Ready for input.');
    onEnter();
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-primary/20 animate-scan-line" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <AnimatePresence mode="wait">
        {step === 'hero' ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
              className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 glow-primary-lg"
            >
              <Activity className="h-10 w-10 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="mb-2 text-5xl font-bold tracking-tight">
                <span className="text-gradient-primary">LogiTrainer</span>
              </h1>
              <p className="mb-1 text-xl font-medium text-foreground">AI Studio 2.0 Pro</p>
              <p className="mb-8 text-sm font-mono text-muted-foreground tracking-wider uppercase">
                Dark Cinematic Industrial Video IDE
              </p>
            </motion.div>

            {/* Feature grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10 grid grid-cols-2 gap-3 max-w-md"
            >
              {features.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 rounded-md border border-border bg-card/50 p-3 text-left backdrop-blur-sm"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{title}</p>
                    <p className="text-[10px] text-muted-foreground">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              onClick={() => setStep('create')}
              className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary"
            >
              <Zap className="h-4 w-4" />
              Initialize Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-4 text-xs font-mono text-muted-foreground/50"
            >
              v2.0.0 • Neural Engine Ready
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md px-4"
          >
            <div className="rounded-lg border border-border bg-card/80 p-8 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/20 border border-primary/30">
                  <Film className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">New Project</h2>
                  <p className="text-xs text-muted-foreground">Name your video production</p>
                </div>
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder="e.g. Cyberpunk Coffee Ad"
                autoFocus
                className="mb-6 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('hero')}
                  className="flex-1 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary"
                >
                  <Sparkles className="h-4 w-4" />
                  Create & Enter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
