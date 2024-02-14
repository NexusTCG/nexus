"use client";

import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import { CardsTableType } from "@/app/utils/types/supabase/cardsTableType";
import fetchCards from "@/app/lib/actions/supabase-data/fetchCardData";
import Image from "next/image";
import { Box } from "@mui/material"

export default function Card({
   params 
}: {
   params: { slug: string } 
}) {
  const { userProfileData } = useContext(DashboardContext);
  const [card, setCard] = useState<CardsTableType | null>(null);

  useEffect(() => {
    const loadCardData = async () => {
      const cards = await fetchCards({
        from: "cards",
        filter: { column: "id", value: params.slug },
      });

      if (cards && cards.length > 0) {
        const card = cards.find(card => card.cardCreator === userProfileData?.username);
        if (card) {
          setCard(card);
        } else {
          console.error("Card not found or does not belong to the current user.");
        }
      }
    };

    if (userProfileData?.username) {
      loadCardData();
    }
  }, [params.slug, userProfileData?.username]);

  // TODO: If card not found, display a message
  // TODO: If current user = card creator, allow sharing / downloading
  // TODO: If current user = card creator, allow editing
  // TODO: If current user != card creator, allow viewing only

  return (
    <Box>
      My card: {params.slug}
      {userProfileData ? userProfileData.username : 'Username not available'}
      {card ? (
        // Render the card details
        <div>
          <h2>{card.cardName}</h2>
          <Image
            src={card.cardRender}
            width={400}
            height={560}
            alt={card.cardName}
          />
          {/* Add more card details as needed */}
        </div>
      ) : (
        'Loading card...'
      )}
    </Box>
  );
}