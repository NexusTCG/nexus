// "use client";

// // import { React } from "react";
// import { useFormContext } from "react-hook-form";
// import entityTypes from "@/app/lib/data/entityTypes";

// // export/import
// const promptOptions = {
//     instructions: "",
//     start: "Concept art, digital art, illustration, sci-fi, fantasy. ",
//     style: [
//         "",
//         "abstract",
//         "realistic",
//         "anime",
//         "sketch",
//     ],
//     method: [
//         "",
//         "ink",
//         "gouache",
//         "watercolor",
//         "ligne claire",
//     ],
//     setting: {
//         interior: "interior",
//         exterior: "exterior",
//         canopis: "canopis",
//         deepmere: "ocean planet",
//         dunestar: "desert planet with arabic influences",
//         frosthold: "snow and ice planet",
//         glintara: "",
//         lorelyn: "",
//         lumina: "",
//         moroseth: "",
//         secoria: "",
//         starhaven: "",
//         yomix: "cyberpunk metropolis with japanese influences",
//     },
//     biomes: {
//         badlands: "badlands",
//         desert: "desert",
//         shore: "shore",
//         grassland: "grassland",
//         highland: "highland",
//         subsurface: "subsurface",
//         tundra: "tundra",
//         metro: "city",
//         wetland: "wetland",
//         woods: "woods",
//     },
//     weather: {
//         clear: "clear",
//         cloudy: "cloudy",
//         overcast: "overcast",
//         sunny: "sunny",
//         rainy: "rainy",
//         snowy: "snowy",
//         foggy: "foggy",
//         windy: "windy",
//         thunder: "thunder",
//     },
//     time: [
//         "day",
//         "night",
//         "dawn",
//         "dusk",
//     ],
//     mood: {
//         dramatic: "dramatic",
//         eerie: "eerie",
//         peaceful: "peaceful",
//         chaotic: "chaotic",
//         serious: "serious",
//         funny: "funny"
//     },
//     end: "",
// }

// export default function generatePrompt() {
//     const { watch } = useFormContext();
//     const cardTypes = watch("cardTypes");
//     const cardSubTypes = watch("cardSubTypes");

//     if (cardTypes === "entity") {
//         // Dynamically set the subject based on the matched entity
//         const subjects = cardTypes
//             .map((cardSubTypes) => {
//             // Find the entity that matches the cardType
//             const entity = entityTypes
//                 .find(entity => entity.name === cardType);
//             // Use the entity's description if found, else default to an empty string
//             return entity ? entity.description : "";
//         });

//         // Assuming you want to update the subject field to include descriptions
//         const updatedSubjects = subjects
//             .reduce((acc, description, index) => {
//             acc[cardTypes[index]] = description; // Map cardType to its description
//             return acc;
//         }, {});
//     }
    
//     // map over cardTypes and generate a prompt
//     const artPrompt = `
//         ${promptOptions.instructions}
//         ${promptOptions.start}
//         ${promptOptions.style}
//         ${promptOptions.method}
//         ${JSON.stringify(updatedSubjects)}
//         ${promptOptions.setting}
//         ${promptOptions.time}
//         ${promptOptions.mood}
//         ${promptOptions.end}
//     `
//     return artPrompt;
// }