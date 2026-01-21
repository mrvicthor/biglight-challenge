import type { Meta, StoryObj } from '@storybook/preact';
import { LoginForm } from './login';

const meta: Meta<typeof LoginForm> = {
    title: 'Components/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    render: () => <LoginForm />,
};
