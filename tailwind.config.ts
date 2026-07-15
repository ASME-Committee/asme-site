import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Brand palette derived from the ASME logo mark
        brand: {
          blue: "#2B58E0",
          "blue-deep": "#1B3FB4",
          "blue-soft": "#A8C7F9",
          coral: "#F2929C",
          "coral-soft": "#FBD0D5",
          ink: "#0A0F1F",
          paper: "#FAFAFA",
        },
        // Semantic surface tokens (light/dark resolved via CSS vars in globals.css)
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          subtle: "rgb(var(--surface-subtle) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
          inverse: "rgb(var(--surface-inverse) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--fg-subtle) / <alpha-value>)",
          inverse: "rgb(var(--fg-inverse) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Tighter, display-grade scale. Minimums are kept small so long words
        // (e.g. "entrepreneurs") never overflow narrow phone screens.
        "display-2xl": ["clamp(2.25rem, 8vw, 6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(1.9rem, 6.5vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.7rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgb(var(--surface)), rgb(var(--surface) / 0.7) 60%, rgb(var(--surface)))",
        "brand-gradient":
          "linear-gradient(135deg, #2B58E0 0%, #6B73FF 35%, #F2929C 100%)",
        "brand-gradient-subtle":
          "linear-gradient(135deg, rgb(43 88 224 / 0.08), rgb(242 146 156 / 0.08))",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(10 15 31 / 0.04), 0 8px 24px rgb(10 15 31 / 0.05)",
        lift: "0 2px 4px rgb(10 15 31 / 0.06), 0 24px 48px -12px rgb(10 15 31 / 0.18)",
        "ring-brand": "0 0 0 4px rgb(43 88 224 / 0.15)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 8s linear infinite",
        glow: "glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
