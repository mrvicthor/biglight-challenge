/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-default)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        surface: {
          page: 'var(--color-surface-page)',
          primary: 'var(--color-surface-action-primary)',
          secondary: 'var(--color-surface-action-secondary)',
          inverse: 'var(--color-surface-action-inverse)',
        },
        text: {
          heading: 'var(--color-text-headings)',
          body: 'var(--color-text-body)',
          error: 'var(--color-text-error)',
          success: 'var(--color-text-success)',
          disabled: 'var(--color-text-disabled)',
          onPrimary: 'var(--color-text-on-primary)',
          onSecondary: 'var(--color-text-on-secondary)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border-primary)',
          error: 'var(--color-border-error)',
          disabled: 'var(--color-border-disabled)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

