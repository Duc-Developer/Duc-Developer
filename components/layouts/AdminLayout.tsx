import { Suspense } from 'react';

import { ToastContainer } from '@/components/common/toast';
import LoadingPage from '@/components/common/loading/loading-page';

import { Footer } from "@/components/main/footer";
import { StarsCanvas } from "@/components/main/star-background";
import Sidebar from "@/components/main/sidebar";


const AdminLayout = ({ children, loading }: { children: React.ReactNode; loading: boolean; }) => {
    return (
        <>
            <section className="relative w-screen max-h-screen transparent flex text-neutral">
                <StarsCanvas />
                <Sidebar />
                <section className="h-screen w-full grow flex flex-col gap-4 md:overflow-y-auto">
                    {
                        loading ? <LoadingPage />
                            : <>
                                <section className="grow pt-16 md:pt-0 md:mt-0">
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
        </>
    );
};

export default AdminLayout;