/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  presets: [require("@boilerplate/tailwind-config")],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "!./app/pages/emails+/**/*", "../../packages/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxxs: "0.4rem",
        xxs: "0.625rem",
      },
    },

    colors: {
      orange: "#ff4d30",
      orangeLight: "#ffeae6",
      orangeShadow: "#ff533059",
      gray: "#2d2d2d",
      gray2: "#706f7b",
      gray3: "#ECECEC",
      gray4: "#f8f8f8",
    },

    backgroundImage: {
      banner: "url('app/assets/images/banners/book-banner.png')",
      booking: "url('app/assets/images/book-car/book-bg.png')",
      choose: "url('app/assets/images/chooseUs/bg.png')",
      contact: "url('app/assets/images/banners/bg-contact.png')",
      download: "url('app/assets/images/banners/bg02.png')",
      faq: "url('app/assets/images/faq/car.png')",
      header: "url('app/assets/images/hero/heroes-bg.png')",
    },

    fontFamily: {
      serif: ["Poppins", "sans-serif"],
      sans: ["Poppins", "sans-serif"],
      mono: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-radix")],
}
