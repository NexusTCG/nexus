import React from "react";

type RulesHighlightProps = {
  children: React.ReactNode;
  color?: "teal" | "yellow";
  style?: "bold" | "italic" | "semibold" | "bold italic" | "semibold italic";
}

export default function RulesHighlight({ 
  children, 
  color,
  style
}: RulesHighlightProps) {
  const textColor = `text-${color}-500`;
  let textStyle = "";

  if (style === "bold") {
    textStyle = "font-bold";
  } else if (style === "italic") {
    textStyle = "italic";
  } else if (style === "semibold") {
    textStyle = "font-semibold";
  } else if (style === "bold italic") {
    textStyle = "font-bold italic";
  } else if (style === "semibold italic") {
    textStyle = "font-semibold italic";
  }

  return (
    <span
      className={`
        ${textStyle}
        ${textColor}
      `}
    >
      {children}
    </span>
  )
}