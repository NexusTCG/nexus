/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

function generateColorClasses(baseColor) {
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  .flatMap(shade => [
    `bg-${baseColor}-${shade}`,
  ]);
}

const baseColors = [
  "yellow",
  "sky", // Blue
  "violet", // Purple
  "red",
  "lime", // Green
  "gray", // Void
  "yellow-blue",
  "yellow-purple",
  "yellow-red",
  "yellow-green",
  "blue-purple",
  "blue-red",
  "blue-green",
  "purple-red",
  "purple-green",
  "red-green",
  "node",
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
        // Multi: yellow-blue-purple-red-green
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

        // Dual: yellowBlue
        "yellow-blue-50":
          "linear-gradient(90deg, #fefce8 100%, #e0f2fe 100%)",
        "yellow-blue-100":
          "linear-gradient(90deg, #fef9c3 100%, #bae6fd 100%)",
        "yellow-blue-200":
          "linear-gradient(90deg, #fef08a 100%, #93c5fd 100%)",
        "yellow-blue-300":
          "linear-gradient(90deg, #fde047 100%, #60a5fa 100%)",
        "yellow-blue-400":
          "linear-gradient(90deg, #facc15 100%, #3b82f6 100%)",
        "yellow-blue-500":
          "linear-gradient(90deg, #eab308 100%, #2563eb 100%)",
        "yellow-blue-600":
          "linear-gradient(90deg, #ca8a04 100%, #1d4ed8 100%)",
        "yellow-blue-700":
          "linear-gradient(90deg, #a16207 100%, #1e40af 100%)",
        "yellow-blue-800":
          "linear-gradient(90deg, #854d0e 100%, #1e3a8a 100%)",
        "yellow-blue-900":
          "linear-gradient(90deg, #713f12 100%, #1e3a8a 100%)",
        "yellow-blue-950":
          "linear-gradient(90deg, #422006 100%, #082f49 100%)",

        // Dual: yellowPurple
        "yellow-purple-50":
          "linear-gradient(90deg, #fefce8 100%, #f3e8ff 100%)",
        "yellow-purple-100":
          "linear-gradient(90deg, #fef9c3 100%, #ede9fe 100%)",
        "yellow-purple-200":
          "linear-gradient(90deg, #fef08a 100%, #ddd6fe 100%)",
        "yellow-purple-300":
          "linear-gradient(90deg, #fde047 100%, #c4b5fd 100%)",
        "yellow-purple-400":
          "linear-gradient(90deg, #facc15 100%, #a78bfa 100%)",
        "yellow-purple-500":
          "linear-gradient(90deg, #eab308 100%, #8b5cf6 100%)",
        "yellow-purple-600":
          "linear-gradient(90deg, #ca8a04 100%, #7c3aed 100%)",
        "yellow-purple-700":
          "linear-gradient(90deg, #a16207 100%, #6d28d9 100%)",
        "yellow-purple-800":
          "linear-gradient(90deg, #854d0e 100%, #5b21b6 100%)",
        "yellow-purple-900":
          "linear-gradient(90deg, #713f12 100%, #4c1d95 100%)",
        "yellow-purple-950":
          "linear-gradient(90deg, #422006 100%, #2e1065 100%)",

        // Dual: yellowRed
        "yellow-red-50":
          "linear-gradient(90deg, #fefce8 100%, #fee2e2 100%)",
        "yellow-red-100":
          "linear-gradient(90deg, #fef9c3 100%, #fecaca 100%)",
        "yellow-red-200":
          "linear-gradient(90deg, #fef08a 100%, #fca5a5 100%)",
        "yellow-red-300":
          "linear-gradient(90deg, #fde047 100%, #f87171 100%)",
        "yellow-red-400":
          "linear-gradient(90deg, #facc15 100%, #f87171 100%)",
        "yellow-red-500":
          "linear-gradient(90deg, #eab308 100%, #ef4444 100%)",
        "yellow-red-600":
          "linear-gradient(90deg, #ca8a04 100%, #dc2626 100%)",
        "yellow-red-700":
          "linear-gradient(90deg, #a16207 100%, #b91c1c 100%)",
        "yellow-red-800":
          "linear-gradient(90deg, #854d0e 100%, #991b1b 100%)",
        "yellow-red-900":
          "linear-gradient(90deg, #713f12 100%, #7f1d1d 100%)",
        "yellow-red-950":
          "linear-gradient(90deg, #422006 100%, #450a0a 100%)",

        // Dual: yellowGreen
        "yellow-green-50": "linear-gradient(90deg, #fefce8 100%, #f7fee7 100%)",
        "yellow-green-100":
          "linear-gradient(90deg, #fef9c3 100%, #ecfccb 100%)",
        "yellow-green-200":
          "linear-gradient(90deg, #fef08a 100%, #d9f99d 100%)",
        "yellow-green-300":
          "linear-gradient(90deg, #fde047 100%, #bef264 100%)",
        "yellow-green-400":
          "linear-gradient(90deg, #facc15 100%, #a3e635 100%)",
        "yellow-green-500":
          "linear-gradient(90deg, #eab308 100%, #84cc16 100%)",
        "yellow-green-600":
          "linear-gradient(90deg, #ca8a04 100%, #65a30d 100%)",
        "yellow-green-700":
          "linear-gradient(90deg, #a16207 100%, #4d7c0f 100%)",
        "yellow-green-800":
          "linear-gradient(90deg, #854d0e 100%, #3f6212 100%)",
        "yellow-green-900":
          "linear-gradient(90deg, #713f12 100%, #365314 100%)",
        "yellow-green-950":
          "linear-gradient(90deg, #422006 100%, #1a2e05 100%)",

        // Dual: bluePurple
        "blue-purple-50":
          "linear-gradient(90deg, #e0f2fe 100%, #f3e8ff 100%)",
        "blue-purple-100":
          "linear-gradient(90deg, #bae6fd 100%, #ede9fe 100%)",
        "blue-purple-200":
          "linear-gradient(90deg, #93c5fd 100%, #ddd6fe 100%)",
        "blue-purple-300":
          "linear-gradient(90deg, #60a5fa 100%, #c4b5fd 100%)",
        "blue-purple-400":
          "linear-gradient(90deg, #3b82f6 100%, #a78bfa 100%)",
        "blue-purple-500":
          "linear-gradient(90deg, #2563eb 100%, #8b5cf6 100%)",
        "blue-purple-600":
          "linear-gradient(90deg, #1d4ed8 100%, #7c3aed 100%)",
        "blue-purple-700":
          "linear-gradient(90deg, #1e40af 100%, #6d28d9 100%)",
        "blue-purple-800":
          "linear-gradient(90deg, #1e3a8a 100%, #5b21b6 100%)",
        "blue-purple-900":
          "linear-gradient(90deg, #1e3a8a 100%, #4c1d95 100%)",
        "blue-purple-950":
          "linear-gradient(90deg, #082f49 100%, #2e1065 100%)",

        // Dual: blueRed
        "blue-red-50":
          "linear-gradient(90deg, #e0f2fe 100%, #fee2e2 100%)",
        "blue-red-100":
          "linear-gradient(90deg, #bae6fd 100%, #fecaca 100%)",
        "blue-red-200":
          "linear-gradient(90deg, #93c5fd 100%, #fca5a5 100%)",
        "blue-red-300":
          "linear-gradient(90deg, #60a5fa 100%, #f87171 100%)",
        "blue-red-400":
          "linear-gradient(90deg, #3b82f6 100%, #f87171 100%)",
        "blue-red-500":
          "linear-gradient(90deg, #2563eb 100%, #ef4444 100%)",
        "blue-red-600":
          "linear-gradient(90deg, #1d4ed8 100%, #dc2626 100%)",
        "blue-red-700":
          "linear-gradient(90deg, #1e40af 100%, #b91c1c 100%)",
        "blue-red-800":
          "linear-gradient(90deg, #1e3a8a 100%, #991b1b 100%)",
        "blue-red-900":
          "linear-gradient(90deg, #1e3a8a 100%, #7f1d1d 100%)",
        "blue-red-950":
          "linear-gradient(90deg, #082f49 100%, #450a0a 100%)",

        // Dual: blueGreen
        "blue-green-50":
          "linear-gradient(90deg, #e0f2fe 100%, #f7fee7 100%)",
        "blue-green-100":
          "linear-gradient(90deg, #bae6fd 100%, #ecfccb 100%)",
        "blue-green-200":
          "linear-gradient(90deg, #93c5fd 100%, #d9f99d 100%)",
        "blue-green-300":
          "linear-gradient(90deg, #60a5fa 100%, #bef264 100%)",
        "blue-green-400":
          "linear-gradient(90deg, #3b82f6 100%, #a3e635 100%)",
        "blue-green-500":
          "linear-gradient(90deg, #2563eb 100%, #84cc16 100%)",
        "blue-green-600":
          "linear-gradient(90deg, #1d4ed8 100%, #65a30d 100%)",
        "blue-green-700":
          "linear-gradient(90deg, #1e40af 100%, #4d7c0f 100%)",
        "blue-green-800":
          "linear-gradient(90deg, #1e3a8a 100%, #3f6212 100%)",
        "blue-green-900":
          "linear-gradient(90deg, #1e3a8a 100%, #365314 100%)",
        "blue-green-950":
          "linear-gradient(90deg, #082f49 100%, #1a2e05 100%)",

        // Dual: purpleRed
        "purple-red-50":
          "linear-gradient(90deg, #f3e8ff 100%, #fee2e2 100%)",
        "purple-red-100":
          "linear-gradient(90deg, #ede9fe 100%, #fecaca 100%)",
        "purple-red-200":
          "linear-gradient(90deg, #ddd6fe 100%, #fca5a5 100%)",
        "purple-red-300":
          "linear-gradient(90deg, #c4b5fd 100%, #f87171 100%)",
        "purple-red-400":
          "linear-gradient(90deg, #a78bfa 100%, #f87171 100%)",
        "purple-red-500":
          "linear-gradient(90deg, #8b5cf6 100%, #ef4444 100%)",
        "purple-red-600":
          "linear-gradient(90deg, #7c3aed 100%, #dc2626 100%)",
        "purple-red-700":
          "linear-gradient(90deg, #6d28d9 100%, #b91c1c 100%)",
        "purple-red-800":
          "linear-gradient(90deg, #5b21b6 100%, #991b1b 100%)",
        "purple-red-900":
          "linear-gradient(90deg, #4c1d95 100%, #7f1d1d 100%)",
        "purple-red-950":
          "linear-gradient(90deg, #2e1065 100%, #450a0a 100%)",

        // Dual: purpleGreen
        "purple-green-50":
          "linear-gradient(90deg, #f3e8ff 100%, #f7fee7 100%)",
        "purple-green-100":
          "linear-gradient(90deg, #ede9fe 100%, #ecfccb 100%)",
        "purple-green-200":
          "linear-gradient(90deg, #ddd6fe 100%, #d9f99d 100%)",
        "purple-green-300":
          "linear-gradient(90deg, #c4b5fd 100%, #bef264 100%)",
        "purple-green-400":
          "linear-gradient(90deg, #a78bfa 100%, #a3e635 100%)",
        "purple-green-500":
          "linear-gradient(90deg, #8b5cf6 100%, #84cc16 100%)",
        "purple-green-600":
          "linear-gradient(90deg, #7c3aed 100%, #65a30d 100%)",
        "purple-green-700":
          "linear-gradient(90deg, #6d28d9 100%, #4d7c0f 100%)",
        "purple-green-800":
          "linear-gradient(90deg, #5b21b6 100%, #3f6212 100%)",
        "purple-green-900":
          "linear-gradient(90deg, #4c1d95 100%, #365314 100%)",
        "purple-green-950":
          "linear-gradient(90deg, #2e1065 100%, #1a2e05 100%)",

        // Dual: redGreen
        "red-green-50":
          "linear-gradient(90deg, #fee2e2 100%, #f7fee7 100%)",
        "red-green-100":
          "linear-gradient(90deg, #fecaca 100%, #ecfccb 100%)",
        "red-green-200":
          "linear-gradient(90deg, #fca5a5 100%, #d9f99d 100%)",
        "red-green-300":
          "linear-gradient(90deg, #f87171 100%, #bef264 100%)",
        "red-green-400":
          "linear-gradient(90deg, #f87171 100%, #a3e635 100%)",
        "red-green-500":
          "linear-gradient(90deg, #ef4444 100%, #84cc16 100%)",
        "red-green-600":
          "linear-gradient(90deg, #dc2626 100%, #65a30d 100%)",
        "red-green-700":
          "linear-gradient(90deg, #b91c1c 100%, #4d7c0f 100%)",
        "red-green-800":
          "linear-gradient(90deg, #991b1b 100%, #3f6212 100%)",
        "red-green-900":
          "linear-gradient(90deg, #7f1d1d 100%, #365314 100%)",
        "red-green-950":
          "linear-gradient(90deg, #450a0a 100%, #1a2e05 100%)",

        // Dual: node
        "node-50":
          "linear-gradient(90deg, #fafafa 100%, #fafaf9 100%)",
        "node-100":
          "linear-gradient(90deg, #f5f5f5 100%, #f5f5f4 100%)",
        "node-200":
          "linear-gradient(90deg, #e5e5e5 100%, #e7e5e4 100%)",
        "node-300":
          "linear-gradient(90deg, #d4d4d4 100%, #d6d3d1 100%)",
        "node-400":
          "linear-gradient(90deg, #a3a3a3 100%, #a8a29e 100%)",
        "node-500":
          "linear-gradient(90deg, #737373 100%, #78716c 100%)",
        "node-600":
          "linear-gradient(90deg, #525252 100%, #57534e 100%)",
        "node-700":
          "linear-gradient(90deg, #404040 100%, #44403c 100%)",
        "node-800":
          "linear-gradient(90deg, #262626 100%, #292524 100%)",
        "node-900":
          "linear-gradient(90deg, #171717 100%, #1c1917 100%)",
        "node-950":
          "linear-gradient(90deg, #0a0a0a 100%, #0c0a09 100%)",
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