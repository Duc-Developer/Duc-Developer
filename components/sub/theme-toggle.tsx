"use client";

import { classNames } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { showToast } from "../common/toast";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('mode');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        showToast({ message: 'This functionality has not been implemented yet.', status: 'error' });
        const newValue = !isDarkMode;
        localStorage.setItem('mode', newValue ? 'dark' : 'light');
        setTimeout(() => {
            setIsDarkMode(newValue);
        }, 250);
    }

    return <button
        className={classNames(
            "w-24 h-10 rounded-full bg-white flex items-center px-2",
            "transition duration-300 focus:outline-none shadow",
            isDarkMode ? "bg-darkNeutral4" : "bg-yellow"
        )}
        onClick={toggleTheme}>
        <div
            className={classNames(
                "w-10 h-10 rounded-full flex items-center justify-center transition-transform",
                isDarkMode ? "bg-gray-700 translate-x-full" : "bg-yellow-500 -translate-x-2"
            )}>
            {isDarkMode ? <FaRegMoon size={30} /> : <FaSun size={30} />}
        </div>
    </button>
};
export default ThemeToggle;