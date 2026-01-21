/** @type {import('tailwindcss').Config} */
export default {
  "content": [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "alias": {
          "primary": {
            "lightest": "var(--alias-primary-lightest)",
            "DEFAULT": "var(--alias-primary-default)",
            "dark": "var(--alias-primary-dark)",
            "lighter": "var(--alias-primary-lighter)",
            "darkest": "var(--alias-primary-darkest)",
            "aaa": {
              "text": "var(--alias-primary-aaa-text)",
              "surface": "var(--alias-primary-aaa-surface)"
            },
            "light": "var(--alias-primary-light)"
          },
          "tertiary": {
            "dark": "var(--alias-tertiary-dark)",
            "DEFAULT": "var(--alias-tertiary-default)",
            "lighter": "var(--alias-tertiary-lighter)",
            "darker": "var(--alias-tertiary-darker)",
            "light": "var(--alias-tertiary-light)"
          },
          "positive": {
            "light": "var(--alias-positive-light)",
            "DEFAULT": "var(--alias-positive-default)",
            "dark": "var(--alias-positive-dark)"
          },
          "error": {
            "light": "var(--alias-error-light)",
            "DEFAULT": "var(--alias-error-default)",
            "dark": "var(--alias-error-dark)"
          },
          "warning": {
            "light": "var(--alias-warning-light)",
            "DEFAULT": "var(--alias-warning-default)",
            "dark": "var(--alias-warning-dark)"
          },
          "information": {
            "light": "var(--alias-information-light)",
            "DEFAULT": "var(--alias-information-default)",
            "dark": "var(--alias-information-dark)"
          },
          "neutral": {
            "light": "var(--alias-neutral-light)",
            "DEFAULT": "var(--alias-neutral-default)",
            "dark": "var(--alias-neutral-dark)",
            "lighter": "var(--alias-neutral-lighter)",
            "lightest": "var(--alias-neutral-lightest)",
            "darker": "var(--alias-neutral-darker)",
            "darkest": "var(--alias-neutral-darkest)",
            "black": "var(--alias-neutral-black)",
            "white": "var(--alias-neutral-white)"
          },
          "accent": {
            "DEFAULT": "var(--alias-accent-default)"
          },
          "secondary": {
            "DEFAULT": "var(--alias-secondary-default)",
            "dark": "var(--alias-secondary-dark)",
            "darker": "var(--alias-secondary-darker)",
            "darkest": "var(--alias-secondary-darkest)"
          }
        },
        "border-colour": {
          "primary": "var(--border-colour-primary)",
          "selected": "var(--border-colour-selected)",
          "action": {
            "on": {
              "primary": "var(--border-colour-action-on-primary)",
              "page": "var(--border-colour-action-on-page)"
            },
            "active": "var(--border-colour-action-active)"
          },
          "disabled": "var(--border-colour-disabled)",
          "positive": "var(--border-colour-positive)",
          "error": "var(--border-colour-error)",
          "warning": "var(--border-colour-warning)",
          "highlight": "var(--border-colour-highlight)",
          "inverse": "var(--border-colour-inverse)",
          "passive": "var(--border-colour-passive)",
          "secondary": "var(--border-colour-secondary)",
          "information": "var(--border-colour-information)"
        },
        "icon-colour": {
          "primary": "var(--icon-colour-primary)",
          "action": {
            "active": "var(--icon-colour-action-active)",
            "selected": "var(--icon-colour-action-selected)",
            "inverse": "var(--icon-colour-action-inverse)",
            "disabled": "var(--icon-colour-action-disabled)",
            "highlight": "var(--icon-colour-action-highlight)",
            "onprimary": "var(--icon-colour-action-onprimary)",
            "onsecondary": "var(--icon-colour-action-onsecondary)",
            "ontertiary": "var(--icon-colour-action-ontertiary)"
          },
          "positive": "var(--icon-colour-positive)",
          "error": "var(--icon-colour-error)",
          "warning": "var(--icon-colour-warning)",
          "information": "var(--icon-colour-information)"
        },
        "surface-colour": {
          "page": "var(--surface-colour-page)",
          "positive": "var(--surface-colour-positive)",
          "disabled": {
            "dark": "var(--surface-colour-disabled-dark)",
            "light": "var(--surface-colour-disabled-light)"
          },
          "error": "var(--surface-colour-error)",
          "warning": "var(--surface-colour-warning)",
          "highlight": "var(--surface-colour-highlight)",
          "action": {
            "primary": "var(--surface-colour-action-primary)",
            "inverse": "var(--surface-colour-action-inverse)",
            "hover": {
              "primary": "var(--surface-colour-action-hover-primary)",
              "secondary": "var(--surface-colour-action-hover-secondary)"
            },
            "selected": "var(--surface-colour-action-selected)",
            "secondary": "var(--surface-colour-action-secondary)"
          },
          "accent": "var(--surface-colour-accent)",
          "brand": {
            "primary": "var(--surface-colour-brand-primary)",
            "aaa": "var(--surface-colour-brand-aaa)",
            "aa": "var(--surface-colour-brand-aa)",
            "accent": "var(--surface-colour-brand-accent)",
            "secondary": "var(--surface-colour-brand-secondary)"
          },
          "secondary": "var(--surface-colour-secondary)",
          "hover": "var(--surface-colour-hover)",
          "passive": "var(--surface-colour-passive)",
          "overlay": {
            "background": "var(--surface-colour-overlay-background)"
          },
          "offer": "var(--surface-colour-offer)",
          "information": "var(--surface-colour-information)",
          "tag": {
            "light": "var(--surface-colour-tag-light)",
            "dark": "var(--surface-colour-tag-dark)"
          }
        },
        "text-colour": {
          "headings": "var(--text-colour-headings)",
          "body": "var(--text-colour-body)",
          "success": "var(--text-colour-success)",
          "disabled": "var(--text-colour-disabled)",
          "error": "var(--text-colour-error)",
          "action": {
            "active": "var(--text-colour-action-active)",
            "inverse": "var(--text-colour-action-inverse)",
            "selected": "var(--text-colour-action-selected)",
            "disabled": "var(--text-colour-action-disabled)",
            "onprimary": "var(--text-colour-action-onprimary)",
            "onsecondary": "var(--text-colour-action-onsecondary)",
            "ontertiary": "var(--text-colour-action-ontertiary)"
          },
          "warning": "var(--text-colour-warning)",
          "information": "var(--text-colour-information)",
          "passive": "var(--text-colour-passive)",
          "inverse": "var(--text-colour-inverse)",
          "brand": "var(--text-colour-brand)",
          "available": "var(--text-colour-available)"
        },
        "primitives-colour": {
          "white": {
            "100": "var(--primitives-colour-white-100)",
            "200": "var(--primitives-colour-white-200)",
            "300": "var(--primitives-colour-white-300)",
            "400": "var(--primitives-colour-white-400)",
            "500": "var(--primitives-colour-white-500)",
            "600": "var(--primitives-colour-white-600)",
            "700": "var(--primitives-colour-white-700)",
            "800": "var(--primitives-colour-white-800)",
            "900": "var(--primitives-colour-white-900)",
            "1000": "var(--primitives-colour-white-1000)"
          },
          "grey": {
            "100": "var(--primitives-colour-grey-100)",
            "200": "var(--primitives-colour-grey-200)",
            "300": "var(--primitives-colour-grey-300)",
            "400": "var(--primitives-colour-grey-400)",
            "500": "var(--primitives-colour-grey-500)",
            "600": "var(--primitives-colour-grey-600)",
            "700": "var(--primitives-colour-grey-700)",
            "800": "var(--primitives-colour-grey-800)",
            "900": "var(--primitives-colour-grey-900)",
            "1000": "var(--primitives-colour-grey-1000)"
          },
          "red": {
            "100": "var(--primitives-colour-red-100)",
            "200": "var(--primitives-colour-red-200)",
            "300": "var(--primitives-colour-red-300)",
            "400": "var(--primitives-colour-red-400)",
            "500": "var(--primitives-colour-red-500)",
            "600": "var(--primitives-colour-red-600)",
            "700": "var(--primitives-colour-red-700)",
            "800": "var(--primitives-colour-red-800)",
            "900": "var(--primitives-colour-red-900)"
          },
          "black": {
            "100": "var(--primitives-colour-black-100)",
            "200": "var(--primitives-colour-black-200)",
            "300": "var(--primitives-colour-black-300)",
            "400": "var(--primitives-colour-black-400)",
            "500": "var(--primitives-colour-black-500)",
            "600": "var(--primitives-colour-black-600)",
            "700": "var(--primitives-colour-black-700)",
            "800": "var(--primitives-colour-black-800)",
            "900": "var(--primitives-colour-black-900)",
            "1000": "var(--primitives-colour-black-1000)"
          },
          "brand": {
            "branda": {
              "orange": {
                "50": "var(--primitives-colour-brand-branda-orange-50)",
                "100": "var(--primitives-colour-brand-branda-orange-100)",
                "200": "var(--primitives-colour-brand-branda-orange-200)",
                "300": "var(--primitives-colour-brand-branda-orange-300)",
                "400": "var(--primitives-colour-brand-branda-orange-400)",
                "600": "var(--primitives-colour-brand-branda-orange-600)",
                "700": "var(--primitives-colour-brand-branda-orange-700)",
                "800": "var(--primitives-colour-brand-branda-orange-800)",
                "DEFAULT": "var(--primitives-colour-brand-branda-orange-default)"
              },
              "green": {
                "50": "var(--primitives-colour-brand-branda-green-50)",
                "100": "var(--primitives-colour-brand-branda-green-100)",
                "200": "var(--primitives-colour-brand-branda-green-200)",
                "300": "var(--primitives-colour-brand-branda-green-300)",
                "400": "var(--primitives-colour-brand-branda-green-400)",
                "600": "var(--primitives-colour-brand-branda-green-600)",
                "700": "var(--primitives-colour-brand-branda-green-700)",
                "800": "var(--primitives-colour-brand-branda-green-800)",
                "DEFAULT": "var(--primitives-colour-brand-branda-green-default)"
              },
              "paper": {
                "50": "var(--primitives-colour-brand-branda-paper-50)",
                "100": "var(--primitives-colour-brand-branda-paper-100)",
                "200": "var(--primitives-colour-brand-branda-paper-200)",
                "300": "var(--primitives-colour-brand-branda-paper-300)",
                "400": "var(--primitives-colour-brand-branda-paper-400)",
                "600": "var(--primitives-colour-brand-branda-paper-600)",
                "700": "var(--primitives-colour-brand-branda-paper-700)",
                "800": "var(--primitives-colour-brand-branda-paper-800)",
                "900": "var(--primitives-colour-brand-branda-paper-900)",
                "1000": "var(--primitives-colour-brand-branda-paper-1000)",
                "1100": "var(--primitives-colour-brand-branda-paper-1100)",
                "1200": "var(--primitives-colour-brand-branda-paper-1200)",
                "1300": "var(--primitives-colour-brand-branda-paper-1300)",
                "2000": "var(--primitives-colour-brand-branda-paper-2000)",
                "DEFAULT": "var(--primitives-colour-brand-branda-paper-default)"
              },
              "accent": {
                "1000": "var(--primitives-colour-brand-branda-accent-1000)"
              }
            },
            "brandb": {
              "cherry": {
                "50": "var(--primitives-colour-brand-brandb-cherry-50)",
                "100": "var(--primitives-colour-brand-brandb-cherry-100)",
                "200": "var(--primitives-colour-brand-brandb-cherry-200)",
                "300": "var(--primitives-colour-brand-brandb-cherry-300)",
                "400": "var(--primitives-colour-brand-brandb-cherry-400)",
                "600": "var(--primitives-colour-brand-brandb-cherry-600)",
                "700": "var(--primitives-colour-brand-brandb-cherry-700)",
                "800": "var(--primitives-colour-brand-brandb-cherry-800)",
                "DEFAULT": "var(--primitives-colour-brand-brandb-cherry-default)"
              },
              "salt": {
                "50": "var(--primitives-colour-brand-brandb-salt-50)",
                "100": "var(--primitives-colour-brand-brandb-salt-100)",
                "200": "var(--primitives-colour-brand-brandb-salt-200)",
                "300": "var(--primitives-colour-brand-brandb-salt-300)",
                "400": "var(--primitives-colour-brand-brandb-salt-400)",
                "600": "var(--primitives-colour-brand-brandb-salt-600)",
                "700": "var(--primitives-colour-brand-brandb-salt-700)",
                "800": "var(--primitives-colour-brand-brandb-salt-800)",
                "900": "var(--primitives-colour-brand-brandb-salt-900)",
                "1000": "var(--primitives-colour-brand-brandb-salt-1000)",
                "1050": "var(--primitives-colour-brand-brandb-salt-1050)",
                "1100": "var(--primitives-colour-brand-brandb-salt-1100)",
                "1200": "var(--primitives-colour-brand-brandb-salt-1200)",
                "1300": "var(--primitives-colour-brand-brandb-salt-1300)",
                "2000": "var(--primitives-colour-brand-brandb-salt-2000)",
                "DEFAULT": "var(--primitives-colour-brand-brandb-salt-default)"
              },
              "violet": {
                "50": "var(--primitives-colour-brand-brandb-violet-50)",
                "100": "var(--primitives-colour-brand-brandb-violet-100)",
                "200": "var(--primitives-colour-brand-brandb-violet-200)",
                "300": "var(--primitives-colour-brand-brandb-violet-300)",
                "400": "var(--primitives-colour-brand-brandb-violet-400)",
                "600": "var(--primitives-colour-brand-brandb-violet-600)",
                "700": "var(--primitives-colour-brand-brandb-violet-700)",
                "800": "var(--primitives-colour-brand-brandb-violet-800)",
                "DEFAULT": "var(--primitives-colour-brand-brandb-violet-default)"
              },
              "accent": {
                "spritz": "var(--primitives-colour-brand-brandb-accent-spritz)",
                "burgundy": "var(--primitives-colour-brand-brandb-accent-burgundy)",
                "ice": "var(--primitives-colour-brand-brandb-accent-ice)",
                "citrus": "var(--primitives-colour-brand-brandb-accent-citrus)",
                "violet": "var(--primitives-colour-brand-brandb-accent-violet)"
              }
            }
          },
          "green": {
            "100": "var(--primitives-colour-green-100)",
            "200": "var(--primitives-colour-green-200)",
            "300": "var(--primitives-colour-green-300)",
            "400": "var(--primitives-colour-green-400)",
            "500": "var(--primitives-colour-green-500)",
            "600": "var(--primitives-colour-green-600)",
            "700": "var(--primitives-colour-green-700)",
            "800": "var(--primitives-colour-green-800)",
            "900": "var(--primitives-colour-green-900)"
          },
          "orange": {
            "100": "var(--primitives-colour-orange-100)",
            "200": "var(--primitives-colour-orange-200)",
            "300": "var(--primitives-colour-orange-300)",
            "400": "var(--primitives-colour-orange-400)",
            "500": "var(--primitives-colour-orange-500)",
            "600": "var(--primitives-colour-orange-600)",
            "700": "var(--primitives-colour-orange-700)",
            "800": "var(--primitives-colour-orange-800)",
            "900": "var(--primitives-colour-orange-900)"
          },
          "yellow": {
            "100": "var(--primitives-colour-yellow-100)",
            "200": "var(--primitives-colour-yellow-200)",
            "300": "var(--primitives-colour-yellow-300)",
            "400": "var(--primitives-colour-yellow-400)",
            "500": "var(--primitives-colour-yellow-500)",
            "600": "var(--primitives-colour-yellow-600)"
          },
          "blue": {
            "400": "var(--primitives-colour-blue-400)",
            "500": "var(--primitives-colour-blue-500)"
          }
        }
      },
      "spacing": {
        "scale-0": "var(--primitives-scale-0)",
        "scale-25": "var(--primitives-scale-25)",
        "scale-50": "var(--primitives-scale-50)",
        "scale-100": "var(--primitives-scale-100)",
        "scale-200": "var(--primitives-scale-200)",
        "scale-300": "var(--primitives-scale-300)",
        "scale-400": "var(--primitives-scale-400)",
        "scale-500": "var(--primitives-scale-500)",
        "scale-600": "var(--primitives-scale-600)",
        "scale-700": "var(--primitives-scale-700)",
        "scale-800": "var(--primitives-scale-800)",
        "scale-900": "var(--primitives-scale-900)",
        "scale-1000": "var(--primitives-scale-1000)",
        "scale-1100": "var(--primitives-scale-1100)",
        "scale-1200": "var(--primitives-scale-1200)",
        "scale-1300": "var(--primitives-scale-1300)",
        "scale-1400": "var(--primitives-scale-1400)",
        "scale-1500": "var(--primitives-scale-1500)",
        "scale-1600": "var(--primitives-scale-1600)",
        "scale-1700": "var(--primitives-scale-1700)",
        "scale-1800": "var(--primitives-scale-1800)",
        "scale-1900": "var(--primitives-scale-1900)",
        "scale-2000": "var(--primitives-scale-2000)",
        "scale-2100": "var(--primitives-scale-2100)",
        "scale-2200": "var(--primitives-scale-2200)",
        "scale-2300": "var(--primitives-scale-2300)",
        "scale-2400": "var(--primitives-scale-2400)",
        "scale-2500": "var(--primitives-scale-2500)",
        "scale-2600": "var(--primitives-scale-2600)",
        "scale-2700": "var(--primitives-scale-2700)",
        "scale-2800": "var(--primitives-scale-2800)",
        "scale-2900": "var(--primitives-scale-2900)",
        "scale-3000": "var(--primitives-scale-3000)",
        "scale-25-2": "var(--primitives-scale-25-2)",
        "scale-0-2": "var(--primitives-scale-0-2)",
        "3xs-desktop": "var(--desktop-spacing-3xs)",
        "sm-desktop": "var(--desktop-spacing-sm)",
        "md-desktop": "var(--desktop-spacing-md)",
        "lg-desktop": "var(--desktop-spacing-lg)",
        "xs-desktop": "var(--desktop-spacing-xs)",
        "2xs-desktop": "var(--desktop-spacing-2xs)",
        "xl-desktop": "var(--desktop-spacing-xl)",
        "2xl-desktop": "var(--desktop-spacing-2xl)",
        "4xl-desktop": "var(--desktop-spacing-4xl)",
        "3xl-desktop": "var(--desktop-spacing-3xl)",
        "grid-max-width-desktop": "var(--desktop-spacing-grid-max-width)",
        "grid-screen-margin-desktop": "var(--desktop-spacing-grid-screen-margin)",
        "grid-columns-all-desktop": "var(--desktop-spacing-grid-columns-all)",
        "grid-columns-2-desktop": "var(--desktop-spacing-grid-columns-2)",
        "grid-columns-3-desktop": "var(--desktop-spacing-grid-columns-3)",
        "grid-column-1-desktop": "var(--desktop-spacing-grid-column-1)",
        "grid-columns-4-desktop": "var(--desktop-spacing-grid-columns-4)",
        "grid-columns-5-desktop": "var(--desktop-spacing-grid-columns-5)",
        "grid-columns-6-desktop": "var(--desktop-spacing-grid-columns-6)",
        "grid-columns-7-desktop": "var(--desktop-spacing-grid-columns-7)",
        "grid-columns-8-desktop": "var(--desktop-spacing-grid-columns-8)",
        "grid-columns-9-desktop": "var(--desktop-spacing-grid-columns-9)",
        "grid-columns-10-desktop": "var(--desktop-spacing-grid-columns-10)",
        "grid-columns-11-desktop": "var(--desktop-spacing-grid-columns-11)",
        "grid-vertical-margin-large-desktop": "var(--desktop-spacing-grid-vertical-margin-large)",
        "grid-vertical-margin-small-desktop": "var(--desktop-spacing-grid-vertical-margin-small)",
        "5xl-desktop": "var(--desktop-spacing-5xl)",
        "6xl-desktop": "var(--desktop-spacing-6xl)",
        "7xl-desktop": "var(--desktop-spacing-7xl)",
        "3xs-mobile": "var(--mobile-spacing-3xs)",
        "sm-mobile": "var(--mobile-spacing-sm)",
        "md-mobile": "var(--mobile-spacing-md)",
        "lg-mobile": "var(--mobile-spacing-lg)",
        "xs-mobile": "var(--mobile-spacing-xs)",
        "2xs-mobile": "var(--mobile-spacing-2xs)",
        "xl-mobile": "var(--mobile-spacing-xl)",
        "2xl-mobile": "var(--mobile-spacing-2xl)",
        "4xl-mobile": "var(--mobile-spacing-4xl)",
        "3xl-mobile": "var(--mobile-spacing-3xl)",
        "grid-max-width-mobile": "var(--mobile-spacing-grid-max-width)",
        "grid-screen-margin-mobile": "var(--mobile-spacing-grid-screen-margin)",
        "grid-columns-all-mobile": "var(--mobile-spacing-grid-columns-all)",
        "grid-columns-2-mobile": "var(--mobile-spacing-grid-columns-2)",
        "grid-columns-3-mobile": "var(--mobile-spacing-grid-columns-3)",
        "grid-column-1-mobile": "var(--mobile-spacing-grid-column-1)",
        "grid-columns-4-mobile": "var(--mobile-spacing-grid-columns-4)",
        "grid-columns-5-mobile": "var(--mobile-spacing-grid-columns-5)",
        "grid-columns-6-mobile": "var(--mobile-spacing-grid-columns-6)",
        "grid-columns-7-mobile": "var(--mobile-spacing-grid-columns-7)",
        "grid-columns-8-mobile": "var(--mobile-spacing-grid-columns-8)",
        "grid-columns-9-mobile": "var(--mobile-spacing-grid-columns-9)",
        "grid-columns-10-mobile": "var(--mobile-spacing-grid-columns-10)",
        "grid-columns-11-mobile": "var(--mobile-spacing-grid-columns-11)",
        "grid-vertical-margin-large-mobile": "var(--mobile-spacing-grid-vertical-margin-large)",
        "grid-vertical-margin-small-mobile": "var(--mobile-spacing-grid-vertical-margin-small)",
        "5xl-mobile": "var(--mobile-spacing-5xl)",
        "6xl-mobile": "var(--mobile-spacing-6xl)",
        "7xl-mobile": "var(--mobile-spacing-7xl)"
      },
      "fontSize": {
        "body-sm-desktop": "var(--desktop-font-size-body-sm)",
        "body-md-desktop": "var(--desktop-font-size-body-md)",
        "body-xs-desktop": "var(--desktop-font-size-body-xs)",
        "body-micro-desktop": "var(--desktop-font-size-body-micro)",
        "body-lg-desktop": "var(--desktop-font-size-body-lg)",
        "body-extra-micro-desktop": "var(--desktop-font-size-body-extra-micro)",
        "heading-h2-desktop": "var(--desktop-font-size-heading-h2)",
        "heading-h3-desktop": "var(--desktop-font-size-heading-h3)",
        "heading-h4-desktop": "var(--desktop-font-size-heading-h4)",
        "heading-h5-desktop": "var(--desktop-font-size-heading-h5)",
        "heading-h6-desktop": "var(--desktop-font-size-heading-h6)",
        "heading-h7-desktop": "var(--desktop-font-size-heading-h7)",
        "heading-h1-desktop": "var(--desktop-font-size-heading-h1)",
        "action-sm-desktop": "var(--desktop-font-size-action-sm)",
        "action-md-desktop": "var(--desktop-font-size-action-md)",
        "body-sm-mobile": "var(--mobile-font-size-body-sm)",
        "body-md-mobile": "var(--mobile-font-size-body-md)",
        "body-xs-mobile": "var(--mobile-font-size-body-xs)",
        "body-micro-mobile": "var(--mobile-font-size-body-micro)",
        "body-lg-mobile": "var(--mobile-font-size-body-lg)",
        "body-extra-micro-mobile": "var(--mobile-font-size-body-extra-micro)",
        "heading-h2-mobile": "var(--mobile-font-size-heading-h2)",
        "heading-h3-mobile": "var(--mobile-font-size-heading-h3)",
        "heading-h4-mobile": "var(--mobile-font-size-heading-h4)",
        "heading-h5-mobile": "var(--mobile-font-size-heading-h5)",
        "heading-h6-mobile": "var(--mobile-font-size-heading-h6)",
        "heading-h7-mobile": "var(--mobile-font-size-heading-h7)",
        "heading-h1-mobile": "var(--mobile-font-size-heading-h1)",
        "action-sm-mobile": "var(--mobile-font-size-action-sm)",
        "action-md-mobile": "var(--mobile-font-size-action-md)"
      },
      "lineHeight": {
        "body-sm-desktop": "var(--desktop-line-height-body-sm)",
        "body-md-desktop": "var(--desktop-line-height-body-md)",
        "body-xs-desktop": "var(--desktop-line-height-body-xs)",
        "body-micro-desktop": "var(--desktop-line-height-body-micro)",
        "body-extra-micro-desktop": "var(--desktop-line-height-body-extra-micro)",
        "body-lg-desktop": "var(--desktop-line-height-body-lg)",
        "heading-h1-desktop": "var(--desktop-line-height-heading-h1)",
        "heading-h2-desktop": "var(--desktop-line-height-heading-h2)",
        "heading-h3-desktop": "var(--desktop-line-height-heading-h3)",
        "heading-h4-desktop": "var(--desktop-line-height-heading-h4)",
        "heading-h5-desktop": "var(--desktop-line-height-heading-h5)",
        "heading-h6-desktop": "var(--desktop-line-height-heading-h6)",
        "heading-h7-desktop": "var(--desktop-line-height-heading-h7)",
        "action-sm-desktop": "var(--desktop-line-height-action-sm)",
        "action-md-desktop": "var(--desktop-line-height-action-md)",
        "label-small-desktop": "var(--desktop-line-height-label-small)",
        "label-extra-small-desktop": "var(--desktop-line-height-label-extra-small)",
        "label-micro-desktop": "var(--desktop-line-height-label-micro)",
        "label-extra-micro-desktop": "var(--desktop-line-height-label-extra-micro)",
        "body-sm-mobile": "var(--mobile-line-height-body-sm)",
        "body-md-mobile": "var(--mobile-line-height-body-md)",
        "body-xs-mobile": "var(--mobile-line-height-body-xs)",
        "body-micro-mobile": "var(--mobile-line-height-body-micro)",
        "body-extra-micro-mobile": "var(--mobile-line-height-body-extra-micro)",
        "body-lg-mobile": "var(--mobile-line-height-body-lg)",
        "heading-h1-mobile": "var(--mobile-line-height-heading-h1)",
        "heading-h2-mobile": "var(--mobile-line-height-heading-h2)",
        "heading-h3-mobile": "var(--mobile-line-height-heading-h3)",
        "heading-h4-mobile": "var(--mobile-line-height-heading-h4)",
        "heading-h5-mobile": "var(--mobile-line-height-heading-h5)",
        "heading-h6-mobile": "var(--mobile-line-height-heading-h6)",
        "heading-h7-mobile": "var(--mobile-line-height-heading-h7)",
        "action-sm-mobile": "var(--mobile-line-height-action-sm)",
        "action-md-mobile": "var(--mobile-line-height-action-md)",
        "label-small-mobile": "var(--mobile-line-height-label-small)",
        "label-extra-small-mobile": "var(--mobile-line-height-label-extra-small)",
        "label-micro-mobile": "var(--mobile-line-height-label-micro)",
        "label-extra-micro-mobile": "var(--mobile-line-height-label-extra-micro)"
      },
      "borderWidth": {
        "none": "var(--border-width-none)",
        "sm": "var(--border-width-sm)",
        "md": "var(--border-width-md)",
        "lg": "var(--border-width-lg)",
        "xs": "var(--border-width-xs)",
        "xl": "var(--border-width-xl)"
      },
      "borderRadius": {
        "xs": "var(--border-radius-xs)",
        "sm": "var(--border-radius-sm)",
        "md": "var(--border-radius-md)",
        "xl": "var(--border-radius-xl)",
        "xxl": "var(--border-radius-xxl)",
        "none": "var(--border-radius-none)",
        "round": "var(--border-radius-round)",
        "lg": "var(--border-radius-lg)"
      },
      "fontFamily": {
        "brand-a-body": "var(--primitives-font-brand-branda-font-family-body)",
        "brand-a-heading": "var(--primitives-font-brand-branda-font-family-heading)",
        "brand-b-body": "var(--primitives-font-brand-brandb-font-family-body)",
        "brand-b-heading": "var(--primitives-font-brand-brandb-font-family-sub-heading)",
        "headings": "var(--font-font-family-headings)",
        "paragraph": "var(--font-font-family-paragraph)",
        "sub-headings": "var(--font-font-family-sub-headings)"
      },
      "fontWeight": {
        "brand-a-light": "var(--primitives-font-brand-branda-font-weight-light)",
        "brand-a-regular": "var(--primitives-font-brand-branda-font-weight-regular)",
        "brand-a-medium": "var(--primitives-font-brand-branda-font-weight-medium)",
        "brand-a-bold": "var(--primitives-font-brand-branda-font-weight-semi-bold)",
        "brand-b-light": "var(--primitives-font-brand-brandb-font-weight-light)",
        "brand-b-regular": "var(--primitives-font-brand-brandb-font-weight-regular)",
        "brand-b-medium": "var(--primitives-font-brand-brandb-font-weight-medium)",
        "brand-b-bold": "var(--primitives-font-brand-brandb-font-weight-bold)",
        "header-light": "var(--font-font-weight-header-light)",
        "header-regular": "var(--font-font-weight-header-regular)",
        "header-medium": "var(--font-font-weight-header-medium)",
        "header-semi-bold": "var(--font-font-weight-header-semi-bold)",
        "header-bold": "var(--font-font-weight-header-bold)",
        "header-extra-bold": "var(--font-font-weight-header-extra-bold)",
        "paragraph-light": "var(--font-font-weight-paragraph-light)",
        "paragraph-regular": "var(--font-font-weight-paragraph-regular)",
        "paragraph-medium": "var(--font-font-weight-paragraph-medium)",
        "paragraph-semi-bold": "var(--font-font-weight-paragraph-semi-bold)",
        "paragraph-bold": "var(--font-font-weight-paragraph-bold)",
        "paragraph-extra-bold": "var(--font-font-weight-paragraph-extra-bold)"
      },
      "width": {
        "icon-xs-desktop": "var(--desktop-icon-xs)",
        "icon-sm-desktop": "var(--desktop-icon-sm)",
        "icon-md-desktop": "var(--desktop-icon-md)",
        "icon-lg-desktop": "var(--desktop-icon-lg)",
        "icon-xl-desktop": "var(--desktop-icon-xl)",
        "icon-2xl-desktop": "var(--desktop-icon-2xl)",
        "icon-3xl-desktop": "var(--desktop-icon-3xl)",
        "icon-xs-mobile": "var(--mobile-icon-xs)",
        "icon-sm-mobile": "var(--mobile-icon-sm)",
        "icon-md-mobile": "var(--mobile-icon-md)",
        "icon-lg-mobile": "var(--mobile-icon-lg)",
        "icon-xl-mobile": "var(--mobile-icon-xl)",
        "icon-2xl-mobile": "var(--mobile-icon-2xl)",
        "icon-3xl-mobile": "var(--mobile-icon-3xl)"
      },
      "height": {
        "icon-xs-desktop": "var(--desktop-icon-xs)",
        "icon-sm-desktop": "var(--desktop-icon-sm)",
        "icon-md-desktop": "var(--desktop-icon-md)",
        "icon-lg-desktop": "var(--desktop-icon-lg)",
        "icon-xl-desktop": "var(--desktop-icon-xl)",
        "icon-2xl-desktop": "var(--desktop-icon-2xl)",
        "icon-3xl-desktop": "var(--desktop-icon-3xl)",
        "icon-xs-mobile": "var(--mobile-icon-xs)",
        "icon-sm-mobile": "var(--mobile-icon-sm)",
        "icon-md-mobile": "var(--mobile-icon-md)",
        "icon-lg-mobile": "var(--mobile-icon-lg)",
        "icon-xl-mobile": "var(--mobile-icon-xl)",
        "icon-2xl-mobile": "var(--mobile-icon-2xl)",
        "icon-3xl-mobile": "var(--mobile-icon-3xl)"
      }
    }
  },
  "plugins": []
};