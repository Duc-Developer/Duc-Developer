import React from 'react'

type Props = { value?: string | null; onChange?: (text: string) => void; className?: string;placeholder?: string; };
const Input = ({ className, value, onChange, placeholder = 'Search...' }: Props) => {
    return (
        <div className={`relative mx-auto ${className ?? ''}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-4 pr-4 py-2 border border-astronaut100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black100"
                value={value ?? ''}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
        </div>
    );
};

export default Input;