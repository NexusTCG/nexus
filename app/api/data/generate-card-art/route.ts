import { NextRequest } from "next/server";
import fetch from "node-fetch";

export const maxDuration = 45;

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const { prompt } = await req.json();
        
        try {
            // Generate image
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env["OPENAI_API_KEY"]}`
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024",
                })
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }

            const responseData = await response.json() as { data: { url: string }[] };
            const openAiImageUrl = responseData.data[0].url;

            return new Response(JSON.stringify({ imageUrl: openAiImageUrl }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (error) {
            console.error('Error generating image:', error);
            return new Response(JSON.stringify({ error: 'Error generating image' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } else {
        return new Response(null, { status: 405 });
    }
}