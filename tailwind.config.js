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
    extend: {
      colors: {
        theme: "var(--theme-bg)",
        surface: "var(--surface-bg)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border-color)",
        text: "var(--text-main)",
        muted: "var(--text-muted)",
        content: "var(--content-text)",
        code: "var(--code-bg)",
        highlight: "var(--highlight-bg)",
        accent: "var(--accent-color)",
        "accent-strong": "var(--accent-strong)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "\"Helvetica Neue\"",
          "Arial",
          "Ubuntu",
          "sans-serif",
        ],
      },
      spacing: {
        gap: "1.5rem",
        "gap-mobile": "0.875rem",
        "content-gap": "1.25rem",
      },
      maxWidth: {
        nav: "64rem",
        main: "45rem",
      },
      borderRadius: {
        theme: "0.5rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        theme: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "hero-rise": {
          "0%": {
            opacity: "0",
            transform: "translateY(1.2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "soft-fade": {
          "0%": {
            opacity: "0",
            transform: "translateY(1rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "hero-rise": "hero-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-fade": "soft-fade 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
