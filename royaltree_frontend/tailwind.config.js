module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0D1B2A",
        "neon-mint": "#00FFC2",
        gold: "#FFD700",
        "glass-white": "rgba(255,255,255,0.08)",
        "glass-black": "rgba(13,27,42,0.7)",
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.20)",
        neon: "0 0 16px #00FFC2, 0 0 2px #00FFC2",
        goldish: "0 0 6px 2px #FFD70077"
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.1s cubic-bezier(0.23,1,.32,1) both',
        'fade': "fade 0.8s ease"
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'none' },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};
