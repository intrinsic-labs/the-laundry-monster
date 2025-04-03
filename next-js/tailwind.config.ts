import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors - now black/white with purple accent
        primary: {
          DEFAULT: "#212121", // Very dark grey almost black
          50: "#F8F8F8",
          100: "#F0F0F0",
          200: "#E0E0E0",
          300: "#C9C9C9", 
          400: "#ADADAD",
          500: "#8C8C8C", 
          600: "#6B6B6B",
          700: "#4A4A4A",
          800: "#292929",
          900: "#212121", // Default 
          950: "#121212",
        },
        // Secondary color - white to light grey
        secondary: {
          DEFAULT: "#FFFFFF", // Pure white
          50: "#FFFFFF", // Default
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#EEEEEE", 
          400: "#E0E0E0",
          500: "#BDBDBD",
          600: "#9E9E9E",
          700: "#757575",
          800: "#616161",
          900: "#424242",
          950: "#212121",
        },
        // Neutral colors for text and backgrounds
        neutral: {
          DEFAULT: "#21201f", // Almost black
          50: "#FAFAFA", // Almost white
          100: "#F5F5F5", // Very light grey
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
          950: "#121212", // Default
        },
        // Background colors - now white instead of cream
        background: {
          light: "#f9f6f2", // Pure white
          DEFAULT: "#f9f6f2", // Almost white
          dark: "#21201f", // Light grey
        },
        orange: {
          DEFAULT: "#68ac81" // Darker orange
        },
        // Purple-leaning indigo accent color
        accent: {
          DEFAULT: "#68ac81", // More purple-leaning indigo
          50: "#F3F1FE",
          100: "#E4E0FD",
          200: "#C8C0FB",
          300: "#ACA0F9",
          400: "#8E7FF8",
          500: "#68ac81", // Default
          600: "#5548D9",
          700: "#4035BE",
          800: "#312A93",
          900: "#221D68",
          950: "#13103D",
        },
        // Keeping brown for any elements that might need it
        brown: {
          DEFAULT: "#8B5E3C", // Rich wood brown
          50: "#F3EDE7",
          100: "#E7DBCF",
          200: "#D0B79F",
          300: "#B8936F",
          400: "#A1784F",
          500: "#8B5E3C", // Default
          600: "#704B30",
          700: "#553924",
          800: "#3A2618",
          900: "#1F130C",
          950: "#0F0906",
        },
        // Latent Spaces specific colors
        ls: {
          background: "#121212",
          text: "#FFFFFF",
          textSecondary: "rgba(255, 255, 255, 0.8)",
          accent: "rgb(77, 140, 86)",
          accentLight: "rgb(108, 186, 120)",
          yellow: "rgb(164, 145, 92)",
          yellowLight: "rgb(201, 179, 116)",
          surface: "rgba(255, 255, 255, 0.03)",
          surfaceHover: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-jetbrains-mono)", "JetBrains Mono Variable", "monospace"], // Keeping monospace for body text
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono Variable", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        display: ["Cardo", "serif"], // Times New Roman for headings
        cardo: ["Cardo", "serif"], // Cardo font
        "calling-code": ["Calling Code", "monospace"], // Calling Code font
        arial: ["Arial", "sans-serif"], // Arial font
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "pulse": "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.900'), // Dark grey text
            a: {
              color: theme('colors.accent.600'), // Purple accent
              '&:hover': {
                color: theme('colors.accent.700'), // Darker on hover
              },
            },
            h1: {
              color: theme('colors.primary.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.primary.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.primary.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h4: {
              color: theme('colors.primary.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            blockquote: {
              color: theme('colors.neutral.700'),
              borderLeftColor: theme('colors.accent.500'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: theme('colors.accent.700'),
              backgroundColor: theme('colors.secondary.100'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: theme('colors.secondary.200'),
              color: theme('colors.neutral.900'),
              borderRadius: '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
export default config; 