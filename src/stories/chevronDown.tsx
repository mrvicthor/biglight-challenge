interface ChevronDownProps {
    isOpen: boolean
}

export function ChevronDown({ isOpen }: ChevronDownProps) {
    return (
        <svg className={`transition-transform duration-200 ${isOpen && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" />
        </svg>
    )
}