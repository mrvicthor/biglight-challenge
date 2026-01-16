const fs = require('fs');
const path = require('path');

console.log('🔄 Generating design tokens...\n');

const tokensPath = path.join(__dirname, '../figma-tokens.json')

if (!fs.existsSync(tokensPath)) {
    console.error('❌ Error: tokens/figma-tokens.json not found!');
    console.log('📝 Please save your JSON file to: tokens/figma-tokens.json');
    process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))

function resolveToken(value, tokens) {
    if (typeof value !== 'string') return value
    const match = value.match(/^\{(.+)\}$/)
    if (!match) return value

    const parts = match[1].split('.')
    let current = tokens
    for (const part of parts) {
        if (!current[part]) return value
        current = current[part]
    }

    if (current && current.value !== undefined) {
        return resolveToken(current.value, tokens)
    }

    return current
}

function generateCSS() {
    const primitives = tokens['Primitive/Default'];
    const brandA = tokens['Mapped/BrandA']
    const brandB = tokens['Mapped/BrandB']
    const aliasA = tokens['Alias colours/BrandA']
    const aliasB = tokens['Alias colours/BrandB']

    let css = '/* Auto-generated design tokens - DO NOT EDIT MANUALLY */\n\n';

    // Brand A (default)
    css += ':root {\n';
    css += ' /* Brand Colors */\n';

    if (aliasA?.Primary) {
        Object.entries(aliasA.Primary).forEach(([key, val]) => {
            if (val.value) {
                const resolved = resolveToken(val.value, tokens);
                css += `  --color-primary-${key.toLowerCase()}: ${resolved};\n`;
            }
        })
    }

    if (brandA?.Surface?.Colour) {
        css += '\n /* Surface Colors */\n';
        const surface = brandA.Surface.Colour;
        if (surface.Page) css += `  --color-surface-page: ${resolveToken(surface.Page.value, tokens)};\n`;
        if (surface.Secondary) css += `  --color-surface-secondary: ${resolveToken(surface.Secondary.value, tokens)};\n`;
        if (surface.Action?.Primary) css += `  --color-surface-action-primary: ${resolveToken(surface.Action.Primary.value, tokens)};\n`;
        if (surface.Action?.Secondary) css += `  --color-surface-action-primary: ${resolveToken(surface.Action.Secondary.value, tokens)};\n`;
        if (surface.Action?.Inverse) css += `  --color-surface-action-inverse: ${resolveToken(surface.Action.Inverse.value, tokens)};\n`;
    }

    // Text colors
    if (brandA?.Text?.Colour) {
        css += `\n  /* Text Colors */\n`;
        const text = brandA.Text.Colour;
        if (text.Headings) css += `  --color-text-headings: ${resolveToken(text.Headings.value, tokens)};\n`;
        if (text.Body) css += `  --color-text-body: ${resolveToken(text.Body.value, tokens)};\n`;
        if (text.Error) css += `  --color-text-error: ${resolveToken(text.Error.value, tokens)};\n`;
        if (text.Success) css += `  --color-text-success: ${resolveToken(text.Success.value, tokens)};\n`;
        if (text.Disabled) css += `  --color-text-disabled: ${resolveToken(text.Disabled.value, tokens)};\n`;
        if (text.Action?.OnPrimary) css += `  --color-text-on-primary: ${resolveToken(text.Action.OnPrimary.value, tokens)};\n`;
        if (text.Action?.OnSecondary) css += `  --color-text-on-secondary: ${resolveToken(text.Action.OnSecondary.value, tokens)};\n`;
        if (text.Action?.Inverse) css += `  --color-text-inverse: ${resolveToken(text.Action.Inverse.value, tokens)};\n`;
    }

    // Border colors
    if (brandA?.Border?.Colour) {
        css += '\n  /* Border Colors */\n';
        const border = brandA.Border.Colour;
        if (border.Primary) css += `  --color-border-primary: ${resolveToken(border.Primary.value, tokens)};\n`;
        if (border.Error) css += `  --color-border-error: ${resolveToken(border.Error.value, tokens)};\n`;
        if (border.Disabled) css += `  --color-border-disabled: ${resolveToken(border.Disabled.value, tokens)};\n`;
    }

    css += '}\n\n';

    // Brand B
    css += '[data-theme="brandB"] {\n';
    css += '  /* Brand B Colors */\n';

    if (aliasB?.Primary) {
        Object.entries(aliasB.Primary).forEach(([key, val]) => {
            if (val.value) {
                const resolved = resolveToken(val.value, tokens);
                css += `  --color-primary-${key.toLowerCase()}: ${resolved};\n`;
            }
        });
    }

    if (brandB?.Surface?.Colour) {
        const surface = brandB.Surface.Colour;
        if (surface.Page) css += `  --color-surface-page: ${resolveToken(surface.Page.value, tokens)};\n`;
        if (surface.Action?.Primary) css += `  --color-surface-action-primary: ${resolveToken(surface.Action.Primary.value, tokens)};\n`;
        if (surface.Action?.Secondary) css += `  --color-surface-action-secondary: ${resolveToken(surface.Action.Secondary.value, tokens)};\n`;
    }

    css += '}\n';

    return css;

}

try {

} catch (error) {
    try {
        // Create directories
        const stylesDir = path.join(__dirname, '../src/styles');
        if (!fs.existsSync(stylesDir)) {
            fs.mkdirSync(stylesDir, { recursive: true });
        }

        // Write CSS
        const cssPath = path.join(stylesDir, 'tokens.css');
        fs.writeFileSync(cssPath, generateCSS());
        console.log('✅ Generated src/styles/tokens.css');

        console.log('\n🎉 Token generation complete!\n');
        console.log('Next steps:');
        console.log('1. Import tokens.css in your src/main.jsx');
        console.log('2. Run: npm run dev');

    } catch (error) {
        console.error('❌ Error generating tokens:', error.message);
        process.exit(1);
    }
}