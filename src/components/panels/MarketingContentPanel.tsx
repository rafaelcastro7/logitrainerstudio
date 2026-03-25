import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import {
  Megaphone, Mail, Globe, CalendarDays, Video, Hash,
  Sparkles, Loader2, Copy, Check, ChevronRight, Zap
} from 'lucide-react';

const CONTENT_TOOLS = [
  { id: 'ad-copy', label: 'Ad Copy Generator', desc: 'Facebook, Google, TikTok ads', icon: Megaphone, color: 'text-orange-400', placeholder: 'Describe your product/service and target audience...' },
  { id: 'email-sequence', label: 'Email Sequences', desc: 'Nurture & conversion flows', icon: Mail, color: 'text-blue-400', placeholder: 'Describe the product and goal of the email sequence...' },
  { id: 'landing-page', label: 'Landing Page Copy', desc: 'Headlines, CTAs, features', icon: Globe, color: 'text-green-400', placeholder: 'Describe the product/service for the landing page...' },
  { id: 'social-calendar', label: 'Social Calendar', desc: '7-day content plan', icon: CalendarDays, color: 'text-purple-400', placeholder: 'Describe your brand and target platforms...' },
  { id: 'short-script', label: 'Short-Form Scripts', desc: 'Reels, TikTok, Shorts', icon: Video, color: 'text-pink-400', placeholder: 'Describe the topic and style for the short video...' },
  { id: 'seo-keywords', label: 'SEO & Hashtags', desc: 'Keywords, hashtags, ideas', icon: Hash, color: 'text-cyan-400', placeholder: 'Describe your niche, product, or content topic...' },
] as const;

const PLATFORMS = ['Facebook', 'Google', 'TikTok', 'Instagram', 'LinkedIn', 'YouTube', 'Twitter/X'];

export function MarketingContentPanel() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!selectedTool || !prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-marketing-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ contentType: selectedTool, prompt: prompt.trim(), platform, model: 'google/gemini-3-flash-preview' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.content);
      toast.success('Content generated successfully!');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const tool = CONTENT_TOOLS.find(t => t.id === selectedTool);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground font-display">Marketing Content Studio</h2>
            <p className="text-[10px] text-muted-foreground font-mono">AI-powered content generation for digital marketing</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {!selectedTool ? (
          /* Tool Selection Grid */
          <div className="grid grid-cols-2 gap-3">
            {CONTENT_TOOLS.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTool(t.id)}
                className="flex flex-col items-start gap-2 rounded-xl border border-border/50 bg-card/50 p-4 text-left hover:border-primary/30 hover:bg-card transition-all group"
              >
                <t.icon className={cn('h-5 w-5', t.color)} />
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.label}</p>
                  <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                </div>
                <ChevronRight className="h-3 w-3 text-muted-foreground/30 self-end group-hover:text-primary/50 transition-colors" />
              </motion.button>
            ))}
          </div>
        ) : (
          /* Generator View */
          <div className="space-y-4">
            <button onClick={() => { setSelectedTool(null); setResult(null); setPrompt(''); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              ← Back to tools
            </button>

            <div className="flex items-center gap-2 mb-4">
              {tool && <tool.icon className={cn('h-5 w-5', tool.color)} />}
              <h3 className="text-sm font-bold text-foreground">{tool?.label}</h3>
            </div>

            {/* Platform selector for applicable tools */}
            {['ad-copy', 'social-calendar', 'short-script'].includes(selectedTool) && (
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Platform</label>
                <div className="flex flex-wrap gap-1.5">
                  {PLATFORMS.map(p => (
                    <button
                      key={p}
                      onClick={() => setPlatform(platform === p ? '' : p)}
                      className={cn(
                        'rounded-full px-3 py-1 text-[10px] font-medium transition-all border',
                        platform === p ? 'bg-primary/15 border-primary/30 text-primary' : 'border-border/50 text-muted-foreground hover:border-border'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Input */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 block">Brief</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={tool?.placeholder}
                rows={4}
                className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
              />
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
            >
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Generate Content</>
              )}
            </motion.button>

            {/* Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5">
                    <span className="text-xs font-semibold text-foreground">Generated Content</span>
                    <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                      {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-4 max-h-[400px] overflow-auto">
                    {result.raw ? (
                      <div className="prose prose-sm prose-invert max-w-none text-xs">
                        <ReactMarkdown>{result.raw}</ReactMarkdown>
                      </div>
                    ) : (
                      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
