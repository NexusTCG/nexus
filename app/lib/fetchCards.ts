"use server"
import { createClient } from '@/app/lib/supabase/server'
import { cookies } from 'next/headers'

export default async function fetchCards() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase.from('cards').select();
    return data;
}