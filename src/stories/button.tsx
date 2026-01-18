import type { JSX } from 'preact'
import { ChevronLeft } from './chevronLeft';
import { ChevronRight } from './chevronRight';
export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    children: JSX.Element | string;
    onClick?: (event: MouseEvent) => void
}
export function Button({
    variant = 'primary',
    disabled = false,
    children,
    onClick,
    ...props
}: ButtonProps) {
    const baseStyles =
        'px-4 flex items-center gap-2 justify-center rounded-[7.5rem] w-[10.75rem] h-[3rem] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const disabledCommon =
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-[var(--color-surface-disabled-dark)] disabled:text-[var(--color-text-on-primary)]';

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary:
            'bg-[var(--color-surface-action-primary)] text-[var(--color-text-on-primary)] hover:opacity-90 active:opacity-80 hover:bg-[var(--color-surface-action-secondary)] hover:text-[var(--color-text-on-secondary)]',
        secondary:
            'bg-[var(--color-surface-action-secondary)] hover:bg-[var(--color-surface-action-primary)] text-[var(--color-text-on-secondary)] hover:opacity-90 active:opacity-80 hover:text-[var(--color-text-on-primary)]',
        tertiary:
            'bg-transparent text-[var(--color-text-body)] border border-[var(--color-border-primary)] hover:bg-[var(--color-surface-action-secondary)] active:bg-gray-100 hover:text-[var(--color-text-on-secondary)]',
    }

    const tertiaryDisabled =
        'text-[var(--color-text-disabled)] hover:text-[var(--color-text-on-secondary)] border-[var(--color-border-disabled)]'

    const className = [
        baseStyles,
        variants[variant],
        disabledCommon,
        disabled && variant === 'tertiary' ? tertiaryDisabled : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (<button className={className} disabled={disabled} onClick={onClick} aria-disabled={disabled} {...props}><ChevronLeft />{children}<ChevronRight /></button>)
}

