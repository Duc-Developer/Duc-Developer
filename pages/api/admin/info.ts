import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import { rootAuth } from '@/services/blogs';
import { supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export type ResponseData = {
    message: string;
    data?: any;
}
export default async function getInfo(req: NextApiRequest, res: NextApiResponse) {
    const { status, message } = supportedMethod(['GET'], req.method);
    const bearerToken = req.headers.authorization?.split(' ')[1];
    if (!bearerToken || bearerToken === 'null') {
        return res.status(COMMON_API_RESPONSES.UNAUTHORIZED.STATUS).json({ message: COMMON_API_RESPONSES.UNAUTHORIZED.MESSAGE });
    }
    if (!status) {
        return res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ authorized: false, message: message });
    }
    try {
        await runMiddleware(req, res);
        const data = await rootAuth.clientVerifyToken(bearerToken);
        res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({
            data,
            message: COMMON_API_RESPONSES.SUCCESS.MESSAGE,
        });
    } catch (error) {
        res
            .status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS)
            .json({ message: COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE });

    }
};