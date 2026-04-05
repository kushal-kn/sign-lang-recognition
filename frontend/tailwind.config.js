export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Playfair Display", "Georgia"],
      },
      colors: {
        "brand-green": "#8ba88e",
        "brand-green-light": "#e8ede9",
        "brand-blue": "#d1e0e8",
        "brand-bg": "#f9f9f7",
        neutral: {
          900: "#171717",
          600: "#6b7280",
          500: "#737373",
          400: "#a3a3a3",
          300: "#d4d4d4",
          200: "#e5e5e5",
        },
      },
    },
  },
};