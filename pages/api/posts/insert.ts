import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3, google } from "googleapis";
import { blogger, rootAuth } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';

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
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'We only support POST requests' });
        }
        const bearerToken = req.headers.authorization?.split(' ')[1];
        if (!bearerToken) {
            return res.status(401).json({ message: 'Authorization token is missing' });
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

        res.status(200).json({
            data: response.data,
            message: 'Insert successful!'
        });
    } catch (error) {
        console.log({error})
        res.status(500).json({ message: 'Internal server error' });
    }
}