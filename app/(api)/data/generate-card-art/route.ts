"use server";

import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const { prompt } = await req.json();
        
        try {
            const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024"
                })
            });

            if (!imageResponse.ok) {
                throw new Error(`API call failed: ${imageResponse.statusText}`);
            }

            const imageData = await imageResponse.json();
            console.log(imageData);
            const image_url = imageData.data[0].url;

            return new Response(JSON.stringify({ image_url }), {
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
        return new NextResponse(null, { status: 405 });
    }
}