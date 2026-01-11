export default {
  content: [
    "./**/*.{html,js,ts,jsx,tsx,vto,md}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      },
      colors: {
        'neo-yellow': '#FDE047',
        'neo-pink': '#F472B6',
        'neo-blue': '#60A5FA',
        'neo-green': '#4ADE80',
      },
    },
  },
  plugins: [],
};
