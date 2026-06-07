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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          content: Json
          content_text: string
          created_at: string | null
          downvotes: number | null
          id: string
          is_accepted: boolean | null
          question_id: string
          updated_at: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: Json
          content_text: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_accepted?: boolean | null
          question_id: string
          updated_at?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: Json
          content_text?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_accepted?: boolean | null
          question_id?: string
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string | null
          criteria: Json
          description: string
          display_order: number | null
          icon: string
          id: string
          name: string
          slug: string
          tier: Database["public"]["Enums"]["badge_tier"]
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          description: string
          display_order?: number | null
          icon: string
          id?: string
          name: string
          slug: string
          tier: Database["public"]["Enums"]["badge_tier"]
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          description?: string
          display_order?: number | null
          icon?: string
          id?: string
          name?: string
          slug?: string
          tier?: Database["public"]["Enums"]["badge_tier"]
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string | null
          id: string
          question_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          parent_id: string | null
          target_id: string
          target_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          target_id: string
          target_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          target_id?: string
          target_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kitab_master: {
        Row: {
          bidang: string | null
          cover_url: string | null
          created_at: string | null
          deskripsi: string | null
          id: string
          nama_arab: string
          nama_latin: string
          penerbit: string | null
          pengarang: string
          tahun_cetak: string | null
        }
        Insert: {
          bidang?: string | null
          cover_url?: string | null
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          nama_arab: string
          nama_latin: string
          penerbit?: string | null
          pengarang: string
          tahun_cetak?: string | null
        }
        Update: {
          bidang?: string | null
          cover_url?: string | null
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          nama_arab?: string
          nama_latin?: string
          penerbit?: string | null
          pengarang?: string
          tahun_cetak?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banned_until: string | null
          bio: string | null
          created_at: string | null
          dark_mode: boolean | null
          display_name: string | null
          email_notifications: boolean | null
          gelar: string | null
          id: string
          is_banned: boolean | null
          is_verified: boolean | null
          kunyah: string | null
          last_login_at: string | null
          level: number | null
          reputation: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          show_gelar: boolean | null
          show_kunyah: boolean | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          banned_until?: string | null
          bio?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          display_name?: string | null
          email_notifications?: boolean | null
          gelar?: string | null
          id: string
          is_banned?: boolean | null
          is_verified?: boolean | null
          kunyah?: string | null
          last_login_at?: string | null
          level?: number | null
          reputation?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          show_gelar?: boolean | null
          show_kunyah?: boolean | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          banned_until?: string | null
          bio?: string | null
          created_at?: string | null
          dark_mode?: boolean | null
          display_name?: string | null
          email_notifications?: boolean | null
          gelar?: string | null
          id?: string
          is_banned?: boolean | null
          is_verified?: boolean | null
          kunyah?: string | null
          last_login_at?: string | null
          level?: number | null
          reputation?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          show_gelar?: boolean | null
          show_kunyah?: boolean | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      question_tags: {
        Row: {
          question_id: string
          tag_id: string
        }
        Insert: {
          question_id: string
          tag_id: string
        }
        Update: {
          question_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_tags_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          accepted_answer_id: string | null
          content: Json
          content_text: string
          created_at: string | null
          downvotes: number | null
          id: string
          mughlaq_reason: string | null
          muraqi_id: string | null
          search_vector: unknown
          slug: string
          status: Database["public"]["Enums"]["question_status"] | null
          title: string
          total_answers: number | null
          updated_at: string | null
          upvotes: number | null
          user_id: string
          views: number | null
        }
        Insert: {
          accepted_answer_id?: string | null
          content: Json
          content_text: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          mughlaq_reason?: string | null
          muraqi_id?: string | null
          search_vector?: unknown
          slug: string
          status?: Database["public"]["Enums"]["question_status"] | null
          title: string
          total_answers?: number | null
          updated_at?: string | null
          upvotes?: number | null
          user_id: string
          views?: number | null
        }
        Update: {
          accepted_answer_id?: string | null
          content?: Json
          content_text?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          mughlaq_reason?: string | null
          muraqi_id?: string | null
          search_vector?: unknown
          slug?: string
          status?: Database["public"]["Enums"]["question_status"] | null
          title?: string
          total_answers?: number | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_muraqi_id_fkey"
            columns: ["muraqi_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      references: {
        Row: {
          answer_id: string
          bab: string | null
          catatan: string | null
          created_at: string | null
          halaman: string | null
          id: string
          jilid: string | null
          kitab_id: string
          rejection_reason: string | null
          teks_arab: string | null
          terjemah: string | null
          updated_at: string | null
          validated_at: string | null
          validated_by_id: string | null
          validation_status:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Insert: {
          answer_id: string
          bab?: string | null
          catatan?: string | null
          created_at?: string | null
          halaman?: string | null
          id?: string
          jilid?: string | null
          kitab_id: string
          rejection_reason?: string | null
          teks_arab?: string | null
          terjemah?: string | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Update: {
          answer_id?: string
          bab?: string | null
          catatan?: string | null
          created_at?: string | null
          halaman?: string | null
          id?: string
          jilid?: string | null
          kitab_id?: string
          rejection_reason?: string | null
          teks_arab?: string | null
          terjemah?: string | null
          updated_at?: string | null
          validated_at?: string | null
          validated_by_id?: string | null
          validation_status?:
            | Database["public"]["Enums"]["validation_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "references_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "references_kitab_id_fkey"
            columns: ["kitab_id"]
            isOneToOne: false
            referencedRelation: "kitab_master"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "references_validated_by_id_fkey"
            columns: ["validated_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reputation_logs: {
        Row: {
          created_at: string | null
          id: string
          points: number
          reason: string
          reference_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          points: number
          reason: string
          reference_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          points?: number
          reason?: string
          reference_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reputation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          question_count: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          question_count?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          question_count?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          created_at: string | null
          id: string
          target_id: string
          target_type: Database["public"]["Enums"]["vote_target"]
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          target_id: string
          target_type: Database["public"]["Enums"]["vote_target"]
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          target_id?: string
          target_type?: Database["public"]["Enums"]["vote_target"]
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_banned_user: { Args: never; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      unaccent: { Args: { "": string }; Returns: string }
    }
    Enums: {
      badge_tier: "BRONZE" | "SILVER" | "GOLD"
      notification_type:
        | "NEW_ANSWER"
        | "NEW_COMMENT"
        | "UPVOTE"
        | "ANSWER_ACCEPTED"
        | "BADGE_EARNED"
        | "REFERENCE_VALIDATED"
        | "MOD_WARNING"
        | "STATUS_CHANGED"
      question_status: "HALL" | "MAUQUF" | "TERSELESAIKAN" | "MUGHLAQ"
      user_role: "ZAIR" | "THALIB" | "MUJIB" | "MURAQI" | "MUDIR"
      validation_status: "PENDING" | "VALID" | "TIDAK_VALID"
      vote_target: "QUESTION" | "ANSWER"
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
      badge_tier: ["BRONZE", "SILVER", "GOLD"],
      notification_type: [
        "NEW_ANSWER",
        "NEW_COMMENT",
        "UPVOTE",
        "ANSWER_ACCEPTED",
        "BADGE_EARNED",
        "REFERENCE_VALIDATED",
        "MOD_WARNING",
        "STATUS_CHANGED",
      ],
      question_status: ["HALL", "MAUQUF", "TERSELESAIKAN", "MUGHLAQ"],
      user_role: ["ZAIR", "THALIB", "MUJIB", "MURAQI", "MUDIR"],
      validation_status: ["PENDING", "VALID", "TIDAK_VALID"],
      vote_target: ["QUESTION", "ANSWER"],
    },
  },
} as const
