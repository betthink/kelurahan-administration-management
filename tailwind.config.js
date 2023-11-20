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
        purp: "#6a58ba",
        darkpurp: "#504190",
        // purp: "#475BE8",
        galaxy: "#001529",
        theme: "#E9E9E9",
        whiteSmoke: "#F5F5F5",
        brown: "#808191",
        manggo: "#F29A2E",
        darksky: "#263287",
        blusky: "#1677FF",
        darkgreen: "#002e41",
      },
    },
  },
  plugins: [],
};
