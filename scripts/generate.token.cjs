const fs = require('fs');
const path = require('path');

console.log('🔄 Generating design tokens...\n');

const tokensPath = path.join(__dirname, '../figma-tokens.json');

if (!fs.existsSync(tokensPath)) {
    console.error('❌ Error: figma-tokens.json not found!');
    process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

/**
 * Utils
 */
const toKebab = (str) =>
    String(str)
        .trim()
        .toLowerCase()
        .replace(/[()]/g, '')
        .replace(/[\s_/]+/g, '-')
        .replace(/-+/g, '-');

const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);

/**
 * Helper to find a token value anywhere in the token tree
 */
function findToken(tokenPath, allTokens) {
    const cleanPath = tokenPath.replace(/[{}]/g, '');
    const parts = cleanPath.split('.');

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

/**
 * Recursive resolver for alias tokens: "{A.B.C}" -> actual value
 */
function resolve(value, allTokens, depth = 0, visited = new Set()) {
    if (depth > 25) return value;
    if (typeof value !== 'string') return value;

    const match = value.match(/^\{(.+)\}$/);
    if (!match) return value;

    if (visited.has(value)) return value;
    visited.add(value);

    const foundValue = findToken(match[1], allTokens);

    if (foundValue === null) {
        console.warn(`⚠️  Token not found: ${match[1]}`);
        return value;
    }

    if (typeof foundValue === 'string' && foundValue.match(/^\{.+\}$/)) {
        return resolve(foundValue, allTokens, depth + 1, visited);
    }

    return foundValue;
}

/**
 * Extract all colors for a brand (your existing logic with small cleanup)
 */
function extractAllColors(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const alias = tokens[`Alias colours/${brand}`];
    const colors = {};

    // Primary colors
    if (alias?.Primary) {
        Object.entries(alias.Primary).forEach(([key, val]) => {
            if (val?.value) {
                const resolved = resolve(val.value, tokens);
                const cssKey = toKebab(key);
                colors[`primary-${cssKey}`] = resolved;
            }
        });
    }

    // Surface colors (keep your curated list + action)
    if (mapped?.Surface?.Colour) {
        const surface = mapped.Surface.Colour;

        ['Page', 'Secondary', 'Disabled-Dark', 'Disabled-Light', 'Hover'].forEach((key) => {
            if (surface[key]?.value) {
                colors[`surface-${toKebab(key)}`] = resolve(surface[key].value, tokens);
            }
        });

        if (surface.Action) {
            Object.entries(surface.Action).forEach(([key, val]) => {
                if (val?.value) {
                    colors[`surface-action-${toKebab(key)}`] = resolve(val.value, tokens);
                }
            });
        }
    }

    // Text colors
    if (mapped?.Text?.Colour) {
        const text = mapped.Text.Colour;

        ['Headings', 'Body', 'Error', 'Success', 'Disabled', 'Inverse'].forEach((key) => {
            if (text[key]?.value) {
                colors[`text-${toKebab(key)}`] = resolve(text[key].value, tokens);
            }
        });

        if (text.Action) {
            Object.entries(text.Action).forEach(([key, val]) => {
                if (val?.value) {
                    colors[`text-${toKebab(key)}`] = resolve(val.value, tokens);
                }
            });
        }
    }

    // Border colors
    if (mapped?.Border?.Colour) {
        const border = mapped.Border.Colour;

        ['Primary', 'Error', 'Disabled', 'Success', 'Warning', 'Secondary'].forEach((key) => {
            if (border[key]?.value) {
                colors[`border-${toKebab(key)}`] = resolve(border[key].value, tokens);
            }
        });
    }

    return colors;
}

/**
 * Border widths for a brand
 */
function extractBorderWidths(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const widths = {};

    if (mapped?.Border?.Width) {
        Object.entries(mapped.Border.Width).forEach(([key, val]) => {
            if (val?.value !== undefined) {
                const resolved = resolve(val.value, tokens);
                widths[toKebab(key)] = `${resolved}px`;
            }
        });
    }

    return widths;
}

/**
 * Border radius for a brand
 */
function extractBorderRadius(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const radius = {};

    if (mapped?.Border?.Radius) {
        Object.entries(mapped.Border.Radius).forEach(([key, val]) => {
            if (val?.value !== undefined) {
                const resolved = resolve(val.value, tokens);
                radius[toKebab(key)] = `${resolved}px`;
            }
        });
    }

    return radius;
}

/**
 * Typography: Font families (Mapped/{brand}/Font/Font family)
 * Produces:
 *   --font-heading
 *   --font-body
 *   --font-sub-heading (if exists)
 */
function extractFontFamilies(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const families = {};

    const fontFamilyGroup = mapped?.Font?.['Font family'];
    if (!fontFamilyGroup) return families;

    // Example keys in your file: "Headings", "Paragraph", "Sub Headings"
    Object.entries(fontFamilyGroup).forEach(([key, val]) => {
        if (val?.value) {
            const resolved = resolve(val.value, tokens);
            const k = toKebab(key);

            // normalize to nicer variable names
            if (k === 'headings' || k === 'heading') families['heading'] = resolved;
            else if (k === 'paragraph' || k === 'body') families['body'] = resolved;
            else if (k === 'sub-headings' || k === 'sub-heading') families['sub-heading'] = resolved;
            else families[k] = resolved;
        }
    });

    return families;
}

/**
 * Typography: Font weights (Mapped/{brand}/Font/Font weight)
 * Your values are strings like "Regular", "Semi Bold", etc.
 * We convert them to numeric CSS weights.
 */
const FONT_WEIGHT_MAP = {
    light: 300,
    regular: 400,
    medium: 500,
    'semi-bold': 600,
    semibold: 600,
    bold: 700,
    'extra-bold': 800,
    extrabold: 800,
};

function normalizeWeightName(value) {
    return toKebab(value).replace(/-/g, '-');
}

function extractFontWeights(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const weights = {};

    const weightGroup = mapped?.Font?.['Font weight'];
    if (!weightGroup) return weights;

    // structure in your file: { Header: { Light: {...}, Regular: {...}, ... }, Paragraph: {...} }
    Object.values(weightGroup).forEach((section) => {
        if (!isObject(section)) return;

        Object.values(section).forEach((token) => {
            if (token?.value) {
                const name = normalizeWeightName(token.value);
                const numeric = FONT_WEIGHT_MAP[name];
                if (numeric) weights[name] = numeric;
            }
        });
    });

    // Ensure common keys exist if possible
    return weights;
}

/**
 * Typography: Responsive font sizes + line heights
 * From:
 *   Responsive/Desktop/Font-size/*
 *   Responsive/Mobile/Font-size/*
 *   Responsive/Desktop/Line-height/*
 *   Responsive/Mobile/Line-height/*
 */
function extractResponsiveGroup(device, groupName) {
    const responsive = tokens[`Responsive/${device}`];
    const group = responsive?.[groupName];
    const out = {};

    if (!group) return out;

    Object.entries(group).forEach(([category, values]) => {
        if (!isObject(values)) return;

        Object.entries(values).forEach(([key, token]) => {
            if (token?.value === undefined) return;

            const name = `${toKebab(category)}-${toKebab(key)}`; // e.g. body-md, heading-h1
            out[name] = token.value;
        });
    });

    return out;
}

function toPx(v) {
    if (typeof v === 'number') return `${v}px`;
    return v;
}

/**
 * Generate CSS variables for a brand block (:root or [data-theme="brandB"])
 */
function writeBrandBlock({
    selector,
    colors,
    widths,
    radius,
    fontFamilies,
    fontWeights,
}) {
    let css = `${selector} {\n`;

    // Colors
    css += '  /* Colors */\n';
    Object.entries(colors).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
    });

    // Border widths
    css += '\n  /* Border widths */\n';
    Object.entries(widths).forEach(([key, value]) => {
        css += `  --border-width-${key}: ${value};\n`;
    });

    // Radius
    css += '\n  /* Radius */\n';
    Object.entries(radius).forEach(([key, value]) => {
        css += `  --radius-${key}: ${value};\n`;
    });

    // Font families (brand-specific)
    css += '\n  /* Font families */\n';
    if (fontFamilies.heading) css += `  --font-heading: '${fontFamilies.heading}', sans-serif;\n`;
    if (fontFamilies.body) css += `  --font-body: '${fontFamilies.body}', sans-serif;\n`;
    if (fontFamilies['sub-heading']) css += `  --font-sub-heading: '${fontFamilies['sub-heading']}', sans-serif;\n`;

    // Font weights (numeric)
    css += '\n  /* Font weights */\n';
    Object.entries(fontWeights).forEach(([key, value]) => {
        css += `  --font-weight-${key}: ${value};\n`;
    });

    css += '}\n';
    return css;
}

/**
 * Generate CSS variables for responsive typography
 * Desktop default in :root, mobile override inside @media
 */
function writeResponsiveTypography() {
    const desktopSizes = extractResponsiveGroup('Desktop', 'Font-size');
    const mobileSizes = extractResponsiveGroup('Mobile', 'Font-size');
    const desktopHeights = extractResponsiveGroup('Desktop', 'Line-height');
    const mobileHeights = extractResponsiveGroup('Mobile', 'Line-height');

    let css = '\n/* Responsive typography */\n';

    // Desktop defaults
    css += ':root {\n';
    css += '  /* Font sizes (desktop) */\n';
    Object.entries(desktopSizes).forEach(([key, value]) => {
        css += `  --font-size-${key}: ${toPx(value)};\n`;
    });

    css += '\n  /* Line heights (desktop) */\n';
    Object.entries(desktopHeights).forEach(([key, value]) => {
        css += `  --line-height-${key}: ${toPx(value)};\n`;
    });

    css += '}\n';

    // Mobile overrides
    css += '\n@media (max-width: 767px) {\n';
    css += '  :root {\n';
    css += '    /* Font sizes (mobile) */\n';
    Object.entries(mobileSizes).forEach(([key, value]) => {
        css += `    --font-size-${key}: ${toPx(value)};\n`;
    });

    css += '\n    /* Line heights (mobile) */\n';
    Object.entries(mobileHeights).forEach(([key, value]) => {
        css += `    --line-height-${key}: ${toPx(value)};\n`;
    });

    css += '  }\n';
    css += '}\n';

    return css;
}

/**
 * Main CSS generator
 */
function generateCSS() {
    const brandAColors = extractAllColors('BrandA');
    const brandBColors = extractAllColors('BrandB');

    const brandAWidths = extractBorderWidths('BrandA');
    const brandBWidths = extractBorderWidths('BrandB');

    const brandARadius = extractBorderRadius('BrandA');
    const brandBRadius = extractBorderRadius('BrandB');

    const brandAFamilies = extractFontFamilies('BrandA');
    const brandBFamilies = extractFontFamilies('BrandB');

    const brandAWeights = extractFontWeights('BrandA');
    const brandBWeights = extractFontWeights('BrandB');

    let css = '/* Auto-generated design tokens - DO NOT EDIT MANUALLY */\n\n';

    // Brand A defaults
    css += writeBrandBlock({
        selector: ':root',
        colors: brandAColors,
        widths: brandAWidths,
        radius: brandARadius,
        fontFamilies: brandAFamilies,
        fontWeights: brandAWeights,
    });

    // Brand B theme override
    css += '\n' + writeBrandBlock({
        selector: '[data-theme="brandB"]',
        colors: brandBColors,
        widths: brandBWidths,
        radius: brandBRadius,
        fontFamilies: brandBFamilies,
        fontWeights: brandBWeights,
    });

    // Responsive typography (device-based)
    css += writeResponsiveTypography();

    return css;
}

try {
    const indexCssPath = path.join(__dirname, '../src/index.css');

    const cssWithLayer = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
${generateCSS()}
}
`;

    fs.writeFileSync(indexCssPath, cssWithLayer);
    console.log('✅ Updated src/index.css with tokens');
    console.log('🎉 Done! Colors, borders, radius, font families, font weights, font sizes, and line-heights included.\n');
} catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
}
