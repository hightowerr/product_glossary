import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '576px',    // Mobile phones (Bootstrap's sm)
      'md': '768px',    // Tablets (Bootstrap's md)
      'lg': '992px',    // Small desktops (Bootstrap's lg)
      'xl': '1200px',   // Large desktops (Bootstrap's xl)
      '2xl': '1440px',  // Extra large desktops (custom)
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      maxWidth: {
        'content': '1440px',  // Default content builder width
      },
    },
  },
  plugins: [],
} satisfies Config;
