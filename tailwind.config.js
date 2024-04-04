/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

function generateColorClasses(baseColor) {
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  .flatMap(shade => [
    `bg-${baseColor}-${shade}`,
  ]);
}

const baseColors = [
  "yellow", // Radiant
  "sky", // Volatile
  "violet", // Corrupt
  "red", // Blaze
  "lime", // Verdant
  "gray", // Void
  "radiant-volatile",
  "radiant-corrupt",
  "radiant-blaze",
  "radiant-verdant",
  "volatile-corrupt",
  "volatile-blaze",
  "volatile-verdant",
  "corrupt-blaze",
  "corrupt-verdant",
  "blaze-verdant",
  "anomaly",
  "multi",
  "slate" // Default
];

const safelist = baseColors.flatMap(
  color => generateColorClasses(color)
);

module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: safelist,
  theme: {
    extend: {
      backgroundImage: {
        // Multi: radiant-volatile-corrupt-blaze-green
        "multi-50":
          "linear-gradient(45deg, #fefce8 0%, #e0f2fe 20%, #f3e8ff 40%, #fee2e2 60%, #f7fee7 80%)",
        "multi-100":
          "linear-gradient(45deg, #fef9c3 0%, #bae6fd 20%, #ede9fe 40%, #fecaca 60%, #ecfccb 80%)",
        "multi-200":
          "linear-gradient(45deg, #fef08a 0%, #93c5fd 20%, #ddd6fe 40%, #fca5a5 60%, #d9f99d 80%)",
        "multi-300":
          "linear-gradient(45deg, #fde047 0%, #60a5fa 20%, #c4b5fd 40%, #f87171 60%, #bef264 80%)",
        "multi-400":
          "linear-gradient(45deg, #facc15 0%, #3b82f6 20%, #a78bfa 40%, #f87171 60%, #a3e635 80%)",
        "multi-500":
          "linear-gradient(45deg, #eab308 0%, #2563eb 20%, #8b5cf6 40%, #ef4444 60%, #84cc16 80%)",
        "multi-600":
          "linear-gradient(45deg, #ca8a04 0%, #1d4ed8 20%, #7c3aed 40%, #dc2626 60%, #65a30d 80%)",
        "multi-700":
          "linear-gradient(45deg, #a16207 0%, #1e40af 20%, #6d28d9 40%, #b91c1c 60%, #4d7c0f 80%)",
        "multi-800":
          "linear-gradient(45deg, #854d0e 0%, #1e3a8a 20%, #5b21b6 40%, #991b1b 60%, #3f6212 80%)",
        "multi-900":
          "linear-gradient(45deg, #713f12 0%, #1e3a8a 20%, #4c1d95 40%, #7f1d1d 60%, #365314 80%)",
        "multi-950":
          "linear-gradient(45deg, #422006 0%, #082f49 20%, #2e1065 40%, #450a0a 60%, #1a2e05 80%)",

        // Dual: radiantVolatile
        "radiant-volatile-50":
          "linear-gradient(90deg, #fefce8 0%, #e0f2fe 100%)",
        "radiant-volatile-100":
          "linear-gradient(90deg, #fef9c3 0%, #bae6fd 100%)",
        "radiant-volatile-200":
          "linear-gradient(90deg, #fef08a 0%, #93c5fd 100%)",
        "radiant-volatile-300":
          "linear-gradient(90deg, #fde047 0%, #60a5fa 100%)",
        "radiant-volatile-400":
          "linear-gradient(90deg, #facc15 0%, #3b82f6 100%)",
        "radiant-volatile-500":
          "linear-gradient(90deg, #eab308 0%, #2563eb 100%)",
        "radiant-volatile-600":
          "linear-gradient(90deg, #ca8a04 0%, #1d4ed8 100%)",
        "radiant-volatile-700":
          "linear-gradient(90deg, #a16207 0%, #1e40af 100%)",
        "radiant-volatile-800":
          "linear-gradient(90deg, #854d0e 0%, #1e3a8a 100%)",
        "radiant-volatile-900":
          "linear-gradient(90deg, #713f12 0%, #1e3a8a 100%)",
        "radiant-volatile-950":
          "linear-gradient(90deg, #422006 0%, #082f49 100%)",

        // Dual: radiantCorrupt
        "radiant-corrupt-50":
          "linear-gradient(90deg, #fefce8 0%, #f3e8ff 100%)",
        "radiant-corrupt-100":
          "linear-gradient(90deg, #fef9c3 0%, #ede9fe 100%)",
        "radiant-corrupt-200":
          "linear-gradient(90deg, #fef08a 0%, #ddd6fe 100%)",
        "radiant-corrupt-300":
          "linear-gradient(90deg, #fde047 0%, #c4b5fd 100%)",
        "radiant-corrupt-400":
          "linear-gradient(90deg, #facc15 0%, #a78bfa 100%)",
        "radiant-corrupt-500":
          "linear-gradient(90deg, #eab308 0%, #8b5cf6 100%)",
        "radiant-corrupt-600":
          "linear-gradient(90deg, #ca8a04 0%, #7c3aed 100%)",
        "radiant-corrupt-700":
          "linear-gradient(90deg, #a16207 0%, #6d28d9 100%)",
        "radiant-corrupt-800":
          "linear-gradient(90deg, #854d0e 0%, #5b21b6 100%)",
        "radiant-corrupt-900":
          "linear-gradient(90deg, #713f12 0%, #4c1d95 100%)",
        "radiant-corrupt-950":
          "linear-gradient(90deg, #422006 0%, #2e1065 100%)",

        // Dual: radiantBlaze
        "radiant-blaze-50":
          "linear-gradient(90deg, #fefce8 0%, #fee2e2 100%)",
        "radiant-blaze-100":
          "linear-gradient(90deg, #fef9c3 0%, #fecaca 100%)",
        "radiant-blaze-200":
          "linear-gradient(90deg, #fef08a 0%, #fca5a5 100%)",
        "radiant-blaze-300":
          "linear-gradient(90deg, #fde047 0%, #f87171 100%)",
        "radiant-blaze-400":
          "linear-gradient(90deg, #facc15 0%, #f87171 100%)",
        "radiant-blaze-500":
          "linear-gradient(90deg, #eab308 0%, #ef4444 100%)",
        "radiant-blaze-600":
          "linear-gradient(90deg, #ca8a04 0%, #dc2626 100%)",
        "radiant-blaze-700":
          "linear-gradient(90deg, #a16207 0%, #b91c1c 100%)",
        "radiant-blaze-800":
          "linear-gradient(90deg, #854d0e 0%, #991b1b 100%)",
        "radiant-blaze-900":
          "linear-gradient(90deg, #713f12 0%, #7f1d1d 100%)",
        "radiant-blaze-950":
          "linear-gradient(90deg, #422006 0%, #450a0a 100%)",

        // Dual: radiantVerdant
        "radiant-verdant-50": "linear-gradient(90deg, #fefce8 100%, #f7fee7 100%)",
        "radiant-verdant-100":
          "linear-gradient(90deg, #fef9c3 0%, #ecfccb 100%)",
        "radiant-verdant-200":
          "linear-gradient(90deg, #fef08a 0%, #d9f99d 100%)",
        "radiant-verdant-300":
          "linear-gradient(90deg, #fde047 0%, #bef264 100%)",
        "radiant-verdant-400":
          "linear-gradient(90deg, #facc15 0%, #a3e635 100%)",
        "radiant-verdant-500":
          "linear-gradient(90deg, #eab308 0%, #84cc16 100%)",
        "radiant-verdant-600":
          "linear-gradient(90deg, #ca8a04 0%, #65a30d 100%)",
        "radiant-verdant-700":
          "linear-gradient(90deg, #a16207 0%, #4d7c0f 100%)",
        "radiant-verdant-800":
          "linear-gradient(90deg, #854d0e 0%, #3f6212 100%)",
        "radiant-verdant-900":
          "linear-gradient(90deg, #713f12 0%, #365314 100%)",
        "radiant-verdant-950":
          "linear-gradient(90deg, #422006 0%, #1a2e05 100%)",

        // Dual: volatileCorrupt
        "volatile-corrupt-50":
          "linear-gradient(90deg, #e0f2fe 0%, #f3e8ff 100%)",
        "volatile-corrupt-100":
          "linear-gradient(90deg, #bae6fd 0%, #ede9fe 100%)",
        "volatile-corrupt-200":
          "linear-gradient(90deg, #93c5fd 0%, #ddd6fe 100%)",
        "volatile-corrupt-300":
          "linear-gradient(90deg, #60a5fa 0%, #c4b5fd 100%)",
        "volatile-corrupt-400":
          "linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)",
        "volatile-corrupt-500":
          "linear-gradient(90deg, #2563eb 0%, #8b5cf6 100%)",
        "volatile-corrupt-600":
          "linear-gradient(90deg, #1d4ed8 0%, #7c3aed 100%)",
        "volatile-corrupt-700":
          "linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)",
        "volatile-corrupt-800":
          "linear-gradient(90deg, #1e3a8a 0%, #5b21b6 100%)",
        "volatile-corrupt-900":
          "linear-gradient(90deg, #1e3a8a 0%, #4c1d95 100%)",
        "volatile-corrupt-950":
          "linear-gradient(90deg, #082f49 0%, #2e1065 100%)",

        // Dual: volatileBlaze
        "volatile-blaze-50":
          "linear-gradient(90deg, #e0f2fe 0%, #fee2e2 100%)",
        "volatile-blaze-100":
          "linear-gradient(90deg, #bae6fd 0%, #fecaca 100%)",
        "volatile-blaze-200":
          "linear-gradient(90deg, #93c5fd 0%, #fca5a5 100%)",
        "volatile-blaze-300":
          "linear-gradient(90deg, #60a5fa 0%, #f87171 100%)",
        "volatile-blaze-400":
          "linear-gradient(90deg, #3b82f6 0%, #f87171 100%)",
        "volatile-blaze-500":
          "linear-gradient(90deg, #2563eb 0%, #ef4444 100%)",
        "volatile-blaze-600":
          "linear-gradient(90deg, #1d4ed8 0%, #dc2626 100%)",
        "volatile-blaze-700":
          "linear-gradient(90deg, #1e40af 0%, #b91c1c 100%)",
        "volatile-blaze-800":
          "linear-gradient(90deg, #1e3a8a 0%, #991b1b 100%)",
        "volatile-blaze-900":
          "linear-gradient(90deg, #1e3a8a 0%, #7f1d1d 100%)",
        "volatile-blaze-950":
          "linear-gradient(90deg, #082f49 0%, #450a0a 100%)",

        // Dual: volatileVerdant
        "volatile-verdant-50":
          "linear-gradient(90deg, #e0f2fe 0%, #f7fee7 100%)",
        "volatile-verdant-100":
          "linear-gradient(90deg, #bae6fd 0%, #ecfccb 100%)",
        "volatile-verdant-200":
          "linear-gradient(90deg, #93c5fd 0%, #d9f99d 100%)",
        "volatile-verdant-300":
          "linear-gradient(90deg, #60a5fa 0%, #bef264 100%)",
        "volatile-verdant-400":
          "linear-gradient(90deg, #3b82f6 0%, #a3e635 100%)",
        "volatile-verdant-500":
          "linear-gradient(90deg, #2563eb 0%, #84cc16 100%)",
        "volatile-verdant-600":
          "linear-gradient(90deg, #1d4ed8 0%, #65a30d 100%)",
        "volatile-verdant-700":
          "linear-gradient(90deg, #1e40af 0%, #4d7c0f 100%)",
        "volatile-verdant-800":
          "linear-gradient(90deg, #1e3a8a 0%, #3f6212 100%)",
        "volatile-verdant-900":
          "linear-gradient(90deg, #1e3a8a 0%, #365314 100%)",
        "volatile-verdant-950":
          "linear-gradient(90deg, #082f49 0%, #1a2e05 100%)",

        // Dual: corruptBlaze
        "corrupt-blaze-50":
          "linear-gradient(90deg, #f3e8ff 0%, #fee2e2 100%)",
        "corrupt-blaze-100":
          "linear-gradient(90deg, #ede9fe 0%, #fecaca 100%)",
        "corrupt-blaze-200":
          "linear-gradient(90deg, #ddd6fe 0%, #fca5a5 100%)",
        "corrupt-blaze-300":
          "linear-gradient(90deg, #c4b5fd 0%, #f87171 100%)",
        "corrupt-blaze-400":
          "linear-gradient(90deg, #a78bfa 0%, #f87171 100%)",
        "corrupt-blaze-500":
          "linear-gradient(90deg, #8b5cf6 0%, #ef4444 100%)",
        "corrupt-blaze-600":
          "linear-gradient(90deg, #7c3aed 0%, #dc2626 100%)",
        "corrupt-blaze-700":
          "linear-gradient(90deg, #6d28d9 0%, #b91c1c 100%)",
        "corrupt-blaze-800":
          "linear-gradient(90deg, #5b21b6 0%, #991b1b 100%)",
        "corrupt-blaze-900":
          "linear-gradient(90deg, #4c1d95 0%, #7f1d1d 100%)",
        "corrupt-blaze-950":
          "linear-gradient(90deg, #2e1065 0%, #450a0a 100%)",

        // Dual: corruptVerdant
        "corrupt-verdant-50":
          "linear-gradient(90deg, #f3e8ff 0%, #f7fee7 100%)",
        "corrupt-verdant-100":
          "linear-gradient(90deg, #ede9fe 0%, #ecfccb 100%)",
        "corrupt-verdant-200":
          "linear-gradient(90deg, #ddd6fe 0%, #d9f99d 100%)",
        "corrupt-verdant-300":
          "linear-gradient(90deg, #c4b5fd 0%, #bef264 100%)",
        "corrupt-verdant-400":
          "linear-gradient(90deg, #a78bfa 0%, #a3e635 100%)",
        "corrupt-verdant-500":
          "linear-gradient(90deg, #8b5cf6 0%, #84cc16 100%)",
        "corrupt-verdant-600":
          "linear-gradient(90deg, #7c3aed 0%, #65a30d 100%)",
        "corrupt-verdant-700":
          "linear-gradient(90deg, #6d28d9 0%, #4d7c0f 100%)",
        "corrupt-verdant-800":
          "linear-gradient(90deg, #5b21b6 0%, #3f6212 100%)",
        "corrupt-verdant-900":
          "linear-gradient(90deg, #4c1d95 0%, #365314 100%)",
        "corrupt-verdant-950":
          "linear-gradient(90deg, #2e1065 0%, #1a2e05 100%)",

        // Dual: blazeVerdant
        "blaze-verdant-50":
          "linear-gradient(90deg, #fee2e2 0%, #f7fee7 100%)",
        "blaze-verdant-100":
          "linear-gradient(90deg, #fecaca 0%, #ecfccb 100%)",
        "blaze-verdant-200":
          "linear-gradient(90deg, #fca5a5 0%, #d9f99d 100%)",
        "blaze-verdant-300":
          "linear-gradient(90deg, #f87171 0%, #bef264 100%)",
        "blaze-verdant-400":
          "linear-gradient(90deg, #f87171 0%, #a3e635 100%)",
        "blaze-verdant-500":
          "linear-gradient(90deg, #ef4444 0%, #84cc16 100%)",
        "blaze-verdant-600":
          "linear-gradient(90deg, #dc2626 0%, #65a30d 100%)",
        "blaze-verdant-700":
          "linear-gradient(90deg, #b91c1c 0%, #4d7c0f 100%)",
        "blaze-verdant-800":
          "linear-gradient(90deg, #991b1b 0%, #3f6212 100%)",
        "blaze-verdant-900":
          "linear-gradient(90deg, #7f1d1d 0%, #365314 100%)",
        "blaze-verdant-950":
          "linear-gradient(90deg, #450a0a 0%, #1a2e05 100%)",

        // Dual: anomaly
        "anomaly-50":
          "linear-gradient(90deg, #fafafa 0%, #fafaf9 100%)",
        "anomaly-100":
          "linear-gradient(90deg, #f5f5f5 0%, #f5f5f4 100%)",
        "anomaly-200":
          "linear-gradient(90deg, #e5e5e5 0%, #e7e5e4 100%)",
        "anomaly-300":
          "linear-gradient(90deg, #d4d4d4 0%, #d6d3d1 100%)",
        "anomaly-400":
          "linear-gradient(90deg, #a3a3a3 0%, #a8a29e 100%)",
        "anomaly-500":
          "linear-gradient(90deg, #737373 0%, #78716c 100%)",
        "anomaly-600":
          "linear-gradient(90deg, #525252 0%, #57534e 100%)",
        "anomaly-700":
          "linear-gradient(90deg, #404040 0%, #44403c 100%)",
        "anomaly-800":
          "linear-gradient(90deg, #262626 0%, #292524 100%)",
        "anomaly-900":
          "linear-gradient(90deg, #171717 0%, #1c1917 100%)",
        "anomaly-950":
          "linear-gradient(90deg, #0a0a0a 0%, #0c0a09 100%)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
    aspectRatio: {
      55: "55",
      108: "108",
    },
    variants: {
      aspectRatio: ["responsive", "hover"],
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};