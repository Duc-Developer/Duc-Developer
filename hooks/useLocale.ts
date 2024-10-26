import { Locale } from '@/models';
import { useRouter } from 'next/router';

const useLocale = () => {
    const router = useRouter();
    const { pathname, asPath, query, locale } = router;

    const toggle = (nextLocale: Locale) => {
        router.push({ pathname, query }, asPath, { locale: nextLocale });
    };
    return { locale, toggle } as {
        locale: Locale;
        toggle: (nextLocale: Locale) => void;
    };
};

export default useLocale;