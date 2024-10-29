import Head from 'next/head';
import { Suspense } from 'react';

import { ToastContainer } from '@/components/common/toast';
import LoadingPage from '@/components/common/loading/loading-page';

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";

import { metadataVn } from "@/config";
import Sidebar from "@/components/main/sidebar";
import VideoBackground from "@/components/sub/video-background";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useRouter } from 'next/router';


const MainLayout = ({ children, loading }: { children: React.ReactNode; loading: boolean; }) => {
    const { pathname } = useRouter();
    const isHome = pathname === '/';
    return (
        <>
            <section className="relative w-screen max-h-screen transparent flex text-white100">
                <Head>
                    <title>{metadataVn.title}</title>
                    <meta name="description" content={metadataVn.description} />
                    <meta name="keywords" content={metadataVn.keywords.join(', ')} />
                    <meta name="author" content={metadataVn.authors.name} />

                    {/* Open Graph Meta Tags */}
                    <meta property="og:title" content={metadataVn.openGraph.title} />
                    <meta property="og:description" content={metadataVn.openGraph.description} />
                    <meta property="og:type" content={metadataVn.openGraph.type} />
                    <meta property="og:url" content={metadataVn.openGraph.url} />
                    <meta property="og:image" content={metadataVn.openGraph.images.url} />
                    <meta property="og:image:alt" content={metadataVn.openGraph.images.alt} />
                    <meta property="og:image:type" content={metadataVn.openGraph.images.type} />
                    <meta property="og:image:width" content={metadataVn.openGraph.images.width.toString()} />
                    <meta property="og:image:height" content={metadataVn.openGraph.images.height.toString()} />

                    {/* Twitter Meta Tags */}
                    <meta name="twitter:card" content={metadataVn.twitter.card} />
                    <meta name="twitter:title" content={metadataVn.twitter.title} />
                    <meta name="twitter:description" content={metadataVn.twitter.description} />
                    <meta name="twitter:image" content={metadataVn.twitter.images.url} />
                    <meta name="twitter:image:alt" content={metadataVn.twitter.images.alt} />
                    <meta name="twitter:image:type" content={metadataVn.twitter.images.type} />
                    <meta name="twitter:image:width" content={metadataVn.twitter.images.width.toString()} />
                    <meta name="twitter:image:height" content={metadataVn.twitter.images.height.toString()} />
                </Head>
                <StarsCanvas />
                <Sidebar />
                <section className="h-screen w-full grow flex flex-col gap-4">
                    {
                        loading ? <LoadingPage />
                            : <>
                                <VideoBackground className={isHome ? 'block' : '!hidden'} />
                                <Navbar />
                                <section className="page-wrapper grow pt-14 md:pt-8 md:mt-0 md:overflow-y-auto">
                                    <Suspense fallback={<>...</>}>
                                        {children}
                                    </Suspense>
                                </section>
                            </>
                    }
                    <ToastContainer />
                    <Footer />
                </section>
            </section>
            <SpeedInsights />
        </>
    );
};

export default MainLayout;