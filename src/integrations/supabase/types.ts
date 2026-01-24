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
      ai_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
          structured_response: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
          structured_response?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
          structured_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_sessions: {
        Row: {
          created_at: string
          id: string
          scope: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          scope?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          scope?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      claims: {
        Row: {
          company_id: string
          created_at: string
          email_domain: string | null
          id: string
          notes: string | null
          proof_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          role_at_company: string
          status: Database["public"]["Enums"]["claim_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email_domain?: string | null
          id?: string
          notes?: string | null
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_at_company: string
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email_domain?: string | null
          id?: string
          notes?: string | null
          proof_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          role_at_company?: string
          status?: Database["public"]["Enums"]["claim_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          android_app_url: string | null
          business_model: Database["public"]["Enums"]["business_model"] | null
          created_at: string
          description: string | null
          employee_count_max: number | null
          employee_count_min: number | null
          github_url: string | null
          hq_country_id: string | null
          id: string
          ios_app_url: string | null
          is_hiring: boolean | null
          is_verified: boolean | null
          linkedin_url: string | null
          logo_url: string | null
          name: string
          primary_domain: string | null
          sector_id: string | null
          slug: string
          sub_sector: string | null
          tagline: string | null
          total_funding_usd: number | null
          trending_score: number | null
          twitter_url: string | null
          updated_at: string
          website_url: string | null
          year_founded: number | null
        }
        Insert: {
          android_app_url?: string | null
          business_model?: Database["public"]["Enums"]["business_model"] | null
          created_at?: string
          description?: string | null
          employee_count_max?: number | null
          employee_count_min?: number | null
          github_url?: string | null
          hq_country_id?: string | null
          id?: string
          ios_app_url?: string | null
          is_hiring?: boolean | null
          is_verified?: boolean | null
          linkedin_url?: string | null
          logo_url?: string | null
          name: string
          primary_domain?: string | null
          sector_id?: string | null
          slug: string
          sub_sector?: string | null
          tagline?: string | null
          total_funding_usd?: number | null
          trending_score?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
          year_founded?: number | null
        }
        Update: {
          android_app_url?: string | null
          business_model?: Database["public"]["Enums"]["business_model"] | null
          created_at?: string
          description?: string | null
          employee_count_max?: number | null
          employee_count_min?: number | null
          github_url?: string | null
          hq_country_id?: string | null
          id?: string
          ios_app_url?: string | null
          is_hiring?: boolean | null
          is_verified?: boolean | null
          linkedin_url?: string | null
          logo_url?: string | null
          name?: string
          primary_domain?: string | null
          sector_id?: string | null
          slug?: string
          sub_sector?: string | null
          tagline?: string | null
          total_funding_usd?: number | null
          trending_score?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
          year_founded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_hq_country_id_fkey"
            columns: ["hq_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      company_countries: {
        Row: {
          company_id: string
          country_id: string
          id: string
          is_hq: boolean | null
        }
        Insert: {
          company_id: string
          country_id: string
          id?: string
          is_hq?: boolean | null
        }
        Update: {
          company_id?: string
          country_id?: string
          id?: string
          is_hq?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "company_countries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_countries_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      company_founders: {
        Row: {
          company_id: string
          founder_id: string
          id: string
          is_current: boolean | null
          role: string | null
        }
        Insert: {
          company_id: string
          founder_id: string
          id?: string
          is_current?: boolean | null
          role?: string | null
        }
        Update: {
          company_id?: string
          founder_id?: string
          id?: string
          is_current?: boolean | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_founders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_founders_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "founders"
            referencedColumns: ["id"]
          },
        ]
      }
      correction_requests: {
        Row: {
          company_id: string
          created_at: string
          current_value: string | null
          email: string | null
          field_name: string
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          source_url: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          suggested_value: string | null
          user_id: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          current_value?: string | null
          email?: string | null
          field_name: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          suggested_value?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          current_value?: string | null
          email?: string | null
          field_name?: string
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          source_url?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          suggested_value?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "correction_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string
          flag_emoji: string | null
          id: string
          name: string
          region: Database["public"]["Enums"]["african_region"]
        }
        Insert: {
          code: string
          created_at?: string
          flag_emoji?: string | null
          id?: string
          name: string
          region: Database["public"]["Enums"]["african_region"]
        }
        Update: {
          code?: string
          created_at?: string
          flag_emoji?: string | null
          id?: string
          name?: string
          region?: Database["public"]["Enums"]["african_region"]
        }
        Relationships: []
      }
      founders: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          linkedin_url: string | null
          name: string
          slug: string
          title: string | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name: string
          slug: string
          title?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          linkedin_url?: string | null
          name?: string
          slug?: string
          title?: string | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      funding_round_investors: {
        Row: {
          funding_round_id: string
          id: string
          investor_id: string
          is_lead: boolean | null
        }
        Insert: {
          funding_round_id: string
          id?: string
          investor_id: string
          is_lead?: boolean | null
        }
        Update: {
          funding_round_id?: string
          id?: string
          investor_id?: string
          is_lead?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "funding_round_investors_funding_round_id_fkey"
            columns: ["funding_round_id"]
            isOneToOne: false
            referencedRelation: "funding_rounds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funding_round_investors_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_rounds: {
        Row: {
          amount_disclosed: boolean | null
          amount_usd: number | null
          company_id: string
          confidence_score: number | null
          created_at: string
          date: string | null
          id: string
          notes: string | null
          source_type: Database["public"]["Enums"]["data_source_type"] | null
          source_url: string | null
          stage: Database["public"]["Enums"]["funding_stage"]
          updated_at: string
          valuation_usd: number | null
        }
        Insert: {
          amount_disclosed?: boolean | null
          amount_usd?: number | null
          company_id: string
          confidence_score?: number | null
          created_at?: string
          date?: string | null
          id?: string
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          stage: Database["public"]["Enums"]["funding_stage"]
          updated_at?: string
          valuation_usd?: number | null
        }
        Update: {
          amount_disclosed?: boolean | null
          amount_usd?: number | null
          company_id?: string
          confidence_score?: number | null
          created_at?: string
          date?: string | null
          id?: string
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          stage?: Database["public"]["Enums"]["funding_stage"]
          updated_at?: string
          valuation_usd?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funding_rounds_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_regions: {
        Row: {
          id: string
          investor_id: string
          region: Database["public"]["Enums"]["african_region"]
        }
        Insert: {
          id?: string
          investor_id: string
          region: Database["public"]["Enums"]["african_region"]
        }
        Update: {
          id?: string
          investor_id?: string
          region?: Database["public"]["Enums"]["african_region"]
        }
        Relationships: [
          {
            foreignKeyName: "investor_regions_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_sectors: {
        Row: {
          id: string
          investor_id: string
          sector_id: string
        }
        Insert: {
          id?: string
          investor_id: string
          sector_id: string
        }
        Update: {
          id?: string
          investor_id?: string
          sector_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investor_sectors_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_sectors_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      investors: {
        Row: {
          created_at: string
          description: string | null
          hq_country_id: string | null
          id: string
          linkedin_url: string | null
          logo_url: string | null
          name: string
          portfolio_count: number | null
          slug: string
          total_investments: number | null
          type: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          hq_country_id?: string | null
          id?: string
          linkedin_url?: string | null
          logo_url?: string | null
          name: string
          portfolio_count?: number | null
          slug: string
          total_investments?: number | null
          type: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          hq_country_id?: string | null
          id?: string
          linkedin_url?: string | null
          logo_url?: string | null
          name?: string
          portfolio_count?: number | null
          slug?: string
          total_investments?: number | null
          type?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investors_hq_country_id_fkey"
            columns: ["hq_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_affiliation: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_affiliation?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_affiliation?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_affiliation_fkey"
            columns: ["company_affiliation"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue_metrics: {
        Row: {
          as_of_date: string | null
          company_id: string
          confidence_score: number | null
          created_at: string
          id: string
          max_value_usd: number | null
          metric_type: string
          min_value_usd: number | null
          notes: string | null
          source_type: Database["public"]["Enums"]["data_source_type"] | null
          source_url: string | null
          updated_at: string
        }
        Insert: {
          as_of_date?: string | null
          company_id: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          max_value_usd?: number | null
          metric_type: string
          min_value_usd?: number | null
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          as_of_date?: string | null
          company_id?: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          max_value_usd?: number | null
          metric_type?: string
          min_value_usd?: number | null
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_metrics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_collection_items: {
        Row: {
          collection_id: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "saved_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_collections: {
        Row: {
          created_at: string
          entity_type: string
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_type: string
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entity_type?: string
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sectors: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          market_overview: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          market_overview?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          market_overview?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      sources: {
        Row: {
          company_id: string
          created_at: string
          id: string
          published_at: string | null
          source_type: string | null
          title: string
          url: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          published_at?: string | null
          source_type?: string | null
          title: string
          url: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          published_at?: string | null
          source_type?: string | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sources_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      valuation_metrics: {
        Row: {
          as_of_date: string | null
          company_id: string
          confidence_score: number | null
          created_at: string
          id: string
          is_post_money: boolean | null
          max_value_usd: number | null
          min_value_usd: number | null
          notes: string | null
          source_type: Database["public"]["Enums"]["data_source_type"] | null
          source_url: string | null
          updated_at: string
        }
        Insert: {
          as_of_date?: string | null
          company_id: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          is_post_money?: boolean | null
          max_value_usd?: number | null
          min_value_usd?: number | null
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          updated_at?: string
        }
        Update: {
          as_of_date?: string | null
          company_id?: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          is_post_money?: boolean | null
          max_value_usd?: number | null
          min_value_usd?: number | null
          notes?: string | null
          source_type?: Database["public"]["Enums"]["data_source_type"] | null
          source_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "valuation_metrics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist_companies: {
        Row: {
          added_at: string
          company_id: string
          id: string
          watchlist_id: string
        }
        Insert: {
          added_at?: string
          company_id: string
          id?: string
          watchlist_id: string
        }
        Update: {
          added_at?: string
          company_id?: string
          id?: string
          watchlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlist_companies_watchlist_id_fkey"
            columns: ["watchlist_id"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlists: {
        Row: {
          created_at: string
          id: string
          is_default: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean | null
          name?: string
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
    }
    Enums: {
      african_region:
        | "West Africa"
        | "East Africa"
        | "North Africa"
        | "Central Africa"
        | "Southern Africa"
      app_role: "admin" | "moderator" | "user"
      business_model: "B2B" | "B2C" | "B2B2C" | "Marketplace" | "SaaS" | "Other"
      claim_status: "pending" | "approved" | "rejected"
      data_source_type: "Verified" | "Reported" | "Estimated"
      funding_stage:
        | "Pre-seed"
        | "Seed"
        | "Series A"
        | "Series B"
        | "Series C"
        | "Series D+"
        | "Grant"
        | "Debt"
        | "Unknown"
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
      african_region: [
        "West Africa",
        "East Africa",
        "North Africa",
        "Central Africa",
        "Southern Africa",
      ],
      app_role: ["admin", "moderator", "user"],
      business_model: ["B2B", "B2C", "B2B2C", "Marketplace", "SaaS", "Other"],
      claim_status: ["pending", "approved", "rejected"],
      data_source_type: ["Verified", "Reported", "Estimated"],
      funding_stage: [
        "Pre-seed",
        "Seed",
        "Series A",
        "Series B",
        "Series C",
        "Series D+",
        "Grant",
        "Debt",
        "Unknown",
      ],
    },
  },
} as const
