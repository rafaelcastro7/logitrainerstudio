import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Plug, Globe, Mic, Search, ExternalLink, CheckCircle, Circle, Zap
} from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  docsUrl: string;
  status: 'available' | 'coming-soon';
}

const CONNECTORS: Connector[] = [
  {
    id: 'firecrawl', name: 'Firecrawl', description: 'AI-powered web scraping and search. Extract content from any URL, search the web, map sitemaps, and crawl entire websites.',
    icon: '🔥', category: 'Data & Scraping',
    features: ['Scrape any URL to markdown/HTML', 'Web search with AI', 'Sitemap discovery', 'Full website crawl'],
    docsUrl: 'https://firecrawl.dev', status: 'available',
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs', description: 'Professional AI voice generation. Text-to-speech with ultra-realistic voices in 32+ languages.',
    icon: '🔊', category: 'Audio & Voice',
    features: ['Text-to-speech synthesis', 'Voice cloning', 'Multilingual support', 'Speech-to-text transcription'],
    docsUrl: 'https://elevenlabs.io', status: 'available',
  },
  {
    id: 'perplexity', name: 'Perplexity', description: 'AI-powered search engine. Get grounded answers with real-time web search and citations.',
    icon: '🔍', category: 'Search & Research',
    features: ['AI search with citations', 'Academic search mode', 'Structured JSON output', 'Real-time web results'],
    docsUrl: 'https://perplexity.ai', status: 'available',
  },
  {
    id: 'slack', name: 'Slack', description: 'Team messaging integration. Send notifications, updates, and content directly to Slack channels.',
    icon: '💬', category: 'Communication',
    features: ['Send messages to channels', 'Workflow notifications', 'Team collaboration'],
    docsUrl: 'https://slack.com', status: 'available',
  },
  {
    id: 'telegram', name: 'Telegram', description: 'Messaging platform with Bot API. Automate interactions and send notifications via Telegram bots.',
    icon: '✈️', category: 'Communication',
    features: ['Bot messaging', 'Automated notifications', 'Media sharing'],
    docsUrl: 'https://telegram.org', status: 'available',
  },
  {
    id: 'twilio', name: 'Twilio', description: 'Cloud communications platform. Send SMS, make voice calls, and handle messaging at scale.',
    icon: '📱', category: 'Communication',
    features: ['SMS messaging', 'Voice calls', 'WhatsApp integration'],
    docsUrl: 'https://twilio.com', status: 'available',
  },
];

const categories = [...new Set(CONNECTORS.map(c => c.category))];

export function ConnectorsPanel() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20">
            <Plug className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground font-display">Connectors</h2>
            <p className="text-[10px] text-muted-foreground font-mono">{CONNECTORS.length} integrations available</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Info card */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Extend Your Studio</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connectors add powerful integrations to your workflow. Connect web scraping, professional voice synthesis, AI search, and team communication tools.
              </p>
            </div>
          </div>
        </div>

        {/* By Category */}
        {categories.map(cat => (
          <div key={cat}>
            <h3 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-border/30" />
              {cat}
              <div className="h-px flex-1 bg-border/30" />
            </h3>
            <div className="space-y-2">
              {CONNECTORS.filter(c => c.category === cat).map(connector => (
                <motion.div
                  key={connector.id}
                  whileHover={{ scale: 1.005 }}
                  className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{connector.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{connector.name}</h4>
                        {connector.status === 'available' ? (
                          <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[9px] font-medium text-success">
                            <CheckCircle className="h-2.5 w-2.5" /> Available
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
                            <Circle className="h-2.5 w-2.5" /> Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{connector.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {connector.features.map(f => (
                          <span key={f} className="rounded bg-secondary/50 px-2 py-0.5 text-[9px] text-muted-foreground font-mono">{f}</span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={connector.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-2 text-muted-foreground/50 hover:text-foreground hover:bg-secondary/40 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
