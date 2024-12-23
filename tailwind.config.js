const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        section: "var(--section)",
        inactive: "var(--inactive)",
        tabIndicator: "var(--tabIndicator)",
        subtitle: "var(--subtitle)",
        danger: "var(--danger)",
        skeleton: "var(--skeleton)",
      },
      fontSize: {
        "3xs": ["11px", "16px"],
        "2xs": ["12px", "16px"],
        xs: ["13px", "18px"],
        sm: ["14px", "18px"],
        base: ["15px", "20px"],
        lg: ["16px", "22px"],
        xl: ["18px", "24px"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          '--primary': '#3459a7',
          '--secondary': '#ebedef',
          '--background': '#ffffff',
          '--foreground': '#0d0d0d',
          '--section': '#f7f7f8',
          '--inactive': '#a9adb2',
          '--tabIndicator': '#212121',
          '--subtitle': '#6f7071',
          '--danger': '#f50000',
          '--skeleton': '#ebedef',
        },
      });
    }),
  ],
}