'use client';

import { classNames } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import useLocale from '@/hooks/useLocale';
import { Locale } from '@/models';

const defaultTransition = 'after:transition-transform after:transition duration-300';
const LanguageToggle = () => {
    const [transition, setTransition] = useState(defaultTransition);
    const { locale, toggle } = useLocale();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            toggle(savedLanguage as Locale);
        }
    }, []);

    const handleChange = (val: Locale) => {
        localStorage.setItem('language', val);
        setTransition(transition + ' after:scale-50 after: after:rounded-lg after:translate-y-1/8');
        setTimeout(() => {
            toggle(val);
            setTransition(defaultTransition);
        }, 250);
    };

    return (
        <div className={classNames(
            "flex w-fit h-8 items-center gap-4 rounded-full bg-orange px-3 relative text-sm overflow-hidden bg-accent100 cursor-pointer",
            'after:content-[""] after:w-1/2 after:h-full after:bg-astronaut300 after:absolute after:top-0 after:opacity-50',
            locale === 'en' ? 'after:right-0' : 'after:left-0',
            transition
        )}
            onClick={() => handleChange(locale === 'en' ? 'vn' : 'en')}>
            <span className={classNames('select-none text-center', locale === 'vn' && 'line-through')}>
                EN
            </span>
            <span className={classNames('select-none text-center', locale === 'en' && 'line-through')}>
                VN
            </span>
        </div>
    )
}

export default LanguageToggle