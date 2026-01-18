import tailwindTokens from './src/styles/tailwind.tokens.mjs'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...tailwindTokens
      // colors: {
      //   primary: {
      //     DEFAULT: "var(--color-primary-default)",
      //     light: "var(--color-primary-light)",
      //     lighter: "var(--color-primary-lighter)",
      //     lightest: "var(--color-primary-lightest)",
      //     dark: "var(--color-primary-dark)",
      //     darkest: "var(--color-primary-darkest)",
      //   },

      //   surface: {
      //     page: "var(--color-surface-page)",
      //     secondary: "var(--color-surface-secondary)",
      //     "action-primary": "var(--color-surface-action-primary)",
      //     "action-secondary": "var(--color-surface-action-secondary)",
      //     "action-inverse": "var(--color-surface-action-inverse)",
      //     "disabled-dark": "var(--color-surface-disabled-dark)",
      //     "disabled-light": "var(--color-surface-disabled-light)",
      //   },

      //   text: {
      //     heading: "var(--color-text-heading)",
      //     headings: "var(--color-text-heading)",
      //     body: "var(--color-text-body)",
      //     error: "var(--color-text-error)",
      //     success: "var(--color-text-success)",
      //     disabled: "var(--color-text-disabled)",
      //     inverse: "var(--color-text-inverse)",
      //     "on-primary": "var(--color-text-onprimary)",
      //     "on-secondary": "var(--color-text-onsecondary)",
      //     "on-tertiary": "var(--color-text-ontertiary)",
      //   },

      //   border: {
      //     DEFAULT: "var(--color-border-primary)",
      //     primary: "var(--color-border-primary)",
      //     error: "var(--color-border-error)",
      //     disabled: "var(--color-border-disabled)",
      //     success: "var(--color-border-success)",
      //     warning: "var(--color-border-warning)",
      //     secondary: "var(--color-border-secondary)",
      //   },
      // },

      // borderWidth: {
      //   none: "var(--border-width-none)",
      //   xs: "var(--border-width-xs)",
      //   sm: "var(--border-width-sm)",
      //   md: "var(--border-width-md)",
      //   lg: "var(--border-width-lg)",
      //   xl: "var(--border-width-xl)",
      // },

      // // ✅ keep ONE borderRadius block (your config had it twice)
      // borderRadius: {
      //   none: "var(--radius-none)",
      //   xs: "var(--radius-xs)",
      //   sm: "var(--radius-sm)",
      //   md: "var(--radius-md)",
      //   lg: "var(--radius-lg)",
      //   xl: "var(--radius-xl)",
      //   xxl: "var(--radius-xxl)",
      //   round: "var(--radius-round)",
      // },

      // fontFamily: {
      //   heading: "var(--font-heading)",
      //   body: "var(--font-body)",
      //   // optional if you generate it
      //   // "sub-heading": "var(--font-sub-heading)",
      // },

      // // ✅ added: weights from your generated CSS vars
      // fontWeight: {
      //   light: "var(--font-weight-light)",
      //   regular: "var(--font-weight-regular)",
      //   medium: "var(--font-weight-medium)",
      //   semibold: "var(--font-weight-semi-bold)",
      //   bold: "var(--font-weight-bold)",
      //   extrabold: "var(--font-weight-extra-bold)",
      // },

      // // ✅ added: font sizes + line heights (match your token naming)
      // fontSize: {
      //   // Body
      //   "body-extra-micro": [
      //     "var(--font-size-body-extra-micro)",
      //     { lineHeight: "var(--line-height-body-extra-micro)" },
      //   ],
      //   "body-micro": [
      //     "var(--font-size-body-micro)",
      //     { lineHeight: "var(--line-height-body-micro)" },
      //   ],
      //   "body-xs": [
      //     "var(--font-size-body-xs)",
      //     { lineHeight: "var(--line-height-body-xs)" },
      //   ],
      //   "body-sm": [
      //     "var(--font-size-body-sm)",
      //     { lineHeight: "var(--line-height-body-sm)" },
      //   ],
      //   "body-md": [
      //     "var(--font-size-body-md)",
      //     { lineHeight: "var(--line-height-body-md)" },
      //   ],
      //   "body-lg": [
      //     "var(--font-size-body-lg)",
      //     { lineHeight: "var(--line-height-body-lg)" },
      //   ],

      //   // Heading
      //   "heading-h1": [
      //     "var(--font-size-heading-h1)",
      //     { lineHeight: "var(--line-height-heading-h1)" },
      //   ],
      //   "heading-h2": [
      //     "var(--font-size-heading-h2)",
      //     { lineHeight: "var(--line-height-heading-h2)" },
      //   ],
      //   "heading-h3": [
      //     "var(--font-size-heading-h3)",
      //     { lineHeight: "var(--line-height-heading-h3)" },
      //   ],
      //   "heading-h4": [
      //     "var(--font-size-heading-h4)",
      //     { lineHeight: "var(--line-height-heading-h4)" },
      //   ],
      //   "heading-h5": [
      //     "var(--font-size-heading-h5)",
      //     { lineHeight: "var(--line-height-heading-h5)" },
      //   ],
      //   "heading-h6": [
      //     "var(--font-size-heading-h6)",
      //     { lineHeight: "var(--line-height-heading-h6)" },
      //   ],
      //   "heading-h7": [
      //     "var(--font-size-heading-h7)",
      //     { lineHeight: "var(--line-height-heading-h7)" },
      //   ],

      //   // Action
      //   "action-sm": [
      //     "var(--font-size-action-sm)",
      //     { lineHeight: "var(--line-height-action-sm)" },
      //   ],
      //   "action-md": [
      //     "var(--font-size-action-md)",
      //     { lineHeight: "var(--line-height-action-md)" },
      //   ],

      //   // Label
      //   "label-extra-micro": [
      //     "var(--font-size-label-extra-micro)",
      //     { lineHeight: "var(--line-height-label-extra-micro)" },
      //   ],
      //   "label-micro": [
      //     "var(--font-size-label-micro)",
      //     { lineHeight: "var(--line-height-label-micro)" },
      //   ],
      //   "label-extra-small": [
      //     "var(--font-size-label-extra-small)",
      //     { lineHeight: "var(--line-height-label-extra-small)" },
      //   ],
      //   "label-small": [
      //     "var(--font-size-label-small)",
      //     { lineHeight: "var(--line-height-label-small)" },
      //   ],
      // },
    },
  },
  plugins: [],
};
