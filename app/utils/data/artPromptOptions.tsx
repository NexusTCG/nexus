import React from "react";
import { ArtPromptOptionsDataType } from "@/app/utils/types/types";
// Icons
import Palette from "@mui/icons-material/Palette";
import Brush from "@mui/icons-material/Brush";
import People from "@mui/icons-material/People";
import Landscape from "@mui/icons-material/Landscape";
import AccessTime from "@mui/icons-material/AccessTime";
import WbSunny from "@mui/icons-material/WbSunny";
import Mood from "@mui/icons-material/Mood";
import InvertColors from "@mui/icons-material/InvertColors";
import Public from "@mui/icons-material/Public";
import Tungsten from "@mui/icons-material/Tungsten";
import Texture from "@mui/icons-material/Texture";
import Crop from "@mui/icons-material/Crop";
import Transform from "@mui/icons-material/Transform";
import LocalSee from "@mui/icons-material/LocalSee";

const Icons = {
  Palette: () => <Palette className="text-neutral-400" />,
  InvertColors: () => <InvertColors className="text-neutral-400" />,
  Brush: () => <Brush className="text-neutral-400" />,
  Tungsten: () => <Tungsten className="text-neutral-400" />,
  People: () => <People className="text-neutral-400" />,
  Public: () => <Public className="text-neutral-400" />,
  Landscape: () => <Landscape className="text-neutral-400" />,
  AccessTime: () => <AccessTime className="text-neutral-400" />,
  WbSunny: () => <WbSunny className="text-neutral-400" />,
  Mood: () => <Mood className="text-neutral-400" />,
  Texture: () => <Texture className="text-neutral-400" />,
  Crop: () => <Crop className="text-neutral-400" />,
  Transform: () => <Transform className="text-neutral-400" />,
  LocalSee: () => <LocalSee className="text-neutral-400" />,
};

export const ArtPromptOptionsData: ArtPromptOptionsDataType = {
  style: {
    section: "Style",
    summary: "",
    icon: Icons.Palette,
    options: [
      {
        "id": 1, 
        "title": "Abstract",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/abstract.jpg",
      },
      {
        "id": 2, 
        "title": "Anime",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/anime.jpg",
      },
      {
        "id": 3, 
        "title": "Art Deco",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/art-deco.jpg",
      },
      {
        "id": 4, 
        "title": "Art Nouveau",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/art-nouveau.jpg",
      },
      {
        "id": 5, 
        "title": "Baroque",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/baroque.jpg",
      },
      {
        "id": 6, 
        "title": "Cubism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/cubism.jpg",
      },
      {
        "id": 7, 
        "title": "Cyberpunk",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/cyberpunk.jpg",
      },
      {
        "id": 8, 
        "title": "Flat art",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/flat-art.jpg",
      },
      {
        "id": 9, 
        "title": "Gothic",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/gothic.jpg",
      },
      {
        "id": 10, 
        "title": "Glitch art",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/glitch-art.jpg",
      },
      {
        "id": 11, 
        "title": "Impressionism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/impressionism.jpg",
      },
      {
        "id": 12, 
        "title": "Minimalism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/minimalism.jpg",
      },
      {
        "id": 13, 
        "title": "Naturalism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/naturalism.jpg",
      },
      {
        "id": 14, 
        "title": "Paper art",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/paper-art.jpg",
      },
      {
        "id": 15, 
        "title": "Pixel art",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/pixel-art.jpg",
      },
      {
        "id": 16, 
        "title": "Psychedelic",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/psychedelic.jpg",
      },
      {
        "id": 17, 
        "title": "Realism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/realism.jpg",
      },
      {
        "id": 18, 
        "title": "Steampunk",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/steampunk.jpg",
      },
      {
        "id": 19, 
        "title": "Stylized",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/stylized.jpg",
      },
      {
        "id": 20, 
        "title": "Surrealism",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/surrealism.jpg",
      },
      {
        "id": 21, 
        "title": "Vaporwave",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/style/vaporwave.jpg",
      },
    ].sort()
  },
  color: {
    section: "Color",
    summary: "",
    icon: Icons.InvertColors,
    options: [
      {
        "id": 1, 
        "title": "Black and white",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/black-and-white.jpg",
      },
      {
        "id": 2, 
        "title": "High contrast",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/high-contrast.jpg",
      },
      {
        "id": 3, 
        "title": "High saturation",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/high-saturation.jpg",
      },
      {
        "id": 4, 
        "title": "Duo-tone",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/duo-tone.jpg",
      },
      {
        "id": 5, 
        "title": "Half-tone",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/half-tone.jpg",
      },
      {
        "id": 6, 
        "title": "Sepia",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/sepia.jpg",
      },
      {
        "id": 7, 
        "title": "Muted colors",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/color/muted-colors.jpg",
      },
    ].sort()
  },
  technique: {
    section: "Technique",
    summary: "",
    icon: Icons.Brush,
    options: [
      {
        "id": 1, 
        "title": "Airbrush",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/airbrush.jpg",
      },
      {
        "id": 2, 
        "title": "Charcoal",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/charcoal.jpg",
      },
      {
        "id": 3, 
        "title": "Collage",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/collage.jpg",
      },
      {
        "id": 4, 
        "title": "Fine liner",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/fine-liner.jpg",
      },
      {
        "id": 5, 
        "title": "Gouache",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/gouache.jpg",
      },
      {
        "id": 6, 
        "title": "Ligne claire",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/ligne-claire.jpg",
      },
      {
        "id": 7, 
        "title": "Oil painting",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/oil-painting.jpg",
      },
      {
        "id": 8, 
        "title": "Pastel",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/pastel.jpg",
      },
      {
        "id": 9, 
        "title": "Sculpture",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/sculpture.jpg",
      },
      {
        "id": 10, 
        "title": "Watercolor",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/watercolor.jpg",
      },
      {
        "id": 11, 
        "title": "Cell shading",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/cell-shading.jpg",
      },
      {
        "id": 12, 
        "title": "Stained glass",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/stained-glass.jpg",
      },
      {
        "id": 13, 
        "title": "Cave Painting",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/technique/cave-painting.jpg",
      },
    ].sort()
  },
  lighting: {
    section: "Lighting",
    summary: "",
    icon: Icons.Tungsten,
    options: [
      {
        "id": 1, 
        "title": "Natural light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/natural-light.jpg",
      },
      {
        "id": 2, 
        "title": "Florescent light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/florescent-light.jpg",
      },
      {
        "id": 3, 
        "title": "Tungsten light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/tungsten-light.jpg",
      },
      {
        "id": 4, 
        "title": "Candle light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/candle-light.jpg",
      },
      {
        "id": 5, 
        "title": "Backlight",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/backlight.jpg",
      },
      {
        "id": 6, 
        "title": "Soft light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/soft-light.jpg",
      },
      {
        "id": 7, 
        "title": "Neon Light",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/lighting/neon-light.jpg",
      },
    ].sort()
  },
  camera: {
    section: "Camera",
    summary: "",
    icon: Icons.LocalSee,
    options: [
      {
        "id": 1, 
        "title": "Fish-eye",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Lens flare",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Depth of field",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Tilted angle",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Time-lapse",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 6, 
        "title": "Slow shutter",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 7, 
        "title": "Bokeh",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  subject: {
    section: "Subject",
    summary: "",
    icon: Icons.People,
    options: [
      {
        "id": 1, 
        "title": "No characters",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "One character",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Two characters",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Group of characters",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Crowd",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  planet: {
    section: "Planet",
    summary: "",
    icon: Icons.Public,
    options: [
      {
        "id": 1, 
        "title": "Skandheim", 
        "description": "A cold world inhabited by futuristic cyberpunk viking.",
        "prompt": "Snow, fjords, high mountains, and cyberpunk viking architecture.",
        "image": "/images/art-prompt-options/planet/skandheim.jpeg",
      },
      {
        "id": 2, 
        "title": "Dunestar", 
        "description": "A hot desert world that hold untold ancient secrets.",
        "prompt": "Desert, rocks, ancient technology, arabic architecture, and mystic ruins.",
        "image": "/images/art-prompt-options/planet/dunestar.jpeg",
      },
      {
        "id": 3, 
        "title": "Deepmere", 
        "description": "A tropical world with seas as vast as they are deep.",
        "prompt": "Vast seas, tropical flore, islands, and reefs.",
        "image": "/images/art-prompt-options/planet/deepmere.jpeg",
      },
      {
        "id": 4, 
        "title": "Glintara", 
        "description": "A dark underground world lit by glowing flora and crystals.",
        "prompt": "Dark artificial caverns, bioluminescent moss, and glowing crystals.",
        "image": "/images/art-prompt-options/planet/glintara.jpeg",
      },
      {
        "id": 5, 
        "title": "Lumina", 
        "description": "A bright planet-wide metropolis with galactic politics.",
        "prompt": "Futuristic solarpunk metropolis, tall skyscrapers, and beautiful parks.",
        "image": "/images/art-prompt-options/planet/lumina.jpeg",
      },
      {
        "id": 6, 
        "title": "Moroseth", 
        "description": "A damned, dark world with horrid inhabitans and atmosphere.",
        "prompt": "Medieval town, gothic futuristic buildings, darkness, fog, and moonlight.",
        "image": "/images/art-prompt-options/planet/moroseth.jpeg",
      },
      {
        "id": 7, 
        "title": "Starhaven", 
        "description": "A vast ringworld and frontier town for spacefarers.",
        "prompt": "Ringworld that stretches to the horizon, vegetation, buildings, and space ships.",
        "image": "/images/art-prompt-options/planet/starhaven.jpeg",
      },
      {
        "id": 8, 
        "title": "Canopis", 
        "description": "A overgrown world dominated by gigantic flora and fauna.",
        "prompt": "Dense jungle, giant flora, strange fauna, and tall artificial cliffs.",
        "image": "/images/art-prompt-options/planet/canopis.jpeg",
      },
      {
        "id": 9, 
        "title": "Secoria", 
        "description": "A chaotic and dangerous world and arena of the gods.",
        "prompt": "Lava geysers, magma rivers, steam, lightning storms, meteors, and intense darkness.",
        "image": "/images/art-prompt-options/planet/secoria.jpeg",
      },
    ],
  },
  setting: {
    section: "Setting",
    summary: "",
    icon: Icons.Landscape,
    options: [
      {
        "id": 1, 
        "title": "Interior",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Exterior",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "City",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Town",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Desert",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 6, 
        "title": "Field",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 7, 
        "title": "Forest",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 8, 
        "title": "Jungle",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 9, 
        "title": "Mountains",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 10, 
        "title": "Ocean",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 11, 
        "title": "Space",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 12, 
        "title": "Laboratory",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 13, 
        "title": "Tundra",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 14, 
        "title": "Swamp",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 15, 
        "title": "Cave",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 16, 
        "title": "Fortress",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 17, 
        "title": "Underground",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 18, 
        "title": "Underwater",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  time: {
    section: "Time",
    summary: "",
    icon: Icons.AccessTime,
    options: [
      {
        "id": 1, 
        "title": "Day",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Night",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Golden Hour",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Sunrise",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Sunset",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  texture: {
    section: "Texture",
    summary: "",
    icon: Icons.Texture,
    options: [
      {
        "id": 1, 
        "title": "Scanlines",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/texture/scanlines.jpg",
      },
      {
        "id": 2, 
        "title": "Noise",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/texture/noise.jpg",
      },
      {
        "id": 3, 
        "title": "Brush strokes",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/texture/brush-strokes.jpg",
      },
      {
        "id": 4, 
        "title": "Canvas texture",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/texture/canvas-texture.jpg",
      },
      {
        "id": 5, 
        "title": "Iridescent",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/texture/iridescent.jpg",
      },
    ].sort()
  },
  weather: {
    section: "Weather",
    summary: "",
    icon: Icons.WbSunny,
    options: [
      {
        "id": 1, 
        "title": "Cloudy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Foggy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Rainy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Snowy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Stormy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 6, 
        "title": "Sunny",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 7, 
        "title": "Windy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 8, 
        "title": "Overcast",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 9, 
        "title": "Clear",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  transform: {
    section: "Transform",
    summary: "",
    icon: Icons.Transform,
    options: [
      {
        "id": 1, 
        "title": "Distorted",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Liquified",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Warped",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Fragmented",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Fractal",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  mood: {
    section: "Mood",
    summary: "",
    icon: Icons.Mood,
    options: [
      {
        "id": 1, 
        "title": "Calm",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Chaotic",
        "description": "Comedic",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Dramatic",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Dreamy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Creepy",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 6, 
        "title": "Heroic",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 7, 
        "title": "Serious",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 8, 
        "title": "Somber",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 9, 
        "title": "Mysterious",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 10, 
        "title": "Sinister",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 11, 
        "title": "Whimsical",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 12, 
        "title": "Otherworldly",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 13, 
        "title": "Intense",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
  framing: {
    section: "Framing",
    summary: "",
    icon: Icons.Crop,
    options: [
      {
        "id": 1, 
        "title": "Bird's Eye View",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/birds-eye-view.jpg",
      },
      {
        "id": 2, 
        "title": "Close-Up",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/close-up.jpg",
      },
      {
        "id": 3, 
        "title": "Panorama",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/panorama.jpg",
      },
      {
        "id": 4, 
        "title": "One-quarter portrait",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/one-quarter-portrait.jpg",
      },
      {
        "id": 5, 
        "title": "Full-body portrait",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/full-body-portrait.jpg",
      },
      {
        "id": 6, 
        "title": "Half-body portrait",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/half-body-portrait.jpg",
      },
      {
        "id": 7, 
        "title": "Face portrait",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/face-portrait.jpg",
      },
      {
        "id": 8, 
        "title": "Worm's Eye View",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/worms-eye-view.jpg",
      },
      {
        "id": 9, 
        "title": "Extreme Close-Up",
        "description": "",
        "prompt": "",
        "image": "/images/art-prompt-options/framing/extreme-close-up.jpg",
      },
    ].sort()
  },
  composition: {
    section: "Composition",
    summary: "",
    icon: Icons.LocalSee,
    options: [
      {
        "id": 1, 
        "title": "Symmetry",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 2, 
        "title": "Asymmetry",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 3, 
        "title": "Leading lines",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 4, 
        "title": "Depth",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 5, 
        "title": "Repetition",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 6, 
        "title": "Negative space",
        "description": "",
        "prompt": "",
        "image": "",
      },
      {
        "id": 7, 
        "title": "Radial",
        "description": "",
        "prompt": "",
        "image": "",
      },
    ].sort()
  },
}





