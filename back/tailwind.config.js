/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",           // si tu as des templates ici
    "./src/templates/**/*.html", // explicit src/templates
    "./templates/**/*.html",     // dossier templates global
    "./**/templates/**/*.html",  // templates dans les apps
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};