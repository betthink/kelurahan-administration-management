/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },

    extend: {
      colors: {
        primary: "#F2EDF3",
        secondary: "#FCFCFC",
        third: "#A15BFF",
        four: "#212529",
        primary_pink: "#FF9296",
        primary_blue: "#198AE3",
        primary_green: "#78D8CF",
        success: "#1BCFB4",
        danger: "#FE7C96",
        purp: "#6a58ba",
        darkpurp: "#504190",
        // purp: "#475BE8",
        galaxy: "#001529",
        theme: "#E9E9E9",
        whiteSmoke: "#F5F5F5",
        brown: "#808191",
        manggo: "#F29A2E",
        yel: "##FED713",

        darksky: "#263287",
        blusky: "#1677FF",
        darkgreen: "#002e41",
      },
    },
  },
  plugins: [],
};
