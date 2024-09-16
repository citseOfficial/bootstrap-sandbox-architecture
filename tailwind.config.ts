import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#fff",
        "bg-primary-live": "#ecf2f2",
        line: "#dce8e8",
        "text-color": "#121212",
        "border-button": "#000000",
      },
    },
  },
  plugins: [],
};
export default config;
