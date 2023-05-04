/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
