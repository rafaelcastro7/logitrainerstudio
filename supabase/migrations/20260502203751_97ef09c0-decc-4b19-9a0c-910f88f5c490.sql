
-- Agents table
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  goal TEXT NOT NULL,
  backstory TEXT,
  system_prompt TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'google/gemini-3-flash-preview',
  temperature NUMERIC NOT NULL DEFAULT 0.7,
  tools JSONB NOT NULL DEFAULT '[]'::jsonb,
  category TEXT NOT NULL DEFAULT 'specialist',
  icon TEXT DEFAULT 'Bot',
  color TEXT DEFAULT 'primary',
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_template BOOLEAN NOT NULL DEFAULT false,
  total_executions INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  total_tokens INTEGER NOT NULL DEFAULT 0,
  avg_latency_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own agents" ON public.agents FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Agent Crews
CREATE TABLE public.agent_crews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  mission TEXT NOT NULL,
  orchestrator_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  process_type TEXT NOT NULL DEFAULT 'sequential',
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_runs INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_crews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own crews" ON public.agent_crews FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER crews_updated_at BEFORE UPDATE ON public.agent_crews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Crew Members
CREATE TABLE public.crew_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crew_id UUID NOT NULL REFERENCES public.agent_crews(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  task_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (crew_id, agent_id)
);

ALTER TABLE public.crew_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own crew members" ON public.crew_members FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.agent_crews c WHERE c.id = crew_id AND c.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.agent_crews c WHERE c.id = crew_id AND c.user_id = auth.uid()));

-- Agent Executions
CREATE TABLE public.agent_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  crew_id UUID REFERENCES public.agent_crews(id) ON DELETE SET NULL,
  parent_execution_id UUID REFERENCES public.agent_executions(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  input TEXT NOT NULL,
  output JSONB,
  error TEXT,
  model TEXT,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  cost NUMERIC NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own executions" ON public.agent_executions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own executions" ON public.agent_executions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own executions" ON public.agent_executions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own executions" ON public.agent_executions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Agent Logs (step-by-step trace)
CREATE TABLE public.agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID NOT NULL REFERENCES public.agent_executions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  step_number INTEGER NOT NULL DEFAULT 0,
  log_type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own logs" ON public.agent_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own logs" ON public.agent_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_executions_user ON public.agent_executions(user_id, created_at DESC);
CREATE INDEX idx_logs_execution ON public.agent_logs(execution_id, step_number);
CREATE INDEX idx_agents_user ON public.agents(user_id, is_active);
