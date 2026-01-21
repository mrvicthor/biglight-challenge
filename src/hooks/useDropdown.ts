import { useCallback, useEffect, useRef, useState } from "preact/hooks"
import { findLastIndex } from "../utils/findLastIndex"
import type { DropdownOption, DropdownState } from "../types"

export function useDropdown(state:DropdownState, disabled:boolean, options:DropdownOption[], id:string, onValueChange?:(value: string) => void, controlledValue?:string, onOpen?:() => void, onClose?:() => void,){
    const [isOpen, setIsOpen] = useState(state === 'Opened')
    const [internalValue, setInternalValue] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const [isFocused, setIsFocused] = useState(state === "Focus")

    const containerRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listboxRef = useRef<HTMLUListElement>(null)
    const optionRefs = useRef<(HTMLLIElement | null)[]>([])

    const value = controlledValue ?? internalValue
    const isDisabled = state === 'Disabled' || disabled
    const selectedOption = options.find((opt) => opt.value === value)


    const labelId = `${id}-label`;
    const helperId = `${id}-helper`
    const listboxId = `${id}-listbox`;

    const shouldFloatLabel = isFocused || isOpen || !!selectedOption || state === 'Focus' || state === 'Selected' || state === 'Opened';

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

    return{
        visualState, 
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
        setActiveIndex
    }
}