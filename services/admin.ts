
const endpoint = `${process.env.DOMAIN}/api/admin`;

export const requestConsentPage = async () => {
    const data = await fetch(`${endpoint}/consent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (data.status !== 200) throw new Error('Failed to fetch consent page');
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
    if (response.status !== 200) throw new Error('Server Error');
    const data = await response.json();
    return data;
};