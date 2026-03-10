import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Loader2, Save, User, Shield, Mail, Calendar, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [memberSince, setMemberSince] = useState('');

  useEffect(() => {
    if (!user) return;
    setMemberSince(new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    supabase
      .from('profiles')
      .select('display_name, username, avatar_url')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name ?? '');
          setUsername(data.username ?? '');
          setAvatarUrl(data.avatar_url);
        }
        setLoadingProfile(false);
      });
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) { toast.error('Failed to upload avatar'); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
    const url = `${publicUrl}?t=${Date.now()}`;
    setAvatarUrl(url);
    await supabase.from('profiles').update({ avatar_url: url, updated_at: new Date().toISOString() }).eq('id', user.id);
    setUploading(false);
    toast.success('Avatar updated');
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName || null, username: username || null, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    setSaving(false);
    if (error) toast.error('Failed to save profile');
    else toast.success('Profile saved');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/[0.05] blur-[120px] animate-orb pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[350px] h-[350px] rounded-full bg-primary-glow/[0.04] blur-[100px] animate-orb-delayed pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to studio
          </button>

          {/* Profile Header Card */}
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-premium-lg overflow-hidden">
            {/* Banner */}
            <div className="relative h-28 bg-gradient-to-br from-primary/20 via-primary-glow/10 to-transparent">
              <div className="absolute inset-0 bg-noise" />
            </div>

            {/* Avatar */}
            <div className="relative px-6 -mt-12">
              <div className="relative group cursor-pointer inline-block" onClick={() => fileInputRef.current?.click()}>
                <div className="h-24 w-24 rounded-2xl border-4 border-card bg-card overflow-hidden shadow-premium">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      <User className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <Camera className="h-6 w-6 text-foreground" />
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
            </div>

            {/* Info badges */}
            <div className="px-6 pt-4 pb-2 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1">
                <Mail className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-mono text-primary">{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-mono text-muted-foreground">{memberSince}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-success/10 border border-success/20 px-3 py-1">
                <Shield className="h-3 w-3 text-success" />
                <span className="text-[10px] font-mono text-success">Verified</span>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 pt-4 space-y-5">
              {loadingProfile ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-medium text-muted-foreground/80 uppercase tracking-wider">Display Name</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 transition-colors group-focus-within:text-primary/60" />
                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                        className="w-full rounded-xl border border-border/60 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-medium text-muted-foreground/80 uppercase tracking-wider">Username</label>
                    <div className="relative group">
                      <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 transition-colors group-focus-within:text-primary/60" />
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="@username"
                        className="w-full rounded-xl border border-border/60 bg-background/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50 glow-primary overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
