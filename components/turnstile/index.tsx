import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        turnstile: {
            /**@link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/ */
            render: (
                element: HTMLElement,
                options: {
                    sitekey: string;
                    callback: (token: string) => void,
                    theme?: 'light' | 'dark';
                    retry?: 'auto' | 'never';
                    size?: 'normal' | 'compact' | 'flexible';
                }) => void;
        };
    }
}

const Turnstile = ({ siteKey, onVerify }: { siteKey: string; onVerify: (token: string) => void; }) => {
    const turnstileRef = useRef(null);

    useEffect(() => {
        if (window.turnstile && turnstileRef.current) {
            window.turnstile.render(turnstileRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                theme: 'light',
            });
        }
    }, [siteKey]);

    return <div ref={turnstileRef} className="cf-turnstile fixed bottom-2 right-2" />;
};

export default Turnstile;