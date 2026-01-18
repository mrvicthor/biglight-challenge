import type { Meta, StoryObj } from '@storybook/preact';
import { Button, type ButtonProps } from './button';

const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary'],
            description: 'Button variant',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        children: {
            control: 'text',
            description: 'Button content',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler',
        },
    },
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Primary Button
export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button label',
    },
};

// Secondary Button
export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button label',
    },
};

// Tertiary Button
export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        children: 'Tertiary Button',
    },
};

// Disabled States
export const PrimaryDisabled: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Disabled',
        disabled: true,
    },
};

export const SecondaryDisabled: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary Disabled',
        disabled: true,
    },
};

export const TertiaryDisabled: Story = {
    args: {
        variant: 'tertiary',
        children: 'Tertiary Disabled',
        disabled: true,
    },
};

// All Variants Overview
export const AllVariants: Story = {
    render: () => (
        <div className="space-y-8 p-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-text-heading">Default States</h3>
                <div className="flex gap-4 flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 text-text-heading">Disabled States</h3>
                <div className="flex gap-4 flex-wrap">
                    <Button variant="primary" disabled>Primary</Button>
                    <Button variant="secondary" disabled>Secondary</Button>
                    <Button variant="tertiary" disabled>Tertiary</Button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 text-text-heading">Different Sizes</h3>
                <div className="flex gap-4 flex-wrap items-center">
                    <Button variant="primary">Regular Button</Button>
                    <Button variant="primary">Long Text Button Example</Button>
                    <Button variant="primary">Short</Button>
                </div>
            </div>
        </div>
    ),
};

// Interactive Example
export const Interactive: Story = {
    render: () => {
        const handleClick = () => {
            alert('Button clicked!');
        };

        return (
            <div className="space-y-4 p-8">
                <h3 className="text-lg font-semibold mb-4 text-text-heading">Click to Test</h3>
                <div className="flex gap-4">
                    <Button variant="primary" onClick={handleClick}>
                        Click Me
                    </Button>
                    <Button variant="secondary" onClick={handleClick}>
                        Or Click Me
                    </Button>
                    <Button variant="tertiary" onClick={handleClick}>
                        Maybe Me?
                    </Button>
                </div>
            </div>
        );
    },
};

// Theme Comparison
export const ThemeComparison: Story = {
    render: () => (
        <div className="space-y-8 p-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">Brand A (Default)</h3>
                <div className="flex gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                </div>
            </div>

            <div data-theme="brandB">
                <h3 className="text-lg font-semibold mb-4">Brand B</h3>
                <div className="flex gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                </div>
            </div>
        </div>
    ),
};

// Accessibility Test
export const AccessibilityTest: Story = {
    render: () => (
        <div className="space-y-6 p-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-text-heading">
                    Keyboard Navigation Test
                </h3>
                <p className="text-sm text-text-body mb-4">
                    Try tabbing through these buttons with your keyboard:
                </p>
                <div className="flex gap-4 flex-wrap">
                    <Button variant="primary">First</Button>
                    <Button variant="secondary">Second</Button>
                    <Button variant="tertiary">Third</Button>
                    <Button variant="primary" disabled>Disabled (Skipped)</Button>
                    <Button variant="primary">Fourth</Button>
                </div>
            </div>
        </div>
    ),
};