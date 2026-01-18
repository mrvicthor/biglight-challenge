import type { JSX } from 'preact'
import { ChevronLeft } from './chevronLeft';
import { ChevronRight } from './chevronRight';
export interface ButtonProps {
    variant: 'primary' | 'secondary' | 'tertiary';
    size: 'medium' | 'small';
    disabled?: boolean;
    children: JSX.Element | string;
    onClick?: (event: MouseEvent) => void
}
export function Button({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    children,
    onClick,
    ...props
}: ButtonProps) {
    const baseStyles =
        'px-4 flex items-center md: gap-2 justify-between rounded-round font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const disabledCommon =
        ' disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-surface-disabled-dark disabled:text-text-disabled';

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
        medium: 'w-[10.75rem] h-[3rem] text-body-md py-4',
        small: 'w-[9.5625rem] h-[2.4375rem] text-body-sm py-3',
    }

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary:
            'bg-surface-action-primary text-text-on-primary hover:opacity-90 active:opacity-80 hover:bg-surface-action-secondary hover:text-text-inverse',
        secondary:
            'bg-surface-action-secondary hover:bg-surface-action-primary text-text-on-secondary hover:opacity-90 active:opacity-80 hover:text-text-on-primary',
        tertiary:
            'bg-transparent text-text-body border-md border-border-primary hover:bg-surface-action-secondary active:bg-gray-100 hover:text-text-on-secondary',
    }

    const tertiaryDisabled =
        'disabled:text-text-disabled hover:text-text-on-secondary disabled:border-border-disabled disabled:bg-surface-secondary'

    const className = [
        baseStyles,
        sizes[size],
        variants[variant],
        disabledCommon,
        disabled && variant === 'tertiary' ? tertiaryDisabled : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (<button className={className} disabled={disabled} onClick={onClick} aria-disabled={disabled} {...props}><ChevronLeft />{children}<ChevronRight /></button>)
}

