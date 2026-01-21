import { useCallback, useEffect, useState } from 'preact/hooks';
import CloseIcon from './closeIcon';
import CheckIcon from './checkIcon';
import clsx from 'clsx';
import type { InputState } from '../types';



export interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    state?: InputState;
    error?: string;
    success?: boolean;
    helperId: string;
    name?: string
}

export function Input(props: InputProps) {
    const {
        label,
        placeholder = '',
        value = '',
        onChange,
        state: initialState,
        className = '',
        disabled = false,
        error,
        success = false,
        required = false,
        helperId,
        name
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [isDirty, setIsDirty] = useState(false);


    useEffect(() => {
        if (initialState === 'Focus') setIsFocused(true);
        if (initialState === 'Filled') setIsDirty(true);
    }, [initialState]);


    const handleFocus = useCallback((_e: FocusEvent) => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback((_e: FocusEvent) => {
        setIsFocused(false);
    }, []);

    const handleInput = useCallback((e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        const newValue = target.value;
        if (!isDirty && newValue.trim() !== '') {
            setIsDirty(true);
        }
        onChange?.(newValue);
    }, [onChange, isDirty]);

    const handleClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDirty(false);
        onChange?.('');
    }, [onChange]);


    const getVisualState = (): InputState => {
        if (disabled) return 'Disabled';
        if (error) return 'Error';
        if (success) return 'Success';
        if (isFocused) return 'Focus';
        if (isDirty || value.trim() !== '') return 'Filled';
        return 'Default';
    };

    const visualState = getVisualState();
    const shouldFloatLabel = !!label && (isDirty || isFocused || value.trim() !== '' || !!error || success);
    console.log({ shouldFloatLabel, visualState })

    const labelClasses = clsx(
        "absolute transition-all duration-200 pointer-events-none bg-surface-colour-secondary z-10",
        {
            "-top-2.5 text-sm  font-medium left-[0.5rem] px-1": shouldFloatLabel && visualState !== 'Disabled',
            "top-3.5 text-base text-text-colour-passive": !shouldFloatLabel && visualState !== 'Disabled',
            "bg-[linear-gradient(180deg,white_50%,#faf9f5_50%)]": visualState === 'Focus',
            "-top-2 text-xs font-medium left-[0.5rem] bg-transparent": shouldFloatLabel && visualState === 'Disabled',
            "-top-2.5 px-1 left-[0.4rem] bg-transparent text-text-colour-disabled": visualState === 'Disabled',
            "text-text-colour-error": visualState === 'Error',
            "left-3": visualState === 'Default'
        }
    );


    let inputClasses = clsx(
        'peer block w-full h-full pl-3 pr-6 py-2.5 text-sm rounded-md transition-colors duration-200 ease-in-out outline-none',
        className,
        {
            'bg-surface-colour-disabled-dark placeholder-text-text-colour-disabled cursor-not-allowed': disabled,
            'border-alias-error-dark border-lg bg-surface-colour-secondary text-alias-error-dark placeholder-[#9e1f28] ': error && !disabled,
            'bg-surface-colour-secondary text-text-colour-body placeholder-text-colour-body border-colour-secondary border-md': success && !error && !disabled,
            'border-border-colour-passive border-xs': isFocused,
            "bg-surface-colour-page border-border-colour-secondary": visualState === 'Filled',
            'border-border-colour-passive border-md placeholder-gray-400': !disabled && !error && !success && !isFocused,
        }
    );

    return (
        <div className="space-y-1">
            <div className="relative h-[3.25rem] w-[17rem]">
                {label && <label className={labelClasses} for={helperId || name || 'input-default'}>{label}</label>}
                <input
                    className={inputClasses}
                    placeholder={placeholder}
                    value={value}
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    spellcheck={false}
                    autocomplete="off"
                    name={helperId || name}
                    id={helperId}
                />

                {success ? (
                    <CheckIcon className="absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#28A745]" />
                ) : (
                    <button
                        type="button"
                        className={`absolute right-3 top-1/2 w-4 h-4 -translate-y-1/2 p-0 border-0 bg-transparent rounded hover:opacity-100 transition-all duration-200 ${visualState === 'Default' && 'text-icon-colour-action-active'} ${visualState === 'Error' && 'text-alias-error-dark'}`}
                        onClick={handleClear}
                        aria-label="Clear"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>
            {required && (
                <p className="text-body-xs-mobile lg:text-body-xs-desktop text-text-colour-disabled leading-label-extra-small-mobile lg:label-extra-small-desktop">
                    <span className="ml-0.5 text-text-colour-warning">*</span> required
                </p>
            )}
        </div>
    );
}