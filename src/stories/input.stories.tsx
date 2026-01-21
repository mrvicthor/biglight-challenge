
import type { Meta, StoryObj } from '@storybook/preact';
import { userEvent, within, expect } from '@storybook/test';
import { Input } from './input';
import { useState } from 'preact/hooks';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
        },
        error: {
            control: 'text',
        },
        onChange: {
            control: false,
        },
        className: {
            control: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

function ControlledTemplate(args: any) {
    const [value, setValue] = useState(args.value ?? '');
    return <Input {...args} helperId='test-form' value={value} onChange={setValue} />;
}

// Default
export const Default: Story = {
    render: ControlledTemplate,
    args: {
        label: 'Input label',
        required: true,
        placeholder: '',
        value: '',
    },

    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByLabelText(/input label/i)).toBeVisible();
    },
};

// Focus
export const Focus: Story = {
    render: ControlledTemplate,
    args: {
        label: 'Input label',
        required: true,
        placeholder: '',
        value: '',
    },
    parameters: {
        pseudo: { focusVisible: true },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox') as HTMLInputElement;
        await userEvent.tab();
        await expect(input).toHaveFocus();
    },
};

// Filled
export const Filled: Story = {
    render: ControlledTemplate,
    args: {
        label: 'Label',
        required: true,
        placeholder: 'Placeholder',
        value: 'Placeholder',

    },
};

// Disabled
export const Disabled: Story = {
    render: (args) => <Input helperId='test-form' {...args} />,
    args: {
        label: 'Label',
        required: true,
        placeholder: 'Placeholder',
        value: '',
        disabled: true,

    },
};

// Error
export const Error: Story = {
    render: ControlledTemplate,
    args: {
        label: 'Label',
        required: true,
        placeholder: 'Placeholder',
        value: '',
        error: 'required',
    },
};

// Success
export const Success: Story = {
    render: ControlledTemplate,
    args: {
        label: 'Label',
        required: true,
        placeholder: 'Placeholder',
        value: '',
        success: true,
    },
};