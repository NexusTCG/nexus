// import { Box, Typography } from "@mui/material/";
// import NexusCardForm from "@/app/components/card-creator/NexusCardForm";

// export default async function DashboardHome() {
//     return (
//         <Box className="flex flex-col w-full h-full gap-4 p-6 bg-gray-800 md:bg-gray-900">
//             <Typography variant="h1">Dashboard</Typography>
//             <NexusCardForm />
//         </Box>
//     );
// };
"use client";

import useSession from "@/app/lib/supabase/useSession";
import { useState, useEffect } from 'react';
import fetchCards from "@/app/lib/fetchCards"
import clsx from 'clsx';

type Card = {
    id: number;
    created_at: string;
    user_id: string;
    name: string;
    color: string;
}

const session = useSession()?.user;
  if (!session) {
      console.log("User session active.");
  } else {
      console.log("User session inactive.");
  };

export default function DashboardHome() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCards();
            if (data) {
                setCards(data);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {cards.map((card) => (
                    <div className="card" key={card.id}>
                        <h2 className={clsx(
                            'text-2xl font-bold',
                            card.color === 'Red' && 'text-red-500',
                            card.color === 'Blue' && 'text-blue-500',
                            card.color === 'Yellow' && 'text-yellow-500',
                        )}>{card.name}</h2>
                        <p>{card.name} is very cool!</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
