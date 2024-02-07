"use client";

import html2canvas from "html2canvas";

export default async function convertCardCodeToImage(elementId: string) {
  const cardElement = document.getElementById(elementId);

  if (!cardElement) {
    throw new Error("Card element not found");
  }

  const canvas = await html2canvas(cardElement);

  return canvas.toDataURL("image/png");
};
