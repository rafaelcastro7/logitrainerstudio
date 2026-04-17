import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Webhook, Plus, Trash2, Power, Zap } from "lucide-react";
import { toast } from "sonner";

const EVENTS = [
  "lead.captured",
  "post.scheduled",
  "post.published",
  "email.opened",
  "email.clicked",
  "referral.completed",
  "purchase.completed",
  "user.signup",
];

interface Trigger {
  id: string;
  name: string;
  event: string;
  target_url: string;
  payload_template: any;
  executions_count: number;
  last_executed_at: string | null;
  is_active: boolean;
}

export function WebhookTriggersPanel() {
  const { user } = useAuth();
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [event, setEvent] = useState(EVENTS[0]);
  const [targetUrl, setTargetUrl] = useState("");
  const [payload, setPayload] = useState('{"message":"{{event}} fired"}');
  const [testing, setTesting] = useState<string | null>(null);

  const fetchTriggers = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase.from("webhook_triggers").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setTriggers((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchTriggers(); }, [user]);

  const create = async () => {
    if (!user || !name.trim() || !targetUrl.trim()) return;
    let parsedPayload: any = {};
    try { parsedPayload = JSON.parse(payload); } catch { toast.error("Invalid JSON in payload"); return; }
    try { new URL(targetUrl); } catch { toast.error("Invalid URL"); return; }

    const { error } = await supabase.from("webhook_triggers").insert({
      user_id: user.id, name, event, target_url: targetUrl, payload_template: parsedPayload,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Webhook created");
      setName(""); setTargetUrl(""); setPayload('{"message":"{{event}} fired"}');
      setOpen(false); fetchTriggers();
    }
  };

  const test = async (t: Trigger) => {
    setTesting(t.id);
    try {
      await fetch(t.target_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ ...t.payload_template, event: t.event, triggered_at: new Date().toISOString(), test: true }),
      });
      await supabase.from("webhook_triggers").update({
        executions_count: t.executions_count + 1,
        last_executed_at: new Date().toISOString(),
      }).eq("id", t.id);
      toast.success("Webhook fired (no-cors mode, check destination)");
      fetchTriggers();
    } catch (e: any) {
      toast.error(e.message || "Failed to fire webhook");
    } finally { setTesting(null); }
  };

  const toggle = async (t: Trigger) => {
    await supabase.from("webhook_triggers").update({ is_active: !t.is_active }).eq("id", t.id);
    fetchTriggers();
  };

  const remove = async (id: string) => {
    await supabase.from("webhook_triggers").delete().eq("id", id);
    toast.success("Webhook deleted"); fetchTriggers();
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Webhook className="h-6 w-6 text-primary" /> Webhook Automations
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Connect marketing events to Zapier, Make, n8n or any HTTP endpoint</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />New Webhook</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Webhook Trigger</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Select value={event} onValueChange={setEvent}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{EVENTS.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
                <Input placeholder="https://hooks.zapier.com/..." value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} />
                <Textarea placeholder='{"key":"value"}' value={payload} onChange={(e) => setPayload(e.target.value)} className="font-mono text-xs min-h-[120px]" />
                <Button onClick={create} className="w-full">Create Trigger</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading && <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>}
        {!loading && triggers.length === 0 && (
          <Card className="p-12 text-center">
            <Webhook className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground">No webhook triggers yet. Create your first automation above.</p>
          </Card>
        )}

        <div className="grid gap-3">
          {triggers.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{t.name}</h4>
                    <Badge variant={t.is_active ? "default" : "secondary"} className="text-[10px]">
                      {t.is_active ? "Active" : "Paused"}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">{t.event}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate font-mono">{t.target_url}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {t.executions_count} executions{t.last_executed_at && ` · last: ${new Date(t.last_executed_at).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => test(t)} disabled={testing === t.id}>
                    {testing === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Zap className="h-3.5 w-3.5" />}
                    <span className="ml-1">Test</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toggle(t)}>
                    <Power className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(t.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
