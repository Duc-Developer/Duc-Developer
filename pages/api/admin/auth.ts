import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import { rootAuth } from '@/services/blogs';
import { supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export type ResponseData = {
    authorized: boolean;
    message: string;
    access_token?: string;
    refresh_token?: string;
}
export default async function getGoogleCredential(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.body;
    const { status, message } = supportedMethod(['POST'], req.method);
    if (!code || !status) {
        return res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ authorized: false, message: message ?? COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE });
    }
    try {
        await runMiddleware(req, res);
        const { tokens } = await rootAuth.clientGetToken(code);
        res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({
            authorized: true,
            message: 'Login success',
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expiry_date
        });
    } catch (error) {
        res
            .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
            .json({ authorized: false, message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE });

    }
};