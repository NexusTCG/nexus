export type CardsTableType = {
    // Base Card Data
  id?: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  username: string; // cardCreator
  // Initial Mode Card Data
  im_name: string; // cardName
  im_type: string; // cardType
  im_sub_type?: string[] | null; // cardSubType
  im_super_type?: string | null; // cardSuperType
  im_grade: string; // cardAnomalyModeGrade
  im_text?: string; // cardText
  im_lore_text?: string | null; // cardLoreText
  im_card_prompt?: string | null; // cardPrompt
  im_art_prompt?: string | null; // cardArtPrompt
  im_art_prompt_options?: string[] | null; // art_prompt_options
  im_art: string; // cardArt
  im_render?: string | null; // cardRender
  im_energy_value: number; // cardEnergyValue
  im_energy_cost: { [key: string]: number } | null; // cardEnergyCost
  im_energy_alignment?: string | null; // cardEnergyAlignment
  im_unit_attack?: string | null; // cardAttack
  im_unit_defense?: string | null; // cardDefense
  im_unit_range?: string | null; // cardUnitType
  im_speed?: string | null; // cardSpeed
  // Anomaly Mode Card Data
  am_name?: string | null; // cardAnomalyModeName
  am_type?: string; // cardAnomalyMode
  am_sub_type?: string | null; // cardSubType
  am_super_type?: string | null; // cardSuperType
  am_grade: string; // new
  am_text?: string | null; // cardAnomalyModeText
  am_lore_text?: string | null; // cardAnomalyModeLoreText
  am_card_prompt?: string | null; // new
  am_art_prompt?: string | null; // new
  am_art_prompt_options?: string[] | null; // new
  am_art?: string; // new
  am_render?: string | null; // new
};
