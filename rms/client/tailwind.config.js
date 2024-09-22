/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '1rem', // Large radius
        md: '0.875rem', // Medium radius (1rem - 2px)
        sm: '0.75rem', // Small radius (1rem - 4px)
      },
      colors: {
        primary: {
          DEFAULT: '#0f766e', // teal-700
          light: '#5eead4', // teal-300
          dark: '#115e59',  // teal-800
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
