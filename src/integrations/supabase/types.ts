export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          class_id: string
          created_at: string
          date: string
          id: string
          notes: string | null
          status: string
          student_id: string
          time: string | null
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          status: string
          student_id: string
          time?: string | null
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          status?: string
          student_id?: string
          time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          days: string[] | null
          description: string | null
          end_time: string | null
          id: string
          name: string
          room_number: string | null
          schedule: string | null
          start_time: string | null
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          days?: string[] | null
          description?: string | null
          end_time?: string | null
          id?: string
          name: string
          room_number?: string | null
          schedule?: string | null
          start_time?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          days?: string[] | null
          description?: string | null
          end_time?: string | null
          id?: string
          name?: string
          room_number?: string | null
          schedule?: string | null
          start_time?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          class_id: string
          created_at: string
          date: string
          grade: number
          id: string
          notes: string | null
          status: string | null
          student_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          date?: string
          grade: number
          id?: string
          notes?: string | null
          status?: string | null
          student_id: string
          subject: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          date?: string
          grade?: number
          id?: string
          notes?: string | null
          status?: string | null
          student_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "grades_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grades_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
          sent_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          attendance_rate: number | null
          created_at: string
          date_of_birth: string | null
          enrollment_date: string | null
          gender: string | null
          grade: string
          id: string
          overall_grade: string | null
          parent_name: string
          parent_phone: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          attendance_rate?: number | null
          created_at?: string
          date_of_birth?: string | null
          enrollment_date?: string | null
          gender?: string | null
          grade: string
          id?: string
          overall_grade?: string | null
          parent_name: string
          parent_phone: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          attendance_rate?: number | null
          created_at?: string
          date_of_birth?: string | null
          enrollment_date?: string | null
          gender?: string | null
          grade?: string
          id?: string
          overall_grade?: string | null
          parent_name?: string
          parent_phone?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          department: string
          education: string | null
          id: string
          join_date: string | null
          schedule: string | null
          specialization: string
          total_classes: number | null
          updated_at: string
          user_id: string | null
          years_of_experience: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          department: string
          education?: string | null
          id?: string
          join_date?: string | null
          schedule?: string | null
          specialization: string
          total_classes?: number | null
          updated_at?: string
          user_id?: string | null
          years_of_experience?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string
          education?: string | null
          id?: string
          join_date?: string | null
          schedule?: string | null
          specialization?: string
          total_classes?: number | null
          updated_at?: string
          user_id?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_user_id_fkey"
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
      get_conversation_messages: {
        Args: { user1_id: string; user2_id: string }
        Returns: {
          id: string
          content: string
          sent_at: string
          read: boolean
          is_sender: boolean
        }[]
      }
      get_latest_message: {
        Args: { user1_id: string; user2_id: string }
        Returns: {
          id: string
          content: string
          sent_at: string
          read: boolean
          is_sender: boolean
        }[]
      }
      get_user_conversations: {
        Args: { user_id: string }
        Returns: {
          contact_id: string
          first_name: string
          last_name: string
          avatar_url: string
          latest_message: string
          latest_sent_at: string
          unread_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
