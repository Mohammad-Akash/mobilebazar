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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      ad_images: {
        Row: {
          ad_id: string
          created_at: string
          id: string
          position: number
          storage_path: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          id?: string
          position?: number
          storage_path: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          id?: string
          position?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_images_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_images_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_private: {
        Row: {
          ad_id: string
          created_at: string
          imei: string | null
          updated_at: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          imei?: string | null
          updated_at?: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          imei?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_private_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: true
            referencedRelation: "active_ads_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_private_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: true
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          area_id: string | null
          battery_health: number | null
          brand_id: string
          city_id: string
          color: string | null
          condition: Database["public"]["Enums"]["condition_type"]
          contact_preference: Database["public"]["Enums"]["contact_preference"]
          created_at: string
          deleted_at: string | null
          description: string
          expires_at: string
          favorites_count: number
          featured_until: string | null
          has_accessories: boolean
          has_box: boolean
          id: string
          is_featured: boolean
          is_negotiable: boolean
          model_id: string
          price: number
          pta_status: Database["public"]["Enums"]["pta_status"]
          published_at: string
          ram_gb: number | null
          search_vector: unknown
          seller_id: string
          sold_at: string | null
          status: Database["public"]["Enums"]["ad_status"]
          storage_gb: number
          title: string
          updated_at: string
          views_count: number
          warranty_months_remaining: number | null
          warranty_type: Database["public"]["Enums"]["warranty_type"]
        }
        Insert: {
          area_id?: string | null
          battery_health?: number | null
          brand_id: string
          city_id: string
          color?: string | null
          condition: Database["public"]["Enums"]["condition_type"]
          contact_preference?: Database["public"]["Enums"]["contact_preference"]
          created_at?: string
          deleted_at?: string | null
          description: string
          expires_at?: string
          favorites_count?: number
          featured_until?: string | null
          has_accessories?: boolean
          has_box?: boolean
          id?: string
          is_featured?: boolean
          is_negotiable?: boolean
          model_id: string
          price: number
          pta_status?: Database["public"]["Enums"]["pta_status"]
          published_at?: string
          ram_gb?: number | null
          search_vector?: unknown
          seller_id: string
          sold_at?: string | null
          status?: Database["public"]["Enums"]["ad_status"]
          storage_gb: number
          title: string
          updated_at?: string
          views_count?: number
          warranty_months_remaining?: number | null
          warranty_type?: Database["public"]["Enums"]["warranty_type"]
        }
        Update: {
          area_id?: string | null
          battery_health?: number | null
          brand_id?: string
          city_id?: string
          color?: string | null
          condition?: Database["public"]["Enums"]["condition_type"]
          contact_preference?: Database["public"]["Enums"]["contact_preference"]
          created_at?: string
          deleted_at?: string | null
          description?: string
          expires_at?: string
          favorites_count?: number
          featured_until?: string | null
          has_accessories?: boolean
          has_box?: boolean
          id?: string
          is_featured?: boolean
          is_negotiable?: boolean
          model_id?: string
          price?: number
          pta_status?: Database["public"]["Enums"]["pta_status"]
          published_at?: string
          ram_gb?: number | null
          search_vector?: unknown
          seller_id?: string
          sold_at?: string | null
          status?: Database["public"]["Enums"]["ad_status"]
          storage_gb?: number
          title?: string
          updated_at?: string
          views_count?: number
          warranty_months_remaining?: number | null
          warranty_type?: Database["public"]["Enums"]["warranty_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ads_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "ads_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ads_area_city"
            columns: ["area_id", "city_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id", "city_id"]
          },
          {
            foreignKeyName: "fk_ads_model_brand"
            columns: ["model_id", "brand_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id", "brand_id"]
          },
        ]
      }
      areas: {
        Row: {
          city_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          city_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          city_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "areas_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "areas_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          ad_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          brand_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          ram_options: number[] | null
          release_year: number | null
          slug: string
          storage_options: number[] | null
          updated_at: string
        }
        Insert: {
          brand_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          ram_options?: number[] | null
          release_year?: number | null
          slug: string
          storage_options?: number[] | null
          updated_at?: string
        }
        Update: {
          brand_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          ram_options?: number[] | null
          release_year?: number | null
          slug?: string
          storage_options?: number[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["brand_id"]
          },
          {
            foreignKeyName: "models_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_private: {
        Row: {
          created_at: string
          id: string
          is_banned: boolean
          is_phone_verified: boolean
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          id: string
          is_banned?: boolean
          is_phone_verified?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_banned?: boolean
          is_phone_verified?: boolean
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_private_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ads_count: number
          avatar_url: string | null
          city_id: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          ads_count?: number
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          ads_count?: number
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["city_id"]
          },
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          ad_id: string
          created_at: string
          details: string | null
          id: string
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"]
        }
        Insert: {
          ad_id: string
          created_at?: string
          details?: string | null
          id?: string
          reason: Database["public"]["Enums"]["report_reason"]
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Update: {
          ad_id?: string
          created_at?: string
          details?: string | null
          id?: string
          reason?: Database["public"]["Enums"]["report_reason"]
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "active_ads_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_ads_view: {
        Row: {
          area_id: string | null
          area_name: string | null
          area_slug: string | null
          battery_health: number | null
          brand_id: string | null
          brand_name: string | null
          brand_slug: string | null
          city_id: string | null
          city_name: string | null
          city_slug: string | null
          color: string | null
          condition: Database["public"]["Enums"]["condition_type"] | null
          contact_preference:
            | Database["public"]["Enums"]["contact_preference"]
            | null
          cover_image_path: string | null
          created_at: string | null
          description: string | null
          favorites_count: number | null
          has_accessories: boolean | null
          has_box: boolean | null
          id: string | null
          is_featured: boolean | null
          is_negotiable: boolean | null
          model_id: string | null
          model_name: string | null
          model_slug: string | null
          price: number | null
          pta_status: Database["public"]["Enums"]["pta_status"] | null
          published_at: string | null
          ram_gb: number | null
          seller_avatar: string | null
          seller_id: string | null
          seller_name: string | null
          status: Database["public"]["Enums"]["ad_status"] | null
          storage_gb: number | null
          title: string | null
          views_count: number | null
          warranty_months_remaining: number | null
          warranty_type: Database["public"]["Enums"]["warranty_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      delete_ad: { Args: { p_ad_id: string }; Returns: undefined }
      get_landing_stats: {
        Args: {
          p_city_slug?: string | null
          p_brand_slug?: string | null
          p_model_slug?: string | null
        }
        Returns: {
          ad_count: number
          min_price: number | null
          median_price: number | null
          max_price: number | null
          newest_published_at: string | null
        }[]
      }
      get_indexable_landing_pages: {
        Args: {
          p_min_ads?: number
        }
        Returns: {
          page_type: string
          city_slug: string | null
          brand_slug: string | null
          model_slug: string | null
          ad_count: number
          newest_published_at: string | null
        }[]
      }
      get_related_landing_links: {
        Args: {
          p_city_slug?: string | null
          p_brand_slug?: string | null
          p_model_slug?: string | null
          p_limit?: number
        }
        Returns: {
          link_type: string
          slug: string
          name: string
          ad_count: number
        }[]
      }
      get_sitemap_ads: {
        Args: {
          p_cursor_id?: string | null
          p_limit?: number
        }
        Returns: {
          id: string
          title: string
          brand_name: string | null
          model_name: string | null
          storage_gb: number | null
          city_name: string | null
          updated_at: string
        }[]
      }
      get_seller_contact: {
        Args: { p_ad_id: string }
        Returns: {
          contact_preference: string
          phone: string
          whatsapp_number: string
        }[]
      }
      has_favorited: { Args: { p_ad_id: string }; Returns: boolean }
      increment_ad_views: { Args: { p_ad_id: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
      is_banned: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      mark_ad_sold: { Args: { p_ad_id: string }; Returns: undefined }
      mark_expired_ads: { Args: never; Returns: number }
      renew_ad: { Args: { p_ad_id: string }; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      ad_status: "draft" | "active" | "sold" | "expired" | "deleted"
      condition_type: "new" | "used"
      contact_preference: "phone" | "whatsapp" | "both"
      pta_status: "pta_approved" | "non_pta" | "jv" | "unknown"
      report_reason:
        | "fake_ad"
        | "already_sold"
        | "fraud_scam"
        | "wrong_info"
        | "prohibited_item"
        | "other"
      report_status: "pending" | "reviewed" | "dismissed" | "action_taken"
      user_role: "user" | "moderator" | "admin"
      warranty_type: "none" | "in_warranty"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      ad_status: ["draft", "active", "sold", "expired", "deleted"],
      condition_type: ["new", "used"],
      contact_preference: ["phone", "whatsapp", "both"],
      pta_status: ["pta_approved", "non_pta", "jv", "unknown"],
      report_reason: [
        "fake_ad",
        "already_sold",
        "fraud_scam",
        "wrong_info",
        "prohibited_item",
        "other",
      ],
      report_status: ["pending", "reviewed", "dismissed", "action_taken"],
      user_role: ["user", "moderator", "admin"],
      warranty_type: ["none", "in_warranty"],
    },
  },
} as const
