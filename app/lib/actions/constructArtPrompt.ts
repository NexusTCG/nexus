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

    const promptStart = "Digital painting, illustration, sci-fi, fantasy, rule of thirds, dynamic poses, centered focus. ";
    const style = selections.style ? `Style: ${selections.style}` : "";
    const technique = selections.technique ? `Technique: ${selections.technique}` : "";
    const subject = selections.subject ? `subject: ${selections.subject}` : "";
    const setting = selections.setting ? `Setting: ${selections.setting}` : "";
    const time = selections.time ? `Time: ${selections.time}` : "";
    const weather = selections.weather ? `Weather: ${selections.weather}` : "";
    const mood = selections.mood ? `Mood: ${selections.mood}` : "";
    const composition = selections.composition ? `Composition: ${selections.composition}` : "";

    const constructedArtPrompt = `${promptStart} ${style}. ${technique}. ${userPrompt}. ${subject}. ${setting}. ${time}. ${weather}. ${mood}. ${composition}.`;
    
    return constructedArtPrompt.trim();
  }