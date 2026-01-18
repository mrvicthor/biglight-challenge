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

        // Surface colors - ADD THESE
        surface: {
          page: 'var(--color-surface-page)',
          'action-primary': 'var(--color-surface-action-primary)',
          'action-secondary': 'var(--color-surface-action-secondary)',
          'action-inverse': 'var(--color-surface-action-inverse)',
        },

        // Text colors - ADD THESE
        text: {
          heading: 'var(--color-text-heading)',
          body: 'var(--color-text-body)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-secondary': 'var(--color-text-on-secondary)',
          inverse: 'var(--color-text-inverse)',
          error: 'var(--color-text-error)',
          success: 'var(--color-text-success)',
          disabled: 'var(--color-text-disabled)',
        },

        // Border colors - ADD THESE
        border: {
          DEFAULT: 'var(--color-border-primary)',
          error: 'var(--color-border-error)',
          disabled: 'var(--color-border-disabled)',
        },
      },

      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
}

