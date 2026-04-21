module.exports = {
  content: [
    "./templates/**/*.html",
    "./content/**/*.{md,html}",
    "./static/js/**/*.js",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
