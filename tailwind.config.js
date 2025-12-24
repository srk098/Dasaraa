// @type {import('tailwindcss').Config} 
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 12s linear infinite",
        lineShine: "lineShine 5s ease-in-out infinite",
        lineShine2: "lineShine 5s ease-in-out infinite 2.5s",
        "float-up": "floatUp 1.2s ease-out forwards",
        "float-down": "floatDown 1.2s ease-out forwards",
        "slide-in": "slideFromRight 0.4s ease-out forwards",
      },

      colors: {
        gold: "#E09900",
        white: "#ffffff",
        red: "#a4050f",
        black: "#000000",
        gray: "#ebebec",
        primary: "#1e5963",
        yellow: "#f59e0b",
        secondary: "#872521",
        darkBlue: "#0E1219",
      },

      fontSize: {
        hero: "4rem",
        heading1: "3rem",
        heading2: "2.25rem",
        heading3: "1.875rem",
        heading4: "1.5rem",
        // description: "1.25rem",
        main: "1.2rem",
      },

      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"], // GLOBAL DEFAULT FONT
        cormorant: ["Cormorant", "serif"],
        jost: ["Jost", "sans-serif"],
        script: ["Lovers Quarrel", "cursive"],
        kalam: ["Kalam", "cursive"],
      },

      keyframes: {
        lineShine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-32px)" },
        },
        floatDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(32px)" },
        },
        slideFromRight: {
          "0%": { transform: "translateX(100vw)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },

    /* Make Roboto Slab the default font for all elements */
    fontFamily: {
      sans: ["Roboto Slab", "serif"],
      serif: ["Roboto Slab", "serif"],
    },
  },

  plugins: [],
  variants: {
    extend: {
      backdropFilter: ["responsive"],
    },
  },

  output: 'export',
};
