import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { findLastIndex } from "../utils/findLastIndex";
import clsx from "clsx";
import ClockIcon from "./clockIcon";
import { ChevronDown } from "./chevronDown";

export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean
}

export type DropdownState = 'Default' | 'Focus' | 'Selected' | 'Disabled' | 'Opened'

export interface DropdownProps {
    id: string;
    label: string;
    helperText?: string;
    options: DropdownOption[];
    value?: string;
    placeholder?: string;
    state: DropdownState;
    disabled?: boolean;
    showIcon?: boolean;
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
    showIcon = true,
    required = false,
    errorMessage,
    onValueChange,
    onOpen,
    onClose,
    className
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const [isFocused, setIsFocused] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listboxRef = useRef<HTMLUListElement>(null)
    const optionRefs = useRef<(HTMLLIElement | null)[]>([])

    const value = controlledValue ?? internalValue
    const isDisabled = state === 'Disabled' || disabled
    const selectedOption = options.find((opt) => opt.value === value)
    const enabledOptions = options.filter((opt) => !opt.disabled)

    const labelId = `${id}-label`;
    const helperId = `${id}-helper`
    const listboxId = `${id}-listbox`;

    const getVisualState = (): DropdownState => {
        if (isDisabled) return 'Disabled'
        if (isOpen) return 'Opened'
        if (isFocused) return 'Focus'
        if (selectedOption) return 'Selected'
        return 'Default'
    }

    const visualState = getVisualState()

    const openDropdown = useCallback(() => {
        if (isDisabled) return
        setIsOpen(true)
        onOpen?.()

        const selectedIndex = options.findIndex((opt) => opt.value === value)
        if (selectedIndex >= 0 && !options[selectedIndex].disabled) {
            setActiveIndex(selectedIndex)
        } else {
            const firstEnabledIndex = options.findIndex((opt) => !opt.disabled)
            setActiveIndex(firstEnabledIndex)
        }
    }, [isDisabled, options, value, onOpen])

    const closeDropdown = useCallback(() => {
        setIsOpen(false)
        setActiveIndex(-1)
        onClose?.()
        triggerRef.current?.focus()
    }, [onClose])

    const toggleDropdown = useCallback(() => {
        if (isOpen) {
            closeDropdown()
        } else {
            openDropdown()
        }
    }, [isOpen, openDropdown, closeDropdown])

    const selectOption = useCallback((option: DropdownOption) => {
        if (option.disabled) return
        setInternalValue(option.value)
        onValueChange?.(option.value)
        closeDropdown()
    }, [onValueChange, closeDropdown])

    const handleTriggerKeyDown = useCallback((e: KeyboardEvent) => {
        if (isDisabled) return
        switch (e.key) {
            case 'Enter':
            case " ":
            case "ArrowDown":
                e.preventDefault()
                openDropdown()
                break
            case "ArrowUp":
                e.preventDefault()
                openDropdown()
                const lastEnabledIndex = findLastIndex(options, (opt) => !opt.disabled)
                setActiveIndex(lastEnabledIndex)
                break
        }
    }, [isDisabled, openDropdown, options])

    const handleListboxKeyDown = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setActiveIndex((prev) => {
                        let next = prev + 1;
                        while (next < options.length && options[next].disabled) {
                            next++;
                        }
                        return next < options.length ? next : prev;
                    });
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    setActiveIndex((prev) => {
                        let next = prev - 1;
                        while (next >= 0 && options[next].disabled) {
                            next--;
                        }
                        return next >= 0 ? next : prev;
                    });
                    break;

                case "Home":
                    e.preventDefault();
                    const firstEnabled = options.findIndex((opt) => !opt.disabled);
                    setActiveIndex(firstEnabled);
                    break;

                case "End":
                    e.preventDefault();
                    const lastEnabled = findLastIndex(options, (opt) => !opt.disabled)
                    setActiveIndex(lastEnabled);
                    break;

                case "Enter":
                case " ":
                    e.preventDefault();
                    if (activeIndex >= 0 && !options[activeIndex].disabled) {
                        selectOption(options[activeIndex]);
                    }
                    break;

                case "Escape":
                    e.preventDefault();
                    closeDropdown();
                    break;

                case "Tab":
                    closeDropdown();
                    break;

                default:
                    // Type-ahead: jump to option starting with pressed key
                    const char = e.key.toLowerCase();
                    if (char.length === 1) {
                        const startIndex = activeIndex + 1;
                        const matchIndex = options.findIndex(
                            (opt, i) =>
                                i >= startIndex &&
                                !opt.disabled &&
                                opt.label.toLowerCase().startsWith(char)
                        );
                        if (matchIndex >= 0) {
                            setActiveIndex(matchIndex);
                        } else {
                            // Wrap around to beginning
                            const wrapIndex = options.findIndex(
                                (opt) =>
                                    !opt.disabled && opt.label.toLowerCase().startsWith(char)
                            );
                            if (wrapIndex >= 0) {
                                setActiveIndex(wrapIndex);
                            }
                        }
                    }
                    break;
            }
        },
        [options, activeIndex, selectOption, closeDropdown]
    );

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, closeDropdown]);

    useEffect(() => {
        if (isOpen && activeIndex >= 0 && optionRefs.current[activeIndex]) {
            optionRefs.current[activeIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [isOpen, activeIndex]);

    useEffect(() => {
        if (isOpen && listboxRef.current) {
            listboxRef.current.focus();
        }
    }, [isOpen]);

    const containerStyles = clsx("relative w-full max-w-xs", className);

    const triggerStyles = clsx(
        "relative flex justify-between border-passive items-center w-[17rem] min-h-[3.25rem] rounded-lg bg-white transition-all duration-200 px-3",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black",
        {
            // Default
            "border-passive border-xs hover:border-gray-400":
                visualState === "Default",
            // Focus
            "border-black ring-1 ring-black":
                visualState === "Focus",
            // Selected
            "hover:border-gray-400 border-gray-300":
                visualState === "Selected",
            // Disabled
            "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60":
                visualState === "Disabled",
            // Opened
            "ring-1 ring-black border-black":
                visualState === "Opened",
        }
    );

    const labelStyles = clsx(
        "absolute left-8 transition-all duration-200 pointer-events-none bg-white px-1",
        {
            // Floating label when has value or is open
            "-top-2.5 text-xs font-medium": selectedOption || isOpen,
            "top-[1.6rem] -translate-y-1/2 text-sm": !selectedOption && !isOpen,
            // Colors
            "text-gray-600": visualState !== "Disabled",
            "text-gray-400": visualState === "Disabled",
        }
    );

    const valueStyles = clsx(
        "flex-1 text-left text-sm truncate",
        {
            "text-gray-900": selectedOption && visualState !== "Disabled",
            "text-gray-500": !selectedOption && visualState !== "Disabled",
            "text-gray-400": visualState === "Disabled",
        }
    );

    const helperStyles = clsx("mt-1.5 text-xs", {
        "text-gray-500": !errorMessage,
        "text-red-600": errorMessage,
    });

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
            "px-4 py-3 text-sm cursor-pointer transition-colors duration-150",
            "focus:outline-none",
            {
                // Active (keyboard navigation)
                "bg-gray-100": index === activeIndex && !option.disabled,
                // Selected
                "font-medium text-black": option.value === value,
                // Disabled
                "text-gray-400 cursor-not-allowed": option.disabled,
                // Default
                "text-gray-700 hover:bg-gray-50":
                    !option.disabled && index !== activeIndex,
            }
        );
    return (<div className={containerStyles} ref={containerRef}>
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
            <div className="flex items-center gap-2 w-full pt-3 pb-2">
                <span id={labelId} className={labelStyles}>
                    {label}
                    {required && <span className="!text-text-warning ml-0.5">*</span>}
                </span>

                <span
                    className={clsx("flex-shrink-0", {
                        "text-gray-500": visualState !== "Disabled",
                        "text-gray-400": visualState === "Disabled",
                    })}
                >
                    <ClockIcon />
                </span>
            </div>
            {selectOption.length && (<span className={valueStyles}>
                {selectedOption?.label || placeholder}
            </span>)}
            <span
                className={clsx("flex-shrink-0 ml-auto", {
                    "text-gray-500": visualState !== "Disabled",
                    "text-gray-400": visualState === "Disabled",
                })}
            >
                <ChevronDown isOpen={isOpen} />
            </span>


        </button>
        {(helperText || errorMessage) && (
            <p id={helperId} className={helperStyles} role={errorMessage ? "alert" : undefined}>
                <span className="text-text-warning ml-0.5">*</span>{errorMessage || helperText}
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
    </div>)
}