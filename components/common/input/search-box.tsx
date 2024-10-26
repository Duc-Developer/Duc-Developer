import { useTranslation } from '@/hooks/useTranslation';
import React from 'react'

type Props = { value?: string; onChange?: Function; className?: string; placeholder?: string; };
const SearchBox = ({ className, value, onChange, placeholder = 'Search...' }: Props) => {
    const { t } = useTranslation('common');
    return (
        <div className={`relative w-full max-w-md mx-auto ${className ?? ''}`}>
            <input
                type="text"
                placeholder={t(placeholder)}
                className="w-full pl-10 pr-4 py-2 border border-astronaut100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black100"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default SearchBox;