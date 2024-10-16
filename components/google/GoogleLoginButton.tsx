import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError }: { onSuccess: (res: CredentialResponse) => void; onError?: () => void; }) => {
    return (
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
        />
    );
};

export default GoogleLoginButton;