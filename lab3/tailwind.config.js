module.exports = {
  mode: "jit",
  purge: ["./src/index.html", "./src/app.ts", "./src/templates/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        icons: ["Icons"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
