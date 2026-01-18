import { h } from 'preact';
import '../src/index.css'
import type { Preview } from '@storybook/preact'


const preview: Preview = {
  parameters: {
    actions:{ argTypesRegex: '^on.*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

     backgrounds: {
      default: "brandA",
      values: [
        { name: "brandA", value: "#faf9f5" }, // Paper.1000 from your tokens
        { name: "brandB", value: "#f5f5f5" }, // Grey.100 from your tokens
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'brandA',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'brandA', title: 'Brand A', icon: 'circlehollow' },
          { value: 'brandB', title: 'Brand B', icon: 'circle' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // Apply theme to document root for CSS variables to cascade properly
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute(
          "data-theme",
          theme === "brandB" ? "brandB" : "brandA"
        );
      }

      return h(
        "div",
        {
          "data-theme": theme === "brandB" ? "brandB" : "brandA",
          class: "min-h-screen p-8 transition-colors duration-300",
        },
        h(Story, null)
      );
    },
  ],
};

export default preview;