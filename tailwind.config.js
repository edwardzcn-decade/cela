module.exports = {
  content: [
    "./templates/**/*.html",
    "./content/**/*.{md,html}",
    "!./content/_bak/**/*",
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
        "accent-soft": "var(--accent-soft)",
        "surface-strong": "var(--surface-strong)",
        "focus-ring": "var(--focus-ring)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "Ubuntu",
          "sans-serif",
        ],
      },
      spacing: {
        gap: "1.5rem",
        "gap-mobile": "0.875rem",
        "content-gap": "1.25rem",
        "site-header": "3.75rem",
        "page-x": "1.5rem",
        "page-x-mobile": "0.875rem",
      },
      maxWidth: {
        nav: "64rem",
        main: "45rem",
        "nav-shell": "calc(64rem + 3rem)",
        "main-shell": "calc(45rem + 3rem)",
      },
      borderRadius: {
        theme: "0.5rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 12px 32px rgba(0, 0, 0, 0.15)",
        accent: "0 10px 30px var(--accent-soft)",
        floating: "0 18px 40px rgba(15, 23, 42, 0.18)",
      },
      transitionDuration: {
        fast: "160ms",
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
