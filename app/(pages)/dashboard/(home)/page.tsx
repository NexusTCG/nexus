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

import { createClient } from '@/app/utils/supabase/server'
import { cookies } from 'next/headers'
import clsx from 'clsx';

export default async function DashboardHome() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: cards } = await supabase.from('cards').select()

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {cards!.map((card) => (
                    <div className="card" key={card.id}>
                    <h2 className={clsx(
                        'text-2xl font-bold',
                        card.color === 'Red' && 'text-red-500',
                        card.color === 'Blue' && 'text-blue-500',
                        card.color === 'Yellow' && 'text-yellow-500',
                    )}>{card.name}</h2>
                    {/* <p>{card.color}</p> */}
                    <p>{card.name} is very cool!</p>
                    </div>
                ))}
            </div>
        </div>
    );
}