import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const setNewView = async () => {
    const { data, error } = await supabase
    .from("views")
    .insert({
      name: "new name"
    })

    if (data) console.log(data);
    if (error) console.log(error);
  };

  setNewView();
  return (
    <main>Logged in</main>
  )
}