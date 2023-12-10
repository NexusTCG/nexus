import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Cards() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: cards } = await supabase.from("cards").select();

  return (
    <div className="flex flex-col w-1/2 space-y-4 p-4 m-12 border-2 border-blue-200 rounded-2xl shadow-2xl shadow-blue-200">
        <h1 className="text-blue-200 font-extrabold text-2xl">Cards</h1>
        <ul className="flex flex-row w-full space-x-4">
            {cards && cards.map((card) => (
            <li key={card.id} className="flex flex-col w-full bg-blue-200 rounded-2xl p-3 space-y-2">
                <h2 className="bg-purple-800 rounded-lg p-2">{card.name}</h2>
                <p className="bg-purple-800 rounded-lg p-2">{card.color}</p>
                <p className="bg-purple-800 rounded-lg p-2">{card.type}</p>
            </li>
            ))}
        </ul>
    </div>
  ) 
}