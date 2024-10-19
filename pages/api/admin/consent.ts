import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import { rootAuth } from '@/services/blogs';
import { supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export type ResponseData = {
    url?: string;
    message: string;
}
export default async function getGoogleConsent(req: NextApiRequest, res: NextApiResponse) {
    const { status, message } = supportedMethod(['GET'], req.method);
    if (!status) {
        return res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ authorized: false, message: message });
    }
    try {
        await runMiddleware(req, res);
        const url = rootAuth.clientRequest();
        res.status(COMMON_API_RESPONSES.CREATED.STATUS).json({
            url,
            message: COMMON_API_RESPONSES.CREATED.MESSAGE,
        });
    } catch (error) {
        res
            .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
            .json({ message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE });

    }
};