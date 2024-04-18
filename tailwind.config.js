/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        task: "auto 1fr auto",
        taskModal: "auto 1fr",
      },
      gridTemplateRows: {
        task: "auto 1fr",
        taskModal: "auto 1fr",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        light: {
          brand: "#93C5FD",
          mainBackground: "#F1F4F6",
          mainSidebar: "#E8F3FF",
          secondarySidebar: "#fff",
          task: "#fff",
          subtask: "#FCFCFD",
        },
        dark: {
          brand: "#93C5FD",
          mainBackground: "#07273c",
          mainSidebar: "#283b50",
          secondarySidebar: "#062437",
          task: "#1d3a54",
        },
      },
      colors: {
        light: {
          brand: "#93C5FD",
          primaryTextLightest: "#b5bbc3",
          primaryTextLight: "#6c7787", // Lighter tint
          primaryTextLighter: "#9199a5", // Even lighter tint
          primaryText: "#475569",
          primaryTextDark: "#394454", // Darker shade
          primaryTextDarker: "#2b333f", // Even darker shade
          headerText: "#475569",
        },
        dark: {
          brand: "#93C5FD",
          primaryText: "#e2e8f0",

          headerText: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
