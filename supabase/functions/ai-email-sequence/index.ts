import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are an elite email marketing strategist. Generate a complete welcome/nurture email sequence using the requested copywriting framework.
Return STRICT JSON: {"name":"...","description":"...","emails":[{"day":0,"subject":"...","preheader":"...","body":"...","cta":"..."}]}
Generate 7 emails total spanning days 0-14. Body should be 200-400 words each, conversational, story-driven.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Unauthorized");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { topic, framework = "AIDA", audience = "" } = await req.json();
    if (!topic || typeof topic !== "string" || topic.length < 3 || topic.length > 1000) {
      return new Response(JSON.stringify({ error: "Topic must be 3-1000 chars" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userMsg = `Create a 7-email sequence for: "${topic.trim()}". Audience: ${audience || "general"}. Use the ${framework} copywriting framework throughout.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, { role: "user", content: userMsg }],
        temperature: 0.8,
      }),
    });
    if (!r.ok) {
      if (r.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (r.status === 402) return new Response(JSON.stringify({ error: "Usage limit reached" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${r.status}`);
    }
    const data = await r.json();
    const content = data.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      const m = content.match(/\{[\s\S]*\}/);
      parsed = m ? JSON.parse(m[0]) : { raw: content };
    } catch {
      parsed = { raw: content };
    }
    return new Response(JSON.stringify({ sequence: parsed, framework }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    const status = msg === "Unauthorized" ? 401 : 500;
    return new Response(JSON.stringify({ error: msg }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
