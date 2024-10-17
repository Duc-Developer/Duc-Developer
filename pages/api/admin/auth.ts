import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import { rootAuth } from '@/services/blogs';

export type ResponseData = {
    authorized: boolean;
    message: string;
    access_token?: string;
    refresh_token?: string;
}
export default async function getGoogleCredential(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.body;
    if (!code) return res.status(403).json({ authorized: false, message: 'Unauthorized' });
    if(req.method !== 'POST') {
        return res.status(400).json({ authorized: false, message: 'Sorry, this api only support POST method' });
    }
    try {
        await runMiddleware(req, res);
        const {tokens} = await  rootAuth.getClientToken(code);
        res.status(200).json({  
            authorized: true, 
            message: 'Login success',
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expiry_date
        });
    } catch (error) {
        res.status(500).json({ authorized: false, message: 'Internal server error' });
        
    }
};