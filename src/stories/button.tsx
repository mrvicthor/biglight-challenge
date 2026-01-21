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
        'px-4 flex items-center gap-2 justify-between rounded-round font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const disabledCommon =
        'disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-surface-colour-disabled-dark disabled:text-text-colour-action-disabled';

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
        medium: 'w-[10.75rem] h-[3rem] text-body-md py-4',
        small: 'w-[9.5625rem] h-[2.4375rem] text-body-sm py-3',
    }

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary:
            'bg-surface-colour-action-primary text-text-colour-action-onprimary hover:opacity-90 active:opacity-80 hover:bg-surface-colour-action-secondary hover:text-text-colour-action-inverse',
        secondary:
            'bg-surface-colour-action-secondary hover:bg-surface-colour-action-primary text-text-colour-action-onsecondary hover:opacity-90 active:opacity-80 hover:text-text-colour-action-onprimary',
        tertiary:
            'bg-surface-colour-action-inverse text-text-action-on-tertiary border-md border-border-colour-primary hover:bg-surface-colour-action-secondary active:bg-gray-100 hover:text-text-colour-action-inverse',
    }

    const tertiaryDisabled =
        'disabled:text-text-colour-disabled disabled:border-border-colour-disabled disabled:bg-surface-colour-action-inverse'

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

