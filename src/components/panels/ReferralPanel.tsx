import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle, Users, Share2, Trophy, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

export function ReferralPanel() {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [usesCount, setUsesCount] = useState(0);
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      const { data: codes } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);
      
      if (codes && codes.length > 0) {
        setReferralCode(codes[0].code);
        setUsesCount(codes[0].uses_count);
      }

      const { data: rw } = await supabase
        .from('referral_rewards')
        .select('*')
        .eq('referrer_id', user.id);
      
      if (rw) setRewards(rw);
      setLoading(false);
    };
    load();
  }, [user]);

  const copyCode = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success('Referral code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    const url = `${window.location.origin}/auth?ref=${referralCode}`;
    if (navigator.share) {
      navigator.share({ title: 'Join LogiTrainer AI Studio', text: 'Create amazing AI-powered videos!', url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Share link copied!');
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  const tiers = [
    { referrals: 3, reward: 'Pro Badge', icon: '🏅', reached: usesCount >= 3 },
    { referrals: 10, reward: 'Priority Support', icon: '⚡', reached: usesCount >= 10 },
    { referrals: 25, reward: 'Unlimited AI', icon: '🚀', reached: usesCount >= 25 },
    { referrals: 50, reward: 'VIP Creator', icon: '👑', reached: usesCount >= 50 },
  ];

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="border-b border-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="h-4 w-4 text-warning" />
          <h2 className="font-display text-base font-bold text-foreground">Referral Program</h2>
        </div>
        <p className="text-xs text-muted-foreground/60">Invite friends & earn rewards</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Referral Code Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-warning/20 bg-warning/5 p-5"
        >
          <p className="text-[10px] font-mono text-warning/60 uppercase tracking-wider mb-2">Your Referral Code</p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-foreground tracking-[0.15em] flex-1">
              {referralCode || '—'}
            </span>
            <button onClick={copyCode}
              className="flex items-center gap-1.5 rounded-lg bg-warning/10 border border-warning/20 px-3 py-2 text-xs font-medium text-warning hover:bg-warning/20 transition-all"
            >
              {copied ? <CheckCircle className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button onClick={shareLink}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-all"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="font-mono text-xl font-bold text-foreground">{usesCount}</p>
            <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">Referrals</p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
            <Trophy className="h-5 w-5 text-warning mx-auto mb-2" />
            <p className="font-mono text-xl font-bold text-foreground">{rewards.filter(r => r.status === 'claimed').length}</p>
            <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">Rewards</p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
            <Gift className="h-5 w-5 text-success mx-auto mb-2" />
            <p className="font-mono text-xl font-bold text-foreground">{tiers.filter(t => t.reached).length}/{tiers.length}</p>
            <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">Tiers</p>
          </div>
        </div>

        {/* Reward Tiers */}
        <div>
          <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.15em] mb-3">Reward Tiers</p>
          <div className="space-y-2">
            {tiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  tier.reached
                    ? 'border-success/30 bg-success/5'
                    : 'border-border/40 bg-card/20'
                }`}
              >
                <span className="text-lg">{tier.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground">{tier.reward}</p>
                  <p className="text-[10px] text-muted-foreground/50">{tier.referrals} referrals needed</p>
                </div>
                {tier.reached ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <span className="text-[10px] font-mono text-muted-foreground/40">{Math.max(0, tier.referrals - usesCount)} to go</span>
                )}
                {/* Progress bar */}
                <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-warning to-success transition-all"
                    style={{ width: `${Math.min(100, (usesCount / tier.referrals) * 100)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-xl border border-border/30 bg-card/20 p-4">
          <p className="text-xs font-semibold text-foreground mb-3">How it works</p>
          <div className="space-y-2.5">
            {[
              { step: '1', text: 'Share your unique referral code with friends' },
              { step: '2', text: 'They sign up and enter your code during registration' },
              { step: '3', text: 'Both of you earn rewards when they\'re approved' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{step}</span>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
