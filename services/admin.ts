import { HTTP_STATUS } from "@/constants/server";
import { ResponseData as InfoResponse } from "@/pages/api/admin/info";

const endpoint = `${process.env.DOMAIN}/api/admin`;

export const requestConsentPage = async () => {
    const data = await fetch(`${endpoint}/consent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (data.status !== HTTP_STATUS.CREATED) throw new Error('Failed to fetch consent page');
    const response = await data.json();
    return response;
};

export const getCredentials = async (code: string) => {
    const response = await fetch(`${endpoint}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });
    if (response.status !== HTTP_STATUS.OK) throw new Error('Server Error');
    const data = await response.json();
    return data;
};

export const getInfo = async (): Promise<InfoResponse> => {
    const response = await fetch(`${endpoint}/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
    });
    if (response.status !== 200) throw new Error('Server Error');
    const data = await response.json();
    return data;
};

export const verifyCaptcha = async (token: string) => {
    const response = await fetch(`${endpoint}/verifyCaptcha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });
    if (response.status !== 200) throw new Error('Failed to verify reCAPTCHA');
    const data = await response.json();
    return data;
};

export const loginWithGoogleConsent = async ({ captcha }: { captcha?: string | null }) => {
    if (!captcha) {
        alert('Please verify reCAPTCHA');
        throw { success: false, message: 'Please verify reCAPTCHA' };
    }
    const { success } = await verifyCaptcha(captcha);
    if (!success) {
        throw { success: false, message: 'reCAPTCHA is not valid' };
    };
    const { url } = await requestConsentPage();
    return { success: true, url, message: 'redirect to google consent' };
};