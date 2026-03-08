import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import heroBg from '@/assets/hero-bg.jpg';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function Auth() {
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast.success('Password reset email sent. Check your inbox.');
        setMode('login');
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, displayName);
        if (error) throw error;
        toast.success('Account created! Check your email to verify your account.');
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const titles = {
    login: 'Welcome Back',
    signup: 'Create Account',
    forgot: 'Reset Password',
  };

  const subtitles = {
    login: 'Sign in to your production workspace',
    signup: 'Start creating AI-powered video content',
    forgot: 'Enter your email to receive a reset link',
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
            <Activity className="h-7 w-7 text-primary" />
          </div>
          <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">NeuroStudio</span>
        </div>

        <div className="rounded-lg border border-border bg-card/80 p-8 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="mb-1 text-xl font-bold text-foreground">{titles[mode]}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{subtitles[mode]}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Display name"
                      className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {mode !== 'forgot' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      minLength={6}
                      className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 glow-primary"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 space-y-2 text-center text-sm">
                {mode === 'login' && (
                  <>
                    <button onClick={() => setMode('forgot')} className="text-muted-foreground hover:text-primary transition-colors">
                      Forgot password?
                    </button>
                    <p className="text-muted-foreground">
                      Don't have an account?{' '}
                      <button onClick={() => setMode('signup')} className="text-primary hover:underline font-medium">
                        Sign up
                      </button>
                    </p>
                  </>
                )}
                {mode === 'signup' && (
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <button onClick={() => setMode('login')} className="text-primary hover:underline font-medium">
                      Sign in
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <button onClick={() => setMode('login')} className="text-primary hover:underline font-medium">
                    Back to sign in
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
