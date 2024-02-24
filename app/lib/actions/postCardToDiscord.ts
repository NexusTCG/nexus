"use server";

export async function postCardToDiscord(card: {
  cardName?: string;
  cardRender?: string;
  cardCreator?: string;
  cardIdUrl?: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

  if (card.cardRender !== undefined) {
    const cardRender = JSON.stringify(card.cardRender);

    console.log(`Posting card render to Discord: ${cardRender}`)

    const message = {
      content: `${card.cardName} by ${card.cardCreator}! ${card.cardIdUrl}`,
      embeds: [{
        image: {
          url: cardRender
        }
      }]
    };

    console.log("Message from Discord", message);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error("Failed to post card to Discord", errorBody);
        throw new Error(`Failed to post card to Discord: ${JSON.stringify(errorBody)}`);
      }
    } catch (error) {
      console.error("Error posting to Discord", error);
    }
  }
}
