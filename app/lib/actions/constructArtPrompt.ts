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

    const style = selections.style ? `Style: ${selections.style}` : "";
    const technique = selections.technique ? `Technique: ${selections.technique}` : "";
    const subject = selections.subject ? `subject: ${selections.subject}` : "";
    const setting = selections.setting ? `Setting: ${selections.setting}` : "";
    const time = selections.time ? `Time: ${selections.time}` : "";
    const weather = selections.weather ? `Weather: ${selections.weather}` : "";
    const mood = selections.mood ? `Mood: ${selections.mood}` : "";
    const composition = selections.composition ? `Composition: ${selections.composition}` : "";

    const promptInstructions = "Generate a piece of art based on the following prompt: ";
    const promptStart = "Digital painting, illustration, sci-fi, fantasy, rule of thirds, dynamic poses. ";
    const promptEnd = "DO NOT: Include sexual content, art tools (such as pencils, brushes, etc.), generate characters with the likeness of proprietary characters, violate copyright protected material and intellectual property, generate anything but original artwork."
    
    // const promptParts = Object
    //   .entries(selections)
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   .map(([category, value]) => {
    //   return value || "";
    // }).join(" ");


    const constructedArtPrompt = `${promptInstructions} ${promptStart} ${style}. ${technique}. ${userPrompt}. ${subject}. ${setting}. ${time}. ${weather}. ${mood}. ${composition}. ${promptEnd}`;

    // TODO: Dynamically add descriptions for entity types.
    
    return constructedArtPrompt.trim();
  }