import React from "react";
import Typography from "@mui/material/Typography";

type RulesKeywordProps = {
  plural?: boolean;
  keyword: 
    "entity" | "event" | "effect" | "object" | "node" |
    "common" | "rare" | "epic" | "prime" |
    "speed" | "attack" | "defense" |
    "planet" | "hand" | "cache" | "archive" | "deck" | "queue" | "hand";
}

export default function TextBold({ 
  keyword,
  plural,
}: RulesKeywordProps) {
  let keywordLower = keyword.toLowerCase();
  let color = "neutral";
  const textStyle = `font-semibold text-${color}-500`;

  if (plural) {
    switch (keywordLower) {
      case "entity":
        keywordLower = "entities";
        break;
      case "event":
        keywordLower = "events";
        break;
      case "effect":
        keywordLower = "effects";
        break;
      case "object":
        keywordLower = "objects";
        break;
      case "node":
        keywordLower = "nodes";
        break;
      case "common":
        keywordLower = "commons";
        break;
      case "rare":
        keywordLower = "rares";
        break;
      case "epic":
        keywordLower = "epics";
        break;
      case "prime":
        keywordLower = "primes";
        break;
      case "speed":
        keywordLower = "speeds";
        break;
      case "attack":
        keywordLower = "attacks";
        break;
      case "defense":
        keywordLower = "defenses";
        break;
      case "planet":
        keywordLower = "planets";
        break;
      case "hand":
        keywordLower = "hands";
        break;
      case "cache":
        keywordLower = "caches";
        break;
      case "archive":
        keywordLower = "archives";
        break;
      case "deck":
        keywordLower = "decks";
        break;
      case "queue":
        keywordLower = "queues";
        break;
    }
  }

  const styledKeyword = keywordLower.charAt(0).toUpperCase() + keywordLower.slice(1);

  if (keyword === "entity") {
    color = "cyan"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "event") {
    color = "fuchsia"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "effect") {
    color = "amber"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "object") {
    color = "emerald"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "node") {
    color = "stone"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "common") {
    color = "zinc"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "rare") {
    color = "indigo"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "epic") {
    color = "purple"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "prime") {
    color = "pink"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "speed") {
    color = "amber"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "attack") {
    color = "rose"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  } else if (keyword === "defense") {
    color = "teal"
    return (
      <Typography variant="body1" className={textStyle}>{styledKeyword}</Typography>
    )
  }
}