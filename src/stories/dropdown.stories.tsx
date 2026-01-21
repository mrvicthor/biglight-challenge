

import type { Meta, StoryObj } from "@storybook/preact";
import { Dropdown } from "./dropdown";
import type { DropdownOption } from "../types";

const sampleOptions: DropdownOption[] = [
    { value: "retail", label: "Retail Store Owner" },
    { value: "convenience", label: "Convenience Shop" },
    { value: "hospitality", label: "Hospitality" },
    { value: "catering", label: "Catering & Events" },
    { value: "online", label: "Online/Delivery Only" },
    { value: "offline", label: "Pickup" },
];

const optionsWithDisabled: DropdownOption[] = [
    { value: "retail", label: "Retail Store Owner" },
    { value: "convenience", label: "Convenience Shop", disabled: true },
    { value: "hospitality", label: "Hospitality" },
    { value: "catering", label: "Catering & Events", disabled: true },
    { value: "online", label: "Online/Delivery Only" },
];

const meta: Meta<typeof Dropdown> = {
    title: "Components/Dropdown",
    component: Dropdown,
    args: {
        id: "dropdown-example",
        label: "Label",
        helperText: "required",
        options: sampleOptions,
        showIcon: true,
        placeholder: "Select an option",
    },
    argTypes: {
        state: {
            control: "select",
            options: ["Default", "Focus", "Selected", "Disabled", "Opened"],
            description: "Visual state of the dropdown",
        },
        value: {
            control: "select",
            options: [undefined, ...sampleOptions.map((o) => o.value)],
            description: "Currently selected value",
        },
        disabled: {
            control: "boolean",
            description: "Whether the dropdown is disabled",
        },
        showIcon: {
            control: "boolean",
            description: "Whether to show the leading icon",
        },
        required: {
            control: "boolean",
            description: "Whether the field is required",
        },
    },
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
An accessible dropdown component with full keyboard navigation support.

## Accessibility Features
- Full keyboard navigation (Arrow keys, Home, End, Enter, Space, Escape)
- Type-ahead search (press a letter to jump to matching option)
- ARIA attributes for screen readers
- Focus management
- Disabled state support for individual options

## Keyboard Shortcuts
- **Enter / Space / ArrowDown**: Open dropdown
- **ArrowUp / ArrowDown**: Navigate options
- **Home / End**: Jump to first/last option
- **Enter / Space**: Select option
- **Escape**: Close dropdown
- **Type a letter**: Jump to option starting with that letter
        `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;


export const Default: Story = {
    args: {
        id: "dropdown-default",
        state: "Default",
    },
};


export const Focus: Story = {
    args: {
        id: "dropdown-focus",
        state: "Focus",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown when it receives keyboard focus.",
            },
        },
    },
};


export const Selected: Story = {
    args: {
        id: "dropdown-selected",
        state: "Selected",
        value: "retail",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown with a value selected.",
            },
        },
    },
};


export const Disabled: Story = {
    args: {
        id: "dropdown-disabled",
        state: "Disabled",
        value: "retail",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown in a disabled state. Cannot be interacted with.",
            },
        },
    },
};


export const Opened: Story = {
    args: {
        id: "dropdown-opened",
        state: "Opened",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown with the options menu open.",
            },
        },
    },
};


export const WithDisabledOptions: Story = {
    args: {
        id: "dropdown-disabled-options",
        options: optionsWithDisabled,
    },
    parameters: {
        docs: {
            description: {
                story: "Dropdown with some options disabled. Disabled options cannot be selected.",
            },
        },
    },
};


export const Required: Story = {
    args: {
        id: "dropdown-required",
        required: true,
        helperText: "This field is required",
    },
    parameters: {
        docs: {
            description: {
                story: "A required dropdown field with asterisk indicator.",
            },
        },
    },
};

export const WithError: Story = {
    args: {
        id: "dropdown-error",
        errorMessage: "Please select an option",
        required: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Dropdown showing an error message.",
            },
        },
    },
};

