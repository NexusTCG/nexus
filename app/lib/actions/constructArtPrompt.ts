"use server";

type Selections = {
  style?: string;
  technique?: string;
  subject?: string;
  setting?: string;
  time?: string;
  weather?: string;
  mood?: string;
  composition?: string;
};

export default async function ConstructArtPrompt(
  selections: Selections,
  userPrompt: string
): Promise<string> {

    const promptInstructions = "Generate a piece of art based on the following prompt: ";
    const promptStart = "Concept art, digital painting, sci-fi, fantasy, rule of thirds, dynamic poses. ";
    const promptEnd = "DO NOT: Include sexual content, generate characters with the likeness of proprietary characters, violate copyright protected material and intellectual property, generate anything but original artwork."
    
    const promptParts = Object
      .entries(selections)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([category, value]) => {
      return value || "";
    }).join(" ");

    const constructedArtPrompt = `${promptInstructions} ${promptStart} ${promptParts}. ${userPrompt}. ${promptEnd}`;

    // TODO: Dynamically add descriptions for entity types.
    
    return constructedArtPrompt.trim();
  }