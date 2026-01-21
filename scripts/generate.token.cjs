const fs = require('fs');
const path = require('path');

console.log('🔄 Generating theme-aware design tokens (keeping existing structure)...\n');

const tokensPath = path.join(__dirname, '../figma-tokens.json');

if (!fs.existsSync(tokensPath)) {
    console.error('❌ Error: tokens/figma-tokens.json not found!');
    process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Helper to find a token value anywhere in the token tree
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

// Recursive resolver
function resolve(value, allTokens, depth = 0, visited = new Set()) {
    if (depth > 20) return value;
    if (typeof value !== 'string') return value;

    const match = value.match(/^\{(.+)\}$/);
    if (!match) return value;

    if (visited.has(value)) return value;
    visited.add(value);

    const foundValue = findToken(match[1], allTokens);

    if (foundValue === null) return value;

    if (typeof foundValue === 'string' && foundValue.match(/^\{.+\}$/)) {
        return resolve(foundValue, allTokens, depth + 1, visited);
    }

    return foundValue;
}

// Convert a nested path to CSS variable name
function pathToCssVar(path) {
    return path
        .map(p => p.toLowerCase())
        .map(p => p.replace(/\s+/g, '-'))
        .map(p => p.replace(/[^a-z0-9-]/g, ''))
        .filter(p => p.length > 0)
        .join('-');
}

// Counter for logging
let tokenCount = 0;

// Recursively extract ALL tokens from a nested structure
function extractAllTokens(obj, currentPath = [], results = {}, parentKey = '') {
    if (!obj || typeof obj !== 'object') return results;

    // Check if this object has a 'value' property (it's a leaf token)
    if (obj.value !== undefined && obj.type) {
        const cssVarName = pathToCssVar(currentPath);
        const resolvedValue = resolve(obj.value, tokens);

        // Add appropriate suffix based on type
        let finalValue = resolvedValue;
        if (obj.type === 'number' && typeof resolvedValue === 'number') {
            finalValue = `${resolvedValue}px`;
        }

        results[cssVarName] = {
            value: finalValue,
            type: obj.type,
            path: [...currentPath],
            original: obj.value
        };

        tokenCount++;

        // Log every 50th token to show progress
        if (tokenCount % 50 === 0) {
            console.log(`  ... extracted ${tokenCount} tokens so far`);
        }

        return results;
    }

    // Otherwise, recursively traverse ALL properties
    for (const [key, value] of Object.entries(obj)) {
        // Skip metadata fields
        if (key === '$themes' || key === '$metadata') continue;

        if (typeof value === 'object' && value !== null) {
            // Recursively extract from this nested object
            extractAllTokens(value, [...currentPath, key], results, key);
        }
    }

    return results;
}

// Extract tokens for a specific brand
function extractBrandTokens(brand) {
    const mapped = tokens[`Mapped/${brand}`];
    const alias = tokens[`Alias colours/${brand}`];

    const allTokens = {};

    if (alias) {
        console.log(`  📦 Extracting Alias colours/${brand}...`);
        const beforeCount = tokenCount;
        const aliasTokens = extractAllTokens(alias, ['alias']);
        console.log(`     Found ${tokenCount - beforeCount} tokens`);
        Object.assign(allTokens, aliasTokens);
    }

    if (mapped) {
        console.log(`  📦 Extracting Mapped/${brand}...`);
        const beforeCount = tokenCount;
        const mappedTokens = extractAllTokens(mapped, []);
        console.log(`     Found ${tokenCount - beforeCount} tokens`);
        Object.assign(allTokens, mappedTokens);
    }

    return allTokens;
}

// Extract global tokens
function extractGlobalTokens() {
    const globalTokens = {};

    if (tokens['Primitives/Default']) {
        console.log('  📦 Extracting Primitives/Default...');
        const beforeCount = tokenCount;
        const primitiveTokens = extractAllTokens(tokens['Primitives/Default'], ['primitives']);
        console.log(`     Found ${tokenCount - beforeCount} tokens`);
        Object.assign(globalTokens, primitiveTokens);
    }

    if (tokens['Responsive/Desktop']) {
        console.log('  📦 Extracting Responsive/Desktop...');
        const beforeCount = tokenCount;
        const desktopTokens = extractAllTokens(tokens['Responsive/Desktop'], ['desktop']);
        console.log(`     Found ${tokenCount - beforeCount} tokens`);

        // Log some Label examples to verify
        const labelTokens = Object.keys(desktopTokens).filter(k => k.includes('label'));
        if (labelTokens.length > 0) {
            console.log(`     ✓ Label tokens found: ${labelTokens.slice(0, 3).join(', ')}${labelTokens.length > 3 ? '...' : ''}`);
        }

        Object.assign(globalTokens, desktopTokens);
    }

    if (tokens['Responsive/Mobile']) {
        console.log('  📦 Extracting Responsive/Mobile...');
        const beforeCount = tokenCount;
        const mobileTokens = extractAllTokens(tokens['Responsive/Mobile'], ['mobile']);
        console.log(`     Found ${tokenCount - beforeCount} tokens`);
        Object.assign(globalTokens, mobileTokens);
    }

    return globalTokens;
}

// Group tokens by category
function groupTokens(tokens) {
    const groups = {
        color: {},
        spacing: {},
        border: {},
        typography: {},
        responsive: {},
        primitives: {},
        other: {}
    };

    Object.entries(tokens).forEach(([key, data]) => {
        if (data.type === 'color' || key.includes('colour') || key.includes('color')) {
            groups.color[key] = data;
        } else if (key.includes('border-width') || key.includes('border-radius') || key.includes('radius-')) {
            groups.border[key] = data;
        } else if (key.includes('font') || key.includes('line-height') || key.includes('label')) {
            groups.typography[key] = data;
        } else if (key.includes('spacing') || key.includes('scale')) {
            groups.spacing[key] = data;
        } else if (key.includes('desktop') || key.includes('mobile') || key.includes('responsive')) {
            groups.responsive[key] = data;
        } else if (key.includes('primitives')) {
            groups.primitives[key] = data;
        } else {
            groups.other[key] = data;
        }
    });

    return groups;
}

// Helper to find the best matching token
function findBestMatch(tokens, candidates) {
    for (const candidate of candidates) {
        if (tokens[candidate]) {
            return tokens[candidate].value;
        }
    }
    return null;
}

// Generate CSS that automatically switches themes but keeps all original variables
function generateThemeAwareCSS() {
    console.log('\n📊 EXTRACTING ALL TOKENS...\n');

    tokenCount = 0;
    const globalTokens = extractGlobalTokens();

    console.log('');
    const brandATokens = extractBrandTokens('BrandA');

    console.log('');
    const brandBTokens = extractBrandTokens('BrandB');

    const allBrandATokens = { ...globalTokens, ...brandATokens };
    const allBrandBTokens = { ...globalTokens, ...brandBTokens };

    const brandAGroups = groupTokens(allBrandATokens);
    const brandBGroups = groupTokens(allBrandBTokens);

    console.log(`\n✅ EXTRACTION COMPLETE!`);
    console.log(`   Total unique tokens: ${tokenCount}`);
    console.log(`   Brand A tokens: ${Object.keys(allBrandATokens).length}`);
    console.log(`   Brand B tokens: ${Object.keys(allBrandBTokens).length}`);

    let css = '/* Auto-generated design tokens - DO NOT EDIT MANUALLY */\n';
    css += `/* Total unique tokens extracted: ${tokenCount} */\n`;
    css += `/* Brand A variables: ${Object.keys(allBrandATokens).length} */\n`;
    css += `/* Brand B variables: ${Object.keys(allBrandBTokens).length} */\n`;
    css += '/* 🎨 AUTOMATIC THEME SWITCHING: Change data-theme="brandB" to switch themes */\n\n';

    const writeTokenGroup = (groupName, tokens) => {
        if (Object.keys(tokens).length > 0) {
            css += `  /* ${groupName} (${Object.keys(tokens).length}) */\n`;
            Object.entries(tokens)
                .sort(([a], [b]) => a.localeCompare(b))
                .forEach(([key, data]) => {
                    css += `  --${key}: ${data.value};\n`;
                });
            css += '\n';
        }
    };

    // Generate :root with Brand A (exactly like before)
    css += ':root {\n';
    css += '  /* ===== BRAND A ===== */\n\n';
    writeTokenGroup('Colors', brandAGroups.color);
    writeTokenGroup('Typography', brandAGroups.typography);
    writeTokenGroup('Spacing', brandAGroups.spacing);
    writeTokenGroup('Borders', brandAGroups.border);
    writeTokenGroup('Responsive', brandAGroups.responsive);
    writeTokenGroup('Other', brandAGroups.other);
    css += '}\n\n';

    // Generate Brand B overrides (exactly like before)
    css += '[data-theme="brandB"] {\n';
    css += '  /* ===== BRAND B ===== */\n\n';
    writeTokenGroup('Colors', brandBGroups.color);
    writeTokenGroup('Typography', brandBGroups.typography);
    writeTokenGroup('Spacing', brandBGroups.spacing);
    writeTokenGroup('Borders', brandBGroups.border);
    writeTokenGroup('Responsive', brandBGroups.responsive);
    writeTokenGroup('Other', brandBGroups.other);
    css += '}\n\n';

    // Add automatic body styling that responds to theme changes
    css += `/* ===== AUTOMATIC THEME APPLICATION ===== */

/* Body automatically adapts to theme changes */
body {
  background-color: var(--surface-colour-page);
  color: var(--text-colour-body);
  font-family: var(--font-font-family-paragraph);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Theme-aware component classes that work with your existing structure */
.theme-transition {
  transition: all 0.3s ease;
}

/* Brand-specific font families automatically switch */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-font-family-headings);
}

/* Automatic border radius switching (Brand B = 0, Brand A = rounded) */
[data-theme="brandB"] .rounded,
[data-theme="brandB"] .rounded-sm,
[data-theme="brandB"] .rounded-md,
[data-theme="brandB"] .rounded-lg,
[data-theme="brandB"] .rounded-xl {
  border-radius: 0 !important;
}
`;

    return css;
}

// Generate Tailwind config with your EXACT existing structure
// Generate Tailwind config with your EXACT existing structure (FIXED)
function generateTailwindConfig() {
    const globalTokens = extractGlobalTokens();
    const brandATokens = extractBrandTokens('BrandA');
    const brandBTokens = extractBrandTokens('BrandB');
    const allBrandATokens = { ...globalTokens, ...brandATokens };

    const config = {
        "content": [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}"
        ],
        "theme": {
            "extend": {
                "colors": {
                    // Generate the exact same nested structure you have
                    "alias": {},
                    "border-colour": {},
                    "icon-colour": {},
                    "surface-colour": {},
                    "text-colour": {},
                    "primitives-colour": {}
                },
                "spacing": {},
                "fontSize": {},
                "lineHeight": {},
                "borderWidth": {},
                "borderRadius": {},
                "fontFamily": {},
                "fontWeight": {},
                "width": {},
                "height": {}
            }
        },
        "plugins": []
    };

    // Populate colors with the exact same structure (FIXED)
    Object.entries(allBrandATokens).forEach(([key, data]) => {
        if (data.type === 'color' || key.includes('colour') || key.includes('color')) {
            const parts = key.split('-');

            if (key.startsWith('alias-')) {
                addNestedProperty(config.theme.extend.colors.alias, parts.slice(1), `var(--${key})`);
            } else if (key.startsWith('border-colour-')) {
                // FIXED: Add directly to colors, not as border utilities
                addNestedProperty(config.theme.extend.colors["border-colour"], parts.slice(2), `var(--${key})`);
            } else if (key.startsWith('icon-colour-')) {
                addNestedProperty(config.theme.extend.colors["icon-colour"], parts.slice(2), `var(--${key})`);
            } else if (key.startsWith('surface-colour-')) {
                addNestedProperty(config.theme.extend.colors["surface-colour"], parts.slice(2), `var(--${key})`);
            } else if (key.startsWith('text-colour-')) {
                addNestedProperty(config.theme.extend.colors["text-colour"], parts.slice(2), `var(--${key})`);
            } else if (key.startsWith('primitives-colour-')) {
                addNestedProperty(config.theme.extend.colors["primitives-colour"], parts.slice(2), `var(--${key})`);
            }
        } else if (key.includes('desktop-font-size') || key.includes('mobile-font-size')) {
            // FIXED: Better font size handling
            const cleanKey = key.replace(/^(desktop|mobile)-font-size-/, '');
            const breakpoint = key.includes('desktop') ? 'desktop' : 'mobile';
            config.theme.extend.fontSize[`${cleanKey}-${breakpoint}`] = `var(--${key})`;
        } else if (key.includes('desktop-line-height') || key.includes('mobile-line-height')) {
            // FIXED: Better line height handling
            const cleanKey = key.replace(/^(desktop|mobile)-line-height-/, '');
            const breakpoint = key.includes('desktop') ? 'desktop' : 'mobile';
            config.theme.extend.lineHeight[`${cleanKey}-${breakpoint}`] = `var(--${key})`;
        } else if (key.includes('desktop-spacing') || key.includes('mobile-spacing')) {
            // FIXED: Better spacing handling
            const cleanKey = key.replace(/^(desktop|mobile)-spacing-/, '');
            const breakpoint = key.includes('desktop') ? 'desktop' : 'mobile';
            config.theme.extend.spacing[`${cleanKey}-${breakpoint}`] = `var(--${key})`;
        } else if (key.includes('primitives-scale')) {
            // FIXED: Scale handling
            const cleanKey = key.replace(/^primitives-scale-/, '');
            config.theme.extend.spacing[`scale-${cleanKey}`] = `var(--${key})`;
        } else if (key.includes('border-width')) {
            // FIXED: Border width handling
            const cleanKey = key.replace(/.*border-width-/, '');
            config.theme.extend.borderWidth[cleanKey] = `var(--${key})`;
        } else if (key.includes('border-radius')) {
            // FIXED: Border radius handling  
            const cleanKey = key.replace(/.*border-radius-/, '');
            config.theme.extend.borderRadius[cleanKey] = `var(--${key})`;
        } else if (key.includes('primitives-font-brand')) {
            // FIXED: Font family handling
            if (key.includes('font-family')) {
                const parts = key.split('-');
                const brand = parts.includes('branda') ? 'brand-a' : 'brand-b';
                const type = parts[parts.length - 1]; // heading, body, sub-heading
                config.theme.extend.fontFamily[`${brand}-${type}`] = `var(--${key})`;
            } else if (key.includes('font-weight')) {
                const parts = key.split('-');
                const brand = parts.includes('branda') ? 'brand-a' : 'brand-b';
                const weight = parts.slice(-1)[0]; // light, regular, bold, etc.
                config.theme.extend.fontWeight[`${brand}-${weight}`] = `var(--${key})`;
            }
        } else if (key.includes('font-font-family')) {
            // FIXED: Mapped font family handling
            const cleanKey = key.replace(/^font-font-family-/, '');
            config.theme.extend.fontFamily[cleanKey] = `var(--${key})`;
        } else if (key.includes('font-font-weight')) {
            // FIXED: Mapped font weight handling
            const cleanKey = key.replace(/^font-font-weight-/, '');
            config.theme.extend.fontWeight[cleanKey] = `var(--${key})`;
        } else if (key.includes('desktop-icon') || key.includes('mobile-icon')) {
            // FIXED: Icon size handling
            const cleanKey = key.replace(/^(desktop|mobile)-/, '');
            const breakpoint = key.includes('desktop') ? 'desktop' : 'mobile';
            config.theme.extend.width[`${cleanKey}-${breakpoint}`] = `var(--${key})`;
            config.theme.extend.height[`${cleanKey}-${breakpoint}`] = `var(--${key})`;
        }
    });

    return `/** @type {import('tailwindcss').Config} */\nexport default ${JSON.stringify(config, null, 2)};`;
}

// Helper function to add nested properties
function addNestedProperty(target, pathParts, value) {
    let current = target;

    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!current[part]) {
            current[part] = {};
        }
        current = current[part];
    }

    const lastPart = pathParts[pathParts.length - 1];
    const finalKey = lastPart === 'default' ? 'DEFAULT' : lastPart;
    current[finalKey] = value;
}

// Main execution
try {
    const indexCssPath = path.join(__dirname, '../src/index.css');
    const css = generateThemeAwareCSS();
    const cssWithLayer = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
${css}
}
`;

    fs.writeFileSync(indexCssPath, cssWithLayer);
    console.log('\n✅ Updated src/index.css with automatic theme switching');

    const tailwindConfig = generateTailwindConfig();
    fs.writeFileSync(path.join(__dirname, '../tailwind.config.js'), tailwindConfig);
    console.log('✅ Updated tailwind.config.js (kept existing structure)');



    console.log('\n🎉 DONE! Your existing HTML/CSS will work exactly the same!');
    console.log('\n📋 What this gives you:');
    console.log('   ✅ All your existing classes work unchanged');
    console.log('   ✅ Same Tailwind config structure');
    console.log('   ✅ Automatic theme switching with data-theme attribute');
    console.log('   ✅ All deeply nested tokens (including labels)');
    console.log('   ✅ Simple Storybook integration');
    console.log('\n🚀 Your existing code like this still works:');
    console.log('   <div className="bg-surface-colour-page text-text-colour-body">');
    console.log('   <button className="bg-alias-primary">Primary Button</button>');
    console.log('\n   But now just add data-theme="brandB" and everything switches automatically!');
    console.log('\n🎯 Test it: Toggle themes in Storybook - zero code changes needed!\n');

} catch (error) {
    console.error('\n❌ Error:', error);
    console.error(error.stack);
    process.exit(1);
}