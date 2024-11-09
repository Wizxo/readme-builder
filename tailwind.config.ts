import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sidebar: "var(--sidebar-bg)",
        component: "var(--component-bg)",
        syntax: {
          string: "#a3eea0",
          keyword: "#ff79c6",
          function: "#8be9fd",
          comment: "#6272a4",
          variable: "#f8f8f2",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: '#1a1a1a',
              padding: '1rem',
              borderRadius: '0.5rem',
              code: {
                color: '#f8f8f2',
              },
            },
            code: {
              backgroundColor: '#1a1a1a',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
