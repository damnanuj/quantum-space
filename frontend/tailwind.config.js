import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          main: "#06141d",
          header: "#030f16",
          light: "#1a2730",
          extraLight: "#28353e",
          text: "#DBEAEE",
          notification: "#359EAB",
          error: "#dc172a",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
