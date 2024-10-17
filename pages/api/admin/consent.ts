import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import { rootAuth } from '@/services/blogs';

export type ResponseData = {
    url?: string;
    message: string;
}
export default async function getGoogleConsent(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(400).json({ message: 'Sorry, this api only support GET method' });
    }
    try {
        await runMiddleware(req, res);
        const url = rootAuth.clientRequest();
        res.status(200).json({
            url,
            message: 'Request consent page success',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
};