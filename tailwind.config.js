/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Todos os arquivos JS, JSX, TS e TSX dentro da pasta src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#9333EA",
      },
    },
  },

  plugins: [],
};
