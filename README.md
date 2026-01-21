# Biglight Component Design

A component library built with Preact, Storybook, and Tailwind CSS, featuring automatic theme switching between Brand A and Brand B.

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd biglight-challenge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Generate design tokens** (if needed):
   ```bash
   npm run tokens
   ```
   This command generates CSS variables and Tailwind configuration from the Figma design tokens.

That's it! You're ready to start developing.

## Running Storybook Locally

To view and interact with the component library in Storybook:

```bash
npm run storybook
```

This will:
- Start the Storybook development server
- Open your browser to `http://localhost:6006`
- Enable hot module replacement for instant updates

### Other Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the project for production
- `npm run build-storybook` - Build a static Storybook site
- `npm run preview` - Preview the production build

## How to Switch Between Themes

The component library supports two themes: **Brand A** (default) and **Brand B**.

### In Storybook

1. Open Storybook in your browser (`http://localhost:6006`)
2. Look for the **Theme** toolbar button (paintbrush icon) at the top of the Storybook interface
3. Click the dropdown to switch between:
   - **Brand A** - Orange primary color (#fc4c02)
   - **Brand B** - Cherry/burgundy primary color (#901438)

The theme switch applies automatically to all components in the viewport.

### In Your Code

To switch themes programmatically in your application, use the `data-theme` attribute:

```tsx
// Brand A (default)
<div>
  <Button>Click me</Button>
</div>

// Brand B
<div data-theme="brandB">
  <Button>Click me</Button>
</div>
```

The theme system uses CSS custom properties that automatically switch based on the `data-theme` attribute. All components will adapt their colors, fonts, and border radius accordingly.

**Note**: Brand B uses square corners (no border radius), while Brand A uses rounded corners.

## Approximate Time Spent

<!-- TODO: Add your approximate time spent on this project -->

## Project Structure

- `src/stories/` - Component implementations and Storybook stories
- `src/hooks/` - Custom React/Preact hooks
- `src/styles/` - Design tokens and styling configuration
- `scripts/` - Build scripts for generating tokens
- `.storybook/` - Storybook configuration

## Technologies Used

- **Preact** - Lightweight React alternative
- **Storybook** - Component development environment
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **TypeScript** - Type-safe JavaScript

## Task 2

### 1) How do the design tokens (from the JSON) get into your code?

Design tokens live in a JSON file and are converted into CSS variables via a script. The script generates a stylesheet (tokens → :root + theme scopes) that my components consume through Tailwind classes mapped to those CSS variables (e.g. bg-surface-colour-action-primary → var(--surface-colour-action-primary)).

### 2) How do you handle multiple themes (Brand A vs Brand B)?

I handle Brand A vs Brand B using a Storybook decorator that switches a theme attribute (e.g. data-theme="brandB") on a wrapper element. Because the tokens are expressed as CSS variables, switching the attribute swaps the variable values and the UI updates without changing component code.

### 3) If the tokens in the JSON change, what happens in your code?

If tokens change (renamed, removed, or structure changes), it can break styling because the generated CSS variable names may no longer match what Tailwind classes expect. To reduce this risk, I can:

validate the token JSON with a strict schema/type (TypeScript types + runtime validation with something like Zod),

fail the build if required tokens are missing,

and optionally generate a “token map” or types from the JSON so usage stays in sync.

### 4) How maintainable and automated is your approach?

Right now it’s semi-manual because a script needs to be run to regenerate the CSS variables. It’s maintainable, but can be improved by automating token generation and validation in CI (e.g. GitHub Actions):

run the token build script on PRs,

run schema validation,

and block merges if generated files are out of date or tokens are missing.


