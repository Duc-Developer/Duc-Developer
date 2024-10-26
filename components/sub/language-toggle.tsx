'use client';

import { classNames } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { showToast } from '../common/toast';

const defaultTransition = 'after:transition-transform after:transition duration-300';
const LanguageToggle = () => {
    const [language, setLanguage] = useState('en');
    const [transition, setTransition] = useState(defaultTransition);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleChange = (val: string) => {
        showToast({ message: 'This functionality has not been implemented yet.', status: 'error' });
        localStorage.setItem('language', val);
        setTransition(transition + ' after:scale-50 after: after:rounded-lg after:translate-y-1/8');
        setTimeout(() => {
            setLanguage(val);
            setTransition(defaultTransition);
        }, 250);
    };

    return (
        <div className={classNames(
            "flex w-fit h-8 items-center gap-4 rounded-full bg-orange px-3 relative text-sm overflow-hidden bg-accent100 cursor-pointer",
            'after:content-[""] after:w-1/2 after:h-full after:bg-astronaut300 after:absolute after:top-0 after:opacity-50',
            language === 'en' ? 'after:right-0' : 'after:left-0',
            transition
        )}
            onClick={() => handleChange(language === 'en' ? 'vn' : 'en')}>
            <span className={classNames('select-none text-center', language === 'vn' && 'line-through')}>
                EN
            </span>
            <span className={classNames('select-none text-center', language === 'en' && 'line-through')}>
                VN
            </span>
        </div>
    )
}

export default LanguageToggle