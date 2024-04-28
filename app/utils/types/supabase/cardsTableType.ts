export type CardsTableType = {
    // Base Card Data
  id?: number;
  user_id: string;
  created_at?: string;
  updated_at?: string | null;
  username: string;
  // Initial Mode Card Data
  im_name: string;
  im_type: string;
  im_sub_type?: string[] | null;
  im_super_type?: string | null;
  im_grade: string;
  im_text?: string | null;
  im_lore_text?: string | null;
  im_card_prompt?: string | null;
  im_art_prompt?: string | null;
  im_art_prompt_options?: string[] | null;
  im_art: string;
  im_render?: string | null;
  im_energy_value: number;
  im_energy_cost?: { [key: string]: number } | null;
  im_energy_alignment?: string | null;
  im_unit_attack?: string | null;
  im_unit_defense?: string | null;
  im_unit_range?: string | null;
  im_speed?: string | null;
  // Anomaly Mode Card Data
  am_name: string | null;
  am_type: string;
  am_sub_type?: string | null;
  am_super_type?: string | null;
  am_grade: string;
  am_text?: string | null;
  am_lore_text?: string | null;
  am_card_prompt?: string | null;
  am_art_prompt?: string | null;
  am_art_prompt_options?: string[] | null;
  am_art: string | null;
  am_render?: string | null;
};
