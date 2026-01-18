
import { useState } from "preact/hooks";
import type { Meta, StoryObj } from "@storybook/preact";
import { Dropdown, type DropdownOption } from "./dropdown";

const sampleOptions: DropdownOption[] = [
    { value: "retail", label: "Retail Store Owner" },
    { value: "convenience", label: "Convenience Shop" },
    { value: "hospitality", label: "Hospitality" },
    { value: "catering", label: "Catering & Events" },
    { value: "online", label: "Online/Delivery Only" },
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
            options: ["default", "focus", "selected", "disabled", "opened"],
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

// Default State
export const Default: Story = {
    args: {
        id: "dropdown-default",
        state: "default",
    },
};

// Focus State
export const Focus: Story = {
    args: {
        id: "dropdown-focus",
        state: "focus",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown when it receives keyboard focus.",
            },
        },
    },
};

// Selected State
export const Selected: Story = {
    args: {
        id: "dropdown-selected",
        state: "selected",
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

// Disabled State
export const Disabled: Story = {
    args: {
        id: "dropdown-disabled",
        state: "disabled",
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

// Opened State
export const Opened: Story = {
    args: {
        id: "dropdown-opened",
        state: "opened",
    },
    parameters: {
        docs: {
            description: {
                story: "The dropdown with the options menu open.",
            },
        },
    },
};

// With Disabled Options
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

// Without Icon
export const WithoutIcon: Story = {
    args: {
        id: "dropdown-no-icon",
        showIcon: false,
    },
    parameters: {
        docs: {
            description: {
                story: "Dropdown without the leading clock icon.",
            },
        },
    },
};

// Required Field
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

// With Error
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

// Interactive Example
export const Interactive: Story = {
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(undefined);

        return (
            <div class="space-y-4">
                <Dropdown
                    {...args}
                    label="label"
                    options={sampleOptions}
                    id="dropdown-interactive"
                    value={value}
                    onValueChange={setValue}
                    state="Default"
                />
                <p class="text-sm text-gray-600">
                    Selected value: <code class="bg-gray-100 px-2 py-1 rounded">{value || "none"}</code>
                </p>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "An interactive example showing the dropdown in action.",
            },
        },
    },
};

// All States Overview
export const AllStates: Story = {
    render: () => (
        <div class="grid grid-cols-2 gap-8 p-4">
            <div class="space-y-2">
                <p class="text-sm font-medium text-gray-600">Default</p>
                <Dropdown
                    id="dropdown-all-default"
                    label="Label"
                    options={sampleOptions}
                    helperText="required"
                    state="Default"
                />
            </div>

            <div class="space-y-2">
                <p class="text-sm font-medium text-gray-600">Focus</p>
                <Dropdown
                    id="dropdown-all-focus"
                    label="Label"
                    options={sampleOptions}
                    state="Focus"
                    helperText="required"
                />
            </div>

            <div class="space-y-2">
                <p class="text-sm font-medium text-gray-600">Selected</p>
                <Dropdown
                    id="dropdown-all-selected"
                    label="Label"
                    options={sampleOptions}
                    value="retail"
                    helperText="required"
                    state="Selected"
                />
            </div>

            <div class="space-y-2">
                <p class="text-sm font-medium text-gray-600">Disabled</p>
                <Dropdown
                    id="dropdown-all-disabled"
                    label="Label"
                    options={sampleOptions}
                    value="retail"
                    state="Disabled"
                    helperText="required"
                />
            </div>

            <div class="space-y-2 col-span-2">
                <p class="text-sm font-medium text-gray-600">Opened</p>
                <Dropdown
                    id="dropdown-all-opened"
                    label="Label"
                    options={sampleOptions}
                    state="Opened"
                    helperText="required"
                />
            </div>
        </div>
    ),
    parameters: {
        layout: "padded",
        docs: {
            description: {
                story: "Overview of all dropdown states side by side.",
            },
        },
    },
};