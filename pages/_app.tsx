import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import AdminLayout from '@/components/layouts/AdminLayout';
import MainLayout from '@/components/layouts/MainLayout';
import LoadingPage from '@/components/common/loading/loading-page';

import type { AppProps } from 'next/app';
import 'swiper/css';
import 'swiper/css/pagination';
import "./globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [loadingPage, setLoadingPage] = useState(false);
    const [timeStart, setTimeStart] = useState<number | null>(null);
    const router = useRouter();
    const isAdminRoute = router.pathname.startsWith('/admin');

    const handleStart = () => {
        setLoadingPage(true);
        setTimeStart(new Date().getTime());
    };
    const handleComplete = () => {
        if (!timeStart) return setLoadingPage(false);
        const timeEnd = new Date().getTime();
        const range = timeEnd - timeStart;
        if (range < 500) {
            setTimeout(() => setLoadingPage(false), 500 - range);
        } else {
            setLoadingPage(false);
        }
        setTimeStart(null);
    };

    useEffect(() => {
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    const Layout = useMemo(() => isAdminRoute ? AdminLayout : MainLayout, [isAdminRoute]);
    return (<Layout loading={loadingPage}>
        <Suspense fallback={<LoadingPage />}>
            <Component {...pageProps} />
        </Suspense>
    </Layout>);
}

export default MyApp