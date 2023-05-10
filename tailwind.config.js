module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        weather: ["Montserrat", "sans-serif"],
      },
      colors: {
        brand: {
          300: "#996DFF",
          500: "#8257e6",
        },
        weather: {
          300: "rgba(144, 217, 224, 0.9)",
          500: "rgba(84, 96, 230, 0.9)",
        },
        background: {
          300: "rgba(136, 235, 239, 1)",
          500: "rgba(83, 91, 230, 1)",
          800: "rgba(39, 46, 55, 1)",
          900: "rgba(34, 40, 49, 1)",
        },
      },
      borderRadius: {
        sm: "10px",
        lg: "30px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("@headlessui/tailwindcss"),
  ],
};
