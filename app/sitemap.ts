import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";

export default async function sitemap() {
  const baseUrl = "https://play.nexus";

  const response = await fetchCards({
    from: "cards",
    select: "*",
  });
  const cards = response?.map((card: CardsTableType) => {
    return {
      url: baseUrl + `/dashboard/cards/${card.id}`,
      lastModified: card.updated_at ? 
        new Date(card.updated_at) : (
          card.created_at ? 
          new Date(card.created_at) : 
          new Date()
        ),
    };
  });

  return cards !== undefined ? [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...cards,
  ] : [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
};