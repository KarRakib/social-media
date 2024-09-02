/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#f9aa11",
        'text-color': "rgba(0, 0, 0, 0.88)",
        'primary-low': "rgba(249, 170, 17, 0.2)",
      },
      boxShadow: {
        'xl-shadow': "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        'avatar-shadow': "0px 4px 12.5px -2px rgba(0, 0, 0, 0.25)",
      },
      gradientColorStops: {
        'gradient-start': "rgba(249, 170, 17, 0)",
        'gradient-end': "#f9aa11",
      },
    },
  },
  plugins: [],
};
