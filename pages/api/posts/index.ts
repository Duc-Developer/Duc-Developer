import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3 } from "googleapis";
import { blogger } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';

export type ResponseData = {
  message: string;
  posts?: blogger_v3.Schema$Post[];
  nextPageToken?: string | null;
}

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await runMiddleware(req, res);
    if (req.method === 'POST') {
      const params = req.body;
      const response = await blogger.posts.list({ blogId: process.env.GOOGLE_BLOG_ID, status: ['LIVE'], ...params });
      const results = {
        posts: (response?.data as blogger_v3.Schema$PostList)?.items || [],
        nextPageToken: (response?.data as blogger_v3.Schema$PostList)?.nextPageToken ?? null,
        message: 'success'
      };
      res.status(200).json(results);
    } else {
      res.status(405).json({ message: 'We only support POST requests' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}