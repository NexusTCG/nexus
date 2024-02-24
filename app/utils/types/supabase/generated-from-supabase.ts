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
      cards: {
        Row: {
          cardArt: string
          cardArtPrompt: string | null
          cardAttack: string | null
          cardColor: string
          cardCreator: string | null
          cardDefense: string | null
          cardEnergyCost: Json | null
          cardEnergyValue: number | null
          cardFlavorText: string | null
          cardGrade: string | null
          cardName: string
          cardPrompt: string | null
          cardRender: string | null
          cardSpeed: string | null
          cardSubType: string | null
          cardSuperType: string | null
          cardText: string
          cardType: string
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          cardArt?: string
          cardArtPrompt?: string | null
          cardAttack?: string | null
          cardColor: string
          cardCreator?: string | null
          cardDefense?: string | null
          cardEnergyCost?: Json | null
          cardEnergyValue?: number | null
          cardFlavorText?: string | null
          cardGrade?: string | null
          cardName: string
          cardPrompt?: string | null
          cardRender?: string | null
          cardSpeed?: string | null
          cardSubType?: string | null
          cardSuperType?: string | null
          cardText?: string
          cardType?: string
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          cardArt?: string
          cardArtPrompt?: string | null
          cardAttack?: string | null
          cardColor?: string
          cardCreator?: string | null
          cardDefense?: string | null
          cardEnergyCost?: Json | null
          cardEnergyValue?: number | null
          cardFlavorText?: string | null
          cardGrade?: string | null
          cardName?: string
          cardPrompt?: string | null
          cardRender?: string | null
          cardSpeed?: string | null
          cardSubType?: string | null
          cardSuperType?: string | null
          cardText?: string
          cardType?: string
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          first_name: string | null
          id: string
          last_name: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
