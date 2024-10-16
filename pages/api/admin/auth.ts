import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { runMiddleware } from '@/config/cors';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const AUTHORIZED_USERS = ['mrtranduc1994@gmail.com'];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID);
export type ResponseData = {
    authorized: boolean;
    data?: {
        email?: string;
        avatar?: string;
        name?: string;
    } | null;
}
export default async function verifyIdToken(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res);
    const { token } = req.body;

    try {
        const ticket = await oauth2Client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload?.email;

        if (email && AUTHORIZED_USERS.includes(email)) {
            const userData = {
                email,
                avatar: payload?.picture,
                name: payload?.name,
            };
            res.status(200).json({ authorized: true, data: userData});
        } else {
            res.status(401).json({ authorized: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Token verification failed' });
    }
};