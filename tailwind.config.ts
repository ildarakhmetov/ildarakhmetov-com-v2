export default {
  content: [
    "./**/*.{html,js,ts,jsx,tsx,vto,md}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        "neo": "4px 4px 0px 0px #0D0D0D",
        "neo-lg": "8px 8px 0px 0px #0D0D0D",
      },
      colors: {
        "paper": "#F3EDE1",
        "ink": "#0D0D0D",
        "riso-red": "#FF4133",
        "blueprint": "#2E50FF",
        "neo-yellow": "#FFD24D",
        "neo-pink": "#FF4133",
        "neo-blue": "#2E50FF",
        "neo-green": "#7ED9A1",
      },
    },
  },
  plugins: [],
};
