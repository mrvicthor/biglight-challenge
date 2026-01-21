
import clsx from "clsx";
import ClockIcon from "./clockIcon";
import { ChevronDown } from "./chevronDown";
import { useDropdown } from "../hooks/useDropdown";
import type { DropdownOption, DropdownState } from "../types";



export interface DropdownProps {
    id: string;
    label: string;
    helperText?: string;
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    state: DropdownState;
    disabled?: boolean;
    required?: boolean;
    errorMessage?: string;
    onValueChange?: (value: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
    className?: string
}



export const Dropdown = ({
    id,
    label,
    helperText = "required",
    options,
    value: controlledValue,
    placeholder = 'label',
    state = "Default",
    disabled = false,
    required = false,
    errorMessage,
    onValueChange,
    onOpen,
    onClose,
    className
}: DropdownProps) => {
    const { visualState,
        shouldFloatLabel,
        selectedOption,
        isOpen,
        activeIndex,
        value,
        containerRef,
        triggerRef,
        toggleDropdown,
        handleTriggerKeyDown,
        setIsFocused,
        isDisabled,
        labelId,
        helperId,
        selectOption,
        isFocused,
        listboxRef,
        listboxId,
        handleListboxKeyDown,
        optionRefs,
        setActiveIndex } = useDropdown(state, disabled, options, id, onValueChange, controlledValue, onOpen, onClose)
    const containerStyles = clsx("relative w-full max-w-xs", className);

    const triggerStyles = clsx(
        "relative flex justify-between items-center w-[17rem] min-h-[3.25rem] rounded-md transition-all duration-200 px-3",

        {
            // Default
            "border-border-colour-passive border-xs hover:border-gray-400 bg-surface-colour-action-inverse text-text-colour-action-active":
                visualState === "Default",
            // Focus
            "border-border-colour-passive border-md":
                visualState === "Focus",
            // Selected
            "border-border-colour-passive border-lg bg-[#faf9f5]":
                visualState === "Selected",
            // Disabled
            "cursor-not-allowed bg-surface-colour-disabled-dark text-text-colour-disabled":
                visualState === "Disabled",
            // Opened
            "border-md bg-surface-colour-secondary border-border-colour-passive":
                visualState === "Opened",
        }
    );

    const labelStyles = clsx(
        "absolute left-8 transition-all duration-200 pointer-events-none bg-surface-colour-secondary px-1",
        {
            "-top-2.5 text-sm font-medium left-[0.5rem]": shouldFloatLabel && visualState !== 'Disabled',
            "top-[1.7rem] -translate-y-1/2 lg:text-desktop-font-size-body-md text-mobile-font-size-body-md text-text-colour-passive": !shouldFloatLabel && visualState !== 'Disabled',
            "px-1 bg-[linear-gradient(180deg,white_50%,#faf9f5_50%)]": visualState === 'Selected',
            "-top-[0.5rem] text-xs font-medium left-[0.5rem] bg-transparent text-text-colour-disabled": shouldFloatLabel && visualState === "Disabled",
        }
    );

    const valueStyles = clsx(
        "text-left text-sm truncate pl-2 pt-1",
        {
            "text-text-colour-body": selectedOption && visualState !== "Disabled",
            "text-text-colour-disabled": visualState === "Disabled",
            "hidden": visualState === 'Default'
        }
    );

    const helperStyles = clsx("mt-1 text-body-xs-mobile lg:text-body-xs-desktop text-text-colour-disabled leading-label-extra-small-mobile lg:label-extra-small-desktop");

    const listboxStyles = clsx(
        "absolute z-50 w-full mt-1 py-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg",
        "max-h-60 overflow-auto",
        "focus:outline-none",
        {
            hidden: !isOpen,
        }
    );

    const getOptionStyles = (option: DropdownOption, index: number) =>
        clsx(
            "p-3 text-sm cursor-pointer transition-colors duration-150",
            "focus:outline-none",
            {
                "bg-gray-100": index === activeIndex && !option.disabled,
                "label-small-mobile lg:label-small-desktop text-text-colour-body": option.value === value,
                "text-gray-400 cursor-not-allowed": option.disabled,
                "text-gray-700 hover:bg-gray-50":
                    !option.disabled && index !== activeIndex,
            }
        );
    return (
        <div className="bg-white p-16">

            <div className={containerStyles} ref={containerRef}>
                <button
                    ref={triggerRef}
                    type='button'
                    id={id}
                    className={triggerStyles}
                    onClick={toggleDropdown}
                    onKeyDown={handleTriggerKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isDisabled}
                    aria-haspopup='listbox'
                    aria-expanded={isOpen}
                    aria-labelledby={labelId}
                    aria-describedby={helperText ? helperId : undefined}
                    aria-required={required}
                    aria-invalid={!!errorMessage}>
                    <div className="flex items-center gap-2 pt-3 pb-2">
                        <span id={labelId} className={labelStyles}>
                            {label}
                        </span>

                        <span
                            className={clsx("flex-shrink-0")}
                        >
                            <ClockIcon />
                        </span>
                    </div>
                    {selectOption.length && !isFocused && !isOpen && (<span className={valueStyles}>
                        {selectedOption?.label || placeholder}
                    </span>)}
                    <span
                        className={clsx("flex-shrink-0 ml-auto")}
                    >
                        <ChevronDown isOpen={isOpen || isFocused} />
                    </span>


                </button>
                {(helperText || errorMessage) && !isOpen && (
                    <p id={helperId} className={helperStyles} role={errorMessage ? "alert" : undefined}>
                        <span className="text-text-colour-warning ml-0.5">*</span>{errorMessage || helperText}
                    </p>
                )}
                <ul
                    ref={listboxRef}
                    id={listboxId}
                    className={listboxStyles}
                    role="listbox"
                    aria-labelledby={labelId}
                    aria-activedescendant={
                        activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
                    }
                    tabIndex={-1}
                    onKeyDown={handleListboxKeyDown}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            ref={(el) => { (optionRefs.current[index] = el) }}
                            id={`${id}-option-${index}`}
                            className={getOptionStyles(option, index)}
                            role="option"
                            aria-selected={option.value === value}
                            aria-disabled={option.disabled}
                            onClick={() => !option.disabled && selectOption(option)}
                            onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                        >
                            {option.label}
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}