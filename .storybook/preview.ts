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
          { value: 'brandA', title: 'Brand A'},
          { value: 'brandB', title: 'Brand B'},
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'brandA';

      return h(
        "div",
        {
          "data-theme": theme, // This is all you need for automatic switching!
          class: "min-h-screen p-8",
        },
        h(Story, null)
      );
    },
  ],
};

export default preview;