/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF4444',     // Red
        secondary: '#F97316',   // Orange
        accent: '#8B5CF6',      // Violet
        success: '#10B981',     // Green
        warning: '#F59E0B',     // Amber
        danger: '#EF4444',      // Red
        dark: '#111827',        // Darker Gray
        light: '#F3F4F6',       // Brighter Light
        surface: '#FFFFFF',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
