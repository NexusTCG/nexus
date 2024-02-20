"use server";

export async function postCardToDiscord(card: {
  cardName: string;
  cardRender: string;
  cardCreator: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

  const message = {
    content: `${card.cardName} by ${card.cardCreator}!`,
    embeds: [{
      image: {
        url: card.cardRender
      }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Failed to post card to Discord", await response.text());
    }
  } catch (error) {
    console.error("Error posting to Discord", error);
  }
}
