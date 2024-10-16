import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import GoogleLoginButton from '@/components/google/GoogleLoginButton';

import { showToast } from '@/components/common/toast';
import type {ResponseData as AuthResponse} from '@/pages/api/admin/auth';

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<AuthResponse['data']>(null);

    const handleLoginSuccess = async (token?: string) => {
        try {
            if(!token) throw new Error('Unauthorized');
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            if(response.status !== 200) throw new Error('Unauthorized');
            const data = await response.json();
            if (!data.authorized) throw new Error('Unauthorized');
            setUserInfo(data.data);
            setIsAuthenticated(true);
        } catch (error) {
            showToast({ message: 'Unauthorized', status: 'error' });
        }
    };

    if (!isAuthenticated) {
        return <GoogleOAuthProvider clientId={googleClientId}>
            <div className='w-full h-full flex justify-center items-center'>
                <GoogleLoginButton onSuccess={(res) => handleLoginSuccess(res.credential)} />
            </div>
        </GoogleOAuthProvider>;
    }

    return <div>Admin login success with {userInfo?.name}</div>;
}

export default Admin