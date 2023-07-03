/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'lightShadow': '0px 0px 20px 6px white',
        'darkShadow': '0px 0px 20px 6px black',
        'sunShadow': '0px 0px 20px 6px yellow',
        'moonShadow': '0px 0px 20px 6px blue',
      },
    },
  },
  plugins: [],
}
