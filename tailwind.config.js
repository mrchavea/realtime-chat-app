const { fontFamily } = require("tailwindcss/defaultTheme");
const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      backgroundSize: {
        "300%": "300%"
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate"
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans]
      }
    }
  },
  variants: {
    typography: ["dark"]
  },
  keyframes: {
    "accordion-down": {
      from: { height: 0 },
      to: { height: "var(--radix-accordion-content-height)" }
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: 0 }
    }
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out"
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
    nextui({
      themes: {
        light: {
          colors: {
            foreground: "11181C",
            background: "#FFFFFF", // or DEFAULT
            default: {
              DEFAULT: "#4B4A4A",
              foreground: "#FFFFFF"
            },
            primary: {
              DEFAULT: "#0066FF",
              foreground: "#FFFFFF"
            },
            secondary: {
              DEFAULT: "#11181C",
              foreground: "#f7f7f7"
            },
            success: {
              DEFAULT: "#1B9127",
              foreground: "#FFFFFF"
            },
            warning: {
              DEFAULT: "#E59100",
              foreground: "#FFFFFF"
            },
            danger: {
              DEFAULT: "#E23641",
              foreground: "#FFFFFF"
            }
          }
        },
        dark: {
          colors: {
            background: "#131314ee", // or DEFAULT
            foreground: "#ffffff", // or 50 to 900 DEFAULT
            primary: "#067170",
            secondary: "#4B4A4A",
            success: "#1B9127",
            warning: "#E59100",
            danger: "#E23641"
          }
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: "dark",
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000"
            },
            focus: "#BEF264"
          }
        }
      }
    })
  ]
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars
  });
}
