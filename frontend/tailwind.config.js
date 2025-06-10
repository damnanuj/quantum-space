// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ... your existing content paths
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()], // Add this line
};

export default config;
