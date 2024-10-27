import { Suspense, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import AdminLayout from '@/components/layouts/AdminLayout';
import MainLayout from '@/components/layouts/MainLayout';
import LoadingPage from '@/components/common/loading/loading-page';

import type { AppProps } from 'next/app';

import 'swiper/css';
import 'swiper/css/pagination';
import "./globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(() => new QueryClient());
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
    return (<>
        <Head>
            <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
        </Head>
        <QueryClientProvider client={queryClient}><Layout loading={loadingPage}>
            <Suspense fallback={<LoadingPage />}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </HydrationBoundary>
            </Suspense>
        </Layout>
        </QueryClientProvider>
    </>);
}

export default MyApp