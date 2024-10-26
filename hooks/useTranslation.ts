import { useRouter } from 'next/router';
import enCommon from '@/public/locales/en/common.json';
import vnCommon from '@/public/locales/vn/common.json';
import enHome from '@/public/locales/en/home.json';
import vnHome from '@/public/locales/vn/home.json';
import enBlog from '@/public/locales/en/blog.json';
import vnBlog from '@/public/locales/vn/blog.json';
import enMessages from '@/public/locales/en/messages.json';
import vnMessages from '@/public/locales/vn/messages.json';
import enAdmin from '@/public/locales/en/admin.json';
import vnAdmin from '@/public/locales/vn/admin.json';

import { Locale } from '@/models';

type Namespace = 'common' | 'home' | 'blog' | 'admin' | 'messages';
type Translations = {
    [key in Locale]: {
        [key in Namespace]: {
            [key: string]: string;
        };
    };
};

const translations: Translations = {
    en: {
        common: enCommon,
        home: enHome,
        blog: enBlog,
        admin: enAdmin,
        messages: enMessages,
    },
    vn: {
        common: vnCommon,
        home: vnHome,
        blog: vnBlog,
        admin: vnAdmin,
        messages: vnMessages,
    }
};

const interpolate = (str: string, params: Record<string, string>) => {
    return str.replace(/{{(.*?)}}/g, (_, key) => params[key.trim()] || '');
};

export const useTranslation = (namespace: Namespace = 'common') => {
    const { locale } = useRouter();
    const t = (key: string, params: Record<string, string> = {}) => {
        const translation = translations[locale as keyof typeof translations][namespace][key] || key;
        return interpolate(translation, params);
    };
    return { t };
};