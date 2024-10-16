import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3 } from "googleapis";
import { blogger } from "@/services/blogs";
import getPosts from '.';
import { runMiddleware } from '@/config/cors';

export type ResponseData = {
    message: string;
    posts?: blogger_v3.Schema$Post[];
    nextPageToken?: string | null;
    totalItems?: number;
}

export default async function searchPosts(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await runMiddleware(req, res);
        const params = req.body;
        const search = req.body.q as string;
        if (!search) return getPosts(req, res);
        if (req.method === 'POST') {
            const response = await blogger.posts.search({ blogId: process.env.GOOGLE_BLOG_ID, q: search, ...params });
            const posts = (response?.data as blogger_v3.Schema$PostList)?.items || [];
            posts.forEach(post => {
                if (post?.images?.[0]?.url || !post?.content) return;
                const thumbnail = new RegExp(`src=\\"([^"]+)\\"`).exec(post.content)?.[1];
                if (thumbnail) post.images = [{ url: thumbnail }];
            });
            const results = {
                posts: (response?.data as blogger_v3.Schema$PostList)?.items || [],
                nextPageToken: (response?.data as blogger_v3.Schema$PostList)?.nextPageToken ?? null,
                message: 'success',
                totalItems: response?.data?.items?.length || 0
            };
            res.status(200).json(results);
        } else {
            res.status(405).json({ message: 'We only support POST requests' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}