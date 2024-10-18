import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3, google } from "googleapis";
import { rootAuth } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';
import { getBearerToken, supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export type ResponseData = {
    message: string;
    data?: blogger_v3.Schema$Post;
}

export default async function insert(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await runMiddleware(req, res);
        const { status, message } = supportedMethod(['POST'], req.method);
        if (!status) {
            return res.status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS).json({ message: message ?? COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE });
        }
        const bearerToken = getBearerToken(req);
        if (!bearerToken) {
            return res.status(COMMON_API_RESPONSES.FORBIDDEN.STATUS).json({ message: COMMON_API_RESPONSES.FORBIDDEN.MESSAGE });
        }
        const params = req.body as blogger_v3.Params$Resource$Posts$Insert;
        const args = {
            blogId: process.env.GOOGLE_BLOG_ID,
            isDraft: true,
            fetchBody: false,
            fetchImages: true,
            ...params
        };
        rootAuth.clientCtx.setCredentials({ access_token: bearerToken });
        const response = await google.blogger({
            version: 'v3',
            auth: rootAuth.clientCtx
        }).posts.insert(args);

        res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({
            data: response.data,
            message: 'Insert successful!'
        });
    } catch (error) {
        res
        .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
        .json({ message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE });
    }
}