/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "selector",
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            poppins: "Poppins",
            roboto: "Roboto Mono",
            montserrat: "Montserrat",
            grotesk: "Space Grotesk",
            kanit: "Kanit",
         },
      },
   },
   plugins: [],
};
