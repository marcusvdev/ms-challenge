import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#0B1014",
          gray: "#7B8C98",
        },
        secondary: {
          olive: "#BCC8A4",
          gray: "#DADADA",
          pale: "#F5ECDC",
          orange: "#F8CDA2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
