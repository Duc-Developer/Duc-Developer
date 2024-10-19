import { classNames } from '@/lib/utils';
import React from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

export type Option = {
    id?: string;
    value: string;
    label: string;
}
interface SelectProps {
    className?: string;
    selected: string;
    onChange: (value: Option) => void;
    options: Option[];
}

const Select: React.FC<SelectProps> = ({ selected, onChange, options, className }) => {
    return (
        <div className={classNames("relative inline-block w-full", className)}>
            <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selected}
                onChange={(e) => {
                    if (!e.target.value) return;
                    const selectedOption = options.find(option => option.value === e.target.value);
                    if (selectedOption) {
                        onChange(selectedOption);
                    }
                }}
            >
                {options.map((option, index) => (
                    <option key={index ?? option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <IoMdArrowDropdown />
            </div>
        </div>
    );
}

export default Select;