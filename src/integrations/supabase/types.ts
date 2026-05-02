export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_crews: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          mission: string
          name: string
          orchestrator_agent_id: string | null
          process_type: string
          total_runs: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          mission: string
          name: string
          orchestrator_agent_id?: string | null
          process_type?: string
          total_runs?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          mission?: string
          name?: string
          orchestrator_agent_id?: string | null
          process_type?: string
          total_runs?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_crews_orchestrator_agent_id_fkey"
            columns: ["orchestrator_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_executions: {
        Row: {
          agent_id: string | null
          completed_at: string | null
          cost: number
          created_at: string
          crew_id: string | null
          error: string | null
          id: string
          input: string
          latency_ms: number
          model: string | null
          output: Json | null
          parent_execution_id: string | null
          started_at: string
          status: string
          tokens_used: number
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          completed_at?: string | null
          cost?: number
          created_at?: string
          crew_id?: string | null
          error?: string | null
          id?: string
          input: string
          latency_ms?: number
          model?: string | null
          output?: Json | null
          parent_execution_id?: string | null
          started_at?: string
          status?: string
          tokens_used?: number
          user_id: string
        }
        Update: {
          agent_id?: string | null
          completed_at?: string | null
          cost?: number
          created_at?: string
          crew_id?: string | null
          error?: string | null
          id?: string
          input?: string
          latency_ms?: number
          model?: string | null
          output?: Json | null
          parent_execution_id?: string | null
          started_at?: string
          status?: string
          tokens_used?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_executions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_executions_crew_id_fkey"
            columns: ["crew_id"]
            isOneToOne: false
            referencedRelation: "agent_crews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_executions_parent_execution_id_fkey"
            columns: ["parent_execution_id"]
            isOneToOne: false
            referencedRelation: "agent_executions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_logs: {
        Row: {
          agent_id: string | null
          content: string
          created_at: string
          execution_id: string
          id: string
          log_type: string
          metadata: Json | null
          step_number: number
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          content: string
          created_at?: string
          execution_id: string
          id?: string
          log_type: string
          metadata?: Json | null
          step_number?: number
          user_id: string
        }
        Update: {
          agent_id?: string | null
          content?: string
          created_at?: string
          execution_id?: string
          id?: string
          log_type?: string
          metadata?: Json | null
          step_number?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_logs_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "agent_executions"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          avg_latency_ms: number
          backstory: string | null
          category: string
          color: string | null
          created_at: string
          goal: string
          icon: string | null
          id: string
          is_active: boolean
          is_template: boolean
          model: string
          name: string
          role: string
          success_count: number
          system_prompt: string
          temperature: number
          tools: Json
          total_executions: number
          total_tokens: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avg_latency_ms?: number
          backstory?: string | null
          category?: string
          color?: string | null
          created_at?: string
          goal: string
          icon?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          model?: string
          name: string
          role: string
          success_count?: number
          system_prompt: string
          temperature?: number
          tools?: Json
          total_executions?: number
          total_tokens?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avg_latency_ms?: number
          backstory?: string | null
          category?: string
          color?: string | null
          created_at?: string
          goal?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          is_template?: boolean
          model?: string
          name?: string
          role?: string
          success_count?: number
          system_prompt?: string
          temperature?: number
          tools?: Json
          total_executions?: number
          total_tokens?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alert_settings: {
        Row: {
          alerts_enabled: boolean
          cost_threshold: number
          created_at: string
          failure_count_threshold: number
          failure_window_minutes: number
          id: string
          latency_threshold_ms: number
          quota_warning_percent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          alerts_enabled?: boolean
          cost_threshold?: number
          created_at?: string
          failure_count_threshold?: number
          failure_window_minutes?: number
          id?: string
          latency_threshold_ms?: number
          quota_warning_percent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          alerts_enabled?: boolean
          cost_threshold?: number
          created_at?: string
          failure_count_threshold?: number
          failure_window_minutes?: number
          id?: string
          latency_threshold_ms?: number
          quota_warning_percent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      crew_members: {
        Row: {
          agent_id: string
          created_at: string
          crew_id: string
          id: string
          position: number
          task_description: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string
          crew_id: string
          id?: string
          position?: number
          task_description?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string
          crew_id?: string
          id?: string
          position?: number
          task_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crew_members_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crew_members_crew_id_fkey"
            columns: ["crew_id"]
            isOneToOne: false
            referencedRelation: "agent_crews"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          created_at: string
          description: string | null
          emails: Json
          framework: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          emails?: Json
          framework?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          emails?: Json
          framework?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketing_generations: {
        Row: {
          content_type: string
          created_at: string
          framework: string | null
          id: string
          model: string | null
          platform: string | null
          prompt: string
          result: Json | null
          user_id: string
        }
        Insert: {
          content_type: string
          created_at?: string
          framework?: string | null
          id?: string
          model?: string | null
          platform?: string | null
          prompt: string
          result?: Json | null
          user_id: string
        }
        Update: {
          content_type?: string
          created_at?: string
          framework?: string | null
          id?: string
          model?: string | null
          platform?: string | null
          prompt?: string
          result?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          brief: string | null
          created_at: string
          id: string
          scenes: Json | null
          timeline: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          brief?: string | null
          created_at?: string
          id?: string
          scenes?: Json | null
          timeline?: Json | null
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          brief?: string | null
          created_at?: string
          id?: string
          scenes?: Json | null
          timeline?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean
          max_uses: number | null
          user_id: string
          uses_count: number
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          max_uses?: number | null
          user_id: string
          uses_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          max_uses?: number | null
          user_id?: string
          uses_count?: number
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          created_at: string
          id: string
          referral_code_id: string
          referred_id: string
          referrer_id: string
          reward_amount: number
          reward_type: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code_id: string
          referred_id: string
          referrer_id: string
          reward_amount?: number
          reward_type?: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          referral_code_id?: string
          referred_id?: string
          referrer_id?: string
          reward_amount?: number
          reward_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          content: string
          created_at: string
          generation_id: string | null
          hashtags: string[] | null
          id: string
          platform: string
          scheduled_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          generation_id?: string | null
          hashtags?: string[] | null
          id?: string
          platform: string
          scheduled_at: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          generation_id?: string | null
          hashtags?: string[] | null
          id?: string
          platform?: string
          scheduled_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_generation_id_fkey"
            columns: ["generation_id"]
            isOneToOne: false
            referencedRelation: "marketing_generations"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_dismissed: boolean
          is_read: boolean
          message: string
          metric_value: number | null
          model_id: string | null
          provider_id: string | null
          severity: string
          threshold_value: number | null
          title: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message: string
          metric_value?: number | null
          model_id?: string | null
          provider_id?: string | null
          severity?: string
          threshold_value?: number | null
          title: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message?: string
          metric_value?: number | null
          model_id?: string | null
          provider_id?: string | null
          severity?: string
          threshold_value?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      template_marketplace: {
        Row: {
          author_id: string
          category: string
          content: Json
          created_at: string
          description: string | null
          framework: string
          id: string
          is_public: boolean
          likes_count: number
          tags: string[]
          title: string
          updated_at: string
          uses_count: number
        }
        Insert: {
          author_id: string
          category: string
          content?: Json
          created_at?: string
          description?: string | null
          framework: string
          id?: string
          is_public?: boolean
          likes_count?: number
          tags?: string[]
          title: string
          updated_at?: string
          uses_count?: number
        }
        Update: {
          author_id?: string
          category?: string
          content?: Json
          created_at?: string
          description?: string | null
          framework?: string
          id?: string
          is_public?: boolean
          likes_count?: number
          tags?: string[]
          title?: string
          updated_at?: string
          uses_count?: number
        }
        Relationships: []
      }
      user_api_keys: {
        Row: {
          api_key_encrypted: string
          created_at: string
          id: string
          is_active: boolean
          label: string | null
          provider_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key_encrypted: string
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string | null
          provider_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key_encrypted?: string
          created_at?: string
          id?: string
          is_active?: boolean
          label?: string | null
          provider_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_approvals: {
        Row: {
          created_at: string
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_triggers: {
        Row: {
          created_at: string
          event: string
          executions_count: number
          id: string
          is_active: boolean
          last_executed_at: string | null
          name: string
          payload_template: Json
          target_url: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event: string
          executions_count?: number
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          name: string
          payload_template?: Json
          target_url: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event?: string
          executions_count?: number
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          name?: string
          payload_template?: Json
          target_url?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_approved: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
