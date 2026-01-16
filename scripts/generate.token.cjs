const fs = require('fs');
const path = require('path');

console.log('🔄 Generating design tokens...\n');

const tokensPath = path.join(__dirname, '../figma-tokens.json');

if (!fs.existsSync(tokensPath)) {
    console.error('❌ Error: tokens/figma-tokens.json not found!');
    process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Helper to find a token value anywhere in the token tree
function findToken(tokenPath, allTokens) {
    // Remove curly braces if present
    const cleanPath = tokenPath.replace(/[{}]/g, '');
    const parts = cleanPath.split('.');

    // Try to find the token by searching through all token sets
    for (const tokenSet of Object.keys(allTokens)) {
        let current = allTokens[tokenSet];
        let found = true;

        for (const part of parts) {
            if (current && typeof current === 'object' && current[part] !== undefined) {
                current = current[part];
            } else {
                found = false;
                break;
            }
        }

        if (found && current && typeof current === 'object' && current.value !== undefined) {
            return current.value;
        } else if (found && typeof current === 'string') {
            return current;
        }
    }

    return null;
}

// Recursive resolver with depth limit
function resolve(value, allTokens, depth = 0, visited = new Set()) {
    if (depth > 20) {
        console.warn(`⚠️  Max recursion depth reached for: ${value}`);
        return value;
    }

    if (typeof value !== 'string') return value;

    // Check if it's a token reference
    const match = value.match(/^\{(.+)\}$/);
    if (!match) return value;

    // Prevent infinite loops
    if (visited.has(value)) {
        console.warn(`⚠️  Circular reference detected: ${value}`);
        return value;
    }
    visited.add(value);

    const tokenPath = match[1];

    // Try to find the token
    const foundValue = findToken(tokenPath, allTokens);

    if (foundValue === null) {
        console.warn(`⚠️  Token not found: ${tokenPath}`);
        return value;
    }

    // If the found value is also a reference, resolve it recursively
    if (typeof foundValue === 'string' && foundValue.match(/^\{.+\}$/)) {
        return resolve(foundValue, allTokens, depth + 1, visited);
    }

    return foundValue;
}

// Generate the CSS
function generateCSS() {
    const brandA = tokens['Mapped/BrandA'];
    const brandB = tokens['Mapped/BrandB'];
    const aliasA = tokens['Alias colours/BrandA'];
    const aliasB = tokens['Alias colours/BrandB'];

    let css = '/* Auto-generated design tokens - DO NOT EDIT MANUALLY */\n\n';

    // Brand A
    css += ':root {\n';
    css += '  /* Brand A - Primary Colors */\n';

    if (aliasA?.Primary) {
        Object.entries(aliasA.Primary).forEach(([key, val]) => {
            if (val?.value) {
                const resolved = resolve(val.value, tokens);
                const cssKey = key.toLowerCase().replace(/\s+/g, '-');
                css += `  --color-primary-${cssKey}: ${resolved};\n`;
            }
        });
    }

    css += '\n  /* Brand A - Surface Colors */\n';
    if (brandA?.Surface?.Colour) {
        const entries = [
            ['Page', 'surface-page'],
            ['Secondary', 'surface-secondary'],
            ['Disabled-Dark', 'surface-disabled-dark'],
            ['Disabled-Light', 'surface-disabled-light'],
        ];

        entries.forEach(([key, cssVar]) => {
            const val = brandA.Surface.Colour[key];
            if (val?.value) {
                css += `  --color-${cssVar}: ${resolve(val.value, tokens)};\n`;
            }
        });

        // Action colors
        if (brandA.Surface.Colour.Action) {
            const action = brandA.Surface.Colour.Action;
            ['Primary', 'Secondary', 'Inverse'].forEach(key => {
                if (action[key]?.value) {
                    const cssKey = key.toLowerCase();
                    css += `  --color-surface-action-${cssKey}: ${resolve(action[key].value, tokens)};\n`;
                }
            });
        }
    }

    css += '\n  /* Brand A - Text Colors */\n';
    if (brandA?.Text?.Colour) {
        const text = brandA.Text.Colour;
        const entries = [
            ['Headings', 'text-heading'],
            ['Body', 'text-body'],
            ['Error', 'text-error'],
            ['Success', 'text-success'],
            ['Disabled', 'text-disabled'],
            ['Inverse', 'text-inverse'],
        ];

        entries.forEach(([key, cssVar]) => {
            if (text[key]?.value) {
                css += `  --color-${cssVar}: ${resolve(text[key].value, tokens)};\n`;
            }
        });

        // Action text colors
        if (text.Action) {
            ['OnPrimary', 'OnSecondary', 'OnTertiary'].forEach(key => {
                if (text.Action[key]?.value) {
                    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
                    css += `  --color-text-${cssKey}: ${resolve(text.Action[key].value, tokens)};\n`;
                }
            });
        }
    }

    css += '\n  /* Brand A - Border Colors */\n';
    if (brandA?.Border?.Colour) {
        const border = brandA.Border.Colour;
        ['Primary', 'Error', 'Disabled', 'Success'].forEach(key => {
            if (border[key]?.value) {
                css += `  --color-border-${key.toLowerCase()}: ${resolve(border[key].value, tokens)};\n`;
            }
        });
    }

    css += '\n  /* Fonts & Spacing */\n';
    css += `  --font-heading: 'Inter', sans-serif;\n`;
    css += `  --font-body: 'Inter', sans-serif;\n`;
    css += `  --radius-sm: 4px;\n`;
    css += `  --radius-md: 8px;\n`;
    css += `  --radius-lg: 12px;\n`;
    css += '}\n\n';

    // Brand B
    css += '[data-theme="brandB"] {\n';
    css += '  /* Brand B - Primary Colors */\n';

    if (aliasB?.Primary) {
        Object.entries(aliasB.Primary).forEach(([key, val]) => {
            if (val?.value) {
                const resolved = resolve(val.value, tokens);
                const cssKey = key.toLowerCase().replace(/\s+/g, '-');
                css += `  --color-primary-${cssKey}: ${resolved};\n`;
            }
        });
    }

    css += '\n  /* Brand B - Surface Colors */\n';
    if (brandB?.Surface?.Colour?.Page?.value) {
        css += `  --color-surface-page: ${resolve(brandB.Surface.Colour.Page.value, tokens)};\n`;
    }
    if (brandB?.Surface?.Colour?.Action) {
        const action = brandB.Surface.Colour.Action;
        ['Primary', 'Secondary', 'Inverse'].forEach(key => {
            if (action[key]?.value) {
                css += `  --color-surface-action-${key.toLowerCase()}: ${resolve(action[key].value, tokens)};\n`;
            }
        });
    }

    css += '\n  /* Brand B - Text Colors */\n';
    if (brandB?.Text?.Colour?.Action) {
        const action = brandB.Text.Colour.Action;
        ['OnPrimary', 'OnSecondary'].forEach(key => {
            if (action[key]?.value) {
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
                css += `  --color-text-${cssKey}: ${resolve(action[key].value, tokens)};\n`;
            }
        });
    }

    css += '\n  /* Fonts & Spacing */\n';
    css += `  --font-heading: 'mencken-std-head-narrow', serif;\n`;
    css += `  --font-body: 'Open Sans', sans-serif;\n`;
    css += `  --radius-sm: 0px;\n`;
    css += `  --radius-md: 0px;\n`;
    css += `  --radius-lg: 0px;\n`;
    css += '}\n';

    return css;
}

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        },
        text: {
          heading: 'var(--color-text-heading)',
          body: 'var(--color-text-body)',
          onPrimary: 'var(--color-text-on-primary)',
          onSecondary: 'var(--color-text-on-secondary)',
        },
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
}
`;

try {
    const stylesDir = path.join(__dirname, '../src/styles');
    if (!fs.existsSync(stylesDir)) {
        fs.mkdirSync(stylesDir, { recursive: true });
    }

    fs.writeFileSync(path.join(stylesDir, 'tokens.css'), generateCSS());
    console.log('✅ Generated src/styles/tokens.css');


    console.log('\n🎉 Done! Check src/styles/tokens.css for resolved values\n');

} catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
}