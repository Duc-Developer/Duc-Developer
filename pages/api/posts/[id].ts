import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3 } from "googleapis";
import { blogger } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';

export type ResponseData = {
    message: string;
    data?: blogger_v3.Schema$Post;
}

export default async function getPost(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await runMiddleware(req, res);
        const { id: postId } = req.query;
        if (!postId) return res.status(400).json({ message: 'Post ID is required' });
        if (req.method === 'POST') {
            const params = req.body;
            const args = {
                postId: postId as string,
                blogId: process.env.GOOGLE_BLOG_ID,
                fetchBody: false,
                fetchImages: true,
                status: ['LIVE'],
                ...params
            };
            const response = await blogger.posts.get(args);

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