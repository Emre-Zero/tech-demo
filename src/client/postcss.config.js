module.exports = {
  plugins: {
    'tailwindcss': {
      content: [
        "./src/client/pages/**/*.{js,ts,jsx,tsx}",
        "./src/client/features/**/*.{js,ts,jsx,tsx}",
      ],
    },
    'autoprefixer': {},
 },
};
