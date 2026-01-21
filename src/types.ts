export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean
}

export type DropdownState = 'Default' | 'Focus' | 'Selected' | 'Disabled' | 'Opened'

export type InputState = 'Default' | 'Focus' | 'Filled' | 'Disabled' | 'Error' | 'Success';