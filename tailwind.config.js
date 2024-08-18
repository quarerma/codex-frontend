/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-drop': '0 0 8.3px 0 rgba(0, 0, 0, 0.25)',
        'inner-custom': 'inset 0 0 13.5px 15px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
