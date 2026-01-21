const fs = require('fs');
const path = require('path');

const indexCssPath = path.join(__dirname, '../src/index.css');
const outPath = path.join(__dirname, '../src/styles/tailwind.tokens.mjs');

if (!fs.existsSync(indexCssPath)) {
    console.error('❌ src/index.css not found');
    process.exit(1);
}

const css = fs.readFileSync(indexCssPath, 'utf8');

// Matches: --var-name: value;
const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;

const vars = {};
let m;
while ((m = varRegex.exec(css)) !== null) {
    vars[`--${m[1]}`] = m[2].trim();
}


const tailwindExtend = {
    colors: {},
    borderWidth: {},
    borderRadius: {},
    fontFamily: {},
    fontWeight: {},
    fontSize: {},
};

// 1) Colors: --color-{group}-{name...}
Object.keys(vars)
    .filter((k) => k.startsWith('--color-'))
    .forEach((k) => {
        // e.g. --color-surface-action-primary
        const parts = k.replace('--color-', '').split('-');
        const group = parts.shift(); // primary | surface | text | border
        const name = parts.join('-');

        // Colors become nested groups like you already use:
        // colors.surface['action-primary'] = var(--color-surface-action-primary)
        if (!tailwindExtend.colors[group]) tailwindExtend.colors[group] = {};

        // Put DEFAULT if primary-default exists
        if (group === 'primary' && name === 'default') {
            tailwindExtend.colors.primary.DEFAULT = `var(${k})`;
        } else {
            tailwindExtend.colors[group][name] = `var(${k})`;
        }
    });

// 2) Border widths: --border-width-md -> border-md
Object.keys(vars)
    .filter((k) => k.startsWith('--border-width-'))
    .forEach((k) => {
        const name = k.replace('--border-width-', '');
        tailwindExtend.borderWidth[name] = `var(${k})`;
    });

// 3) Radius: --radius-lg -> rounded-lg
Object.keys(vars)
    .filter((k) => k.startsWith('--radius-'))
    .forEach((k) => {
        const name = k.replace('--radius-', '');
        tailwindExtend.borderRadius[name] = `var(${k})`;
    });

// 4) Fonts: --font-heading, --font-body, --font-sub-heading
Object.keys(vars)
    .filter((k) => k.startsWith('--font-') && !k.startsWith('--font-weight-') && !k.startsWith('--font-size-'))
    .forEach((k) => {
        const name = k.replace('--font-', '');
        // Tailwind expects an array or string; var() is fine
        tailwindExtend.fontFamily[name] = `var(${k})`;
    });

// 5) Font weights: --font-weight-semi-bold
Object.keys(vars)
    .filter((k) => k.startsWith('--font-weight-'))
    .forEach((k) => {
        const name = k.replace('--font-weight-', '').replace(/-/g, '');
        // semibold/extrabold nicer keys
        tailwindExtend.fontWeight[name] = `var(${k})`;
    });

// 6) Font sizes + line heights: pair by suffix (body-md, heading-h1, etc.)
const fontSizes = Object.keys(vars).filter((k) => k.startsWith('--font-size-'));
fontSizes.forEach((k) => {
    const name = k.replace('--font-size-', ''); // body-md
    const lhVar = `--line-height-${name}`;

    if (vars[lhVar]) {
        tailwindExtend.fontSize[name] = [
            `var(${k})`,
            { lineHeight: `var(${lhVar})` },
        ];
    } else {
        tailwindExtend.fontSize[name] = `var(${k})`;
    }
});

// Ensure output dir exists
const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
    outPath,
    `// Auto-generated from src/index.css - DO NOT EDIT
export default ${JSON.stringify(tailwindExtend, null, 2)};
`,
    'utf8'
);

console.log('✅ Generated:', outPath);
