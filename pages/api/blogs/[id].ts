import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3 } from "googleapis";
import { blogger } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';

export type ResponseData = {
    message: string;
    data?: blogger_v3.Schema$Post;
}

export default async function getBlog(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await runMiddleware(req, res);
        const { id, ...params } = req.query;
        if (!id) return res.status(400).json({ message: 'Blog not found' });
        if (req.method === 'GET') {
            const response = await blogger.blogs.get({
                blogId: id as string,
                ...params
            });
            res.status(200).json({
                data: response.data,
                message: 'success'
            });
        } else {
            res.status(405).json({ message: 'We only support POST requests' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}