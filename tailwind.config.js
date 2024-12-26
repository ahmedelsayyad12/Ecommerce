/** @type {import('tailwindcss').Config} */
import  flowbite  from 'flowbite-react/tailwind'
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html",
    flowbite.content(),

  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0, 204, 116)",
        darkPrimary: "rgb(1, 133, 76)",
        lightPrimary: "rgb(0, 200, 140)",
        light: "#f0f3f2",
        rating: "#ffc908",
      }
    },
  },
  plugins: [
    flowbite.plugin()
],
}

