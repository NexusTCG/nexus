// "use server";

// import puppeteer from "puppeteer";
// import { createClient } from "@supabase/supabase-js";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   if (req.method === "POST") {
//     const { cardSlug } = await req.json();
    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(`https://localhost:3000/dashboard/cards/[${cardSlug}]`, {
//       waitUntil: "networkidle0"
//     });


//     const cardElement = await page.$('#card-render-container');
//     if (!cardElement) {
//       await browser.close();
//       return new Response(), {
//           status: 404,
//           headers: { 'Message': 'Element not found' },
//       };
//     }

//     const cardImageBuffer = await cardElement.screenshot();
//     const supabase = createClient(
//       process.env.SUPABASE_URL!,
//       process.env.SUPABASE_ANON_KEY!
//     );

//     const filePath = `cards/${cardSlug}.png`;

//     const { data, error } = await supabase.storage
//       .from('card-images')
//       .upload(filePath, cardImageBuffer, {
//         contentType: 'image/png',
//         upsert: true,
//       });
    

//     await browser.close();

//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//     });
//     }

//     return new Response(JSON.stringify({ imageUrl: data.path }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//     });
    
//   } else {
//     return new Response(null, { status: 405 });
//   }
  
// }
