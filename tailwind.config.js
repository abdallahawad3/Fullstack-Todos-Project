/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: "true",
        padding: {
          sm: "2rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "10rem",
        }
      }
    },
  },
  plugins: [],
}