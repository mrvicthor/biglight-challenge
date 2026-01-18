import { h } from "preact";
import type { Meta, StoryObj } from '@storybook/preact'
import ContactCard from './card'

const meta: Meta<typeof ContactCard> = {
    title: 'Components/ContactCard',
    component: ContactCard,
    args: {
        size: 'mobile',
    },
    argTypes: {
        size: {
            control: "radio",
            options: ["mobile", "desktop"],
            description: "Size variant of the contact card",
            table: {
                defaultValue: { summary: "mobile" },
            },
        },
    },
    parameters: {
        layout: 'centered'
    }
}

export default meta

type Story = StoryObj<typeof ContactCard>

export const Mobile: Story = {
    args: {
        size: 'mobile'
    }
}

export const Desktop: Story = {
    args: {
        size: "desktop"
    }
}


