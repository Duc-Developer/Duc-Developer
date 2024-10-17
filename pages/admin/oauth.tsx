
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCredentials } from '@/services/admin';
import { useSearchParams } from 'next/navigation';
import { showToast } from '@/components/common/toast';

const AdminOauthCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams?.get('code');

    const verifyGoogleCode = async (code: string) => {
        try {
            const { access_token } = await getCredentials(code);
            setTimeout(() => {
                showToast({ message: 'Login success', status: 'success' });
            }, 1000);
            localStorage.setItem('access_token', access_token);
        } catch (error) {
            setTimeout(() => {
                showToast({ message: 'Failed to verify code', status: 'error' });
            }, 1000);
        } finally {
            router.push('/admin');
        }
    };
    useEffect(() => {
        if (!code) return;
        verifyGoogleCode(code);
    }, [code]);
    return (
        <div>verifying...</div>
    )
}

export default AdminOauthCallback;