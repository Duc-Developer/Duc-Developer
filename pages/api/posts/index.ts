import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3 } from "googleapis";
import { blogger } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';

export type ResponseData = {
  message: string;
  posts?: blogger_v3.Schema$Post[];
  nextPageToken?: string | null;
  totalItems?: number;
}

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await runMiddleware(req, res);
    if (req.method === 'POST') {
      const params = req.body;
      const blogId = process.env.GOOGLE_BLOG_ID;
      const [PostResponses, blogInfoResponse] = await Promise.all([
        blogger.posts.list({ blogId, status: ['LIVE'], ...params }),
        blogger.blogs.get({
          blogId,
          maxPosts: 0,
          view: 'READER'
        }, { apiVersion: 'v3' })
      ]);
      const results = {
        posts: (PostResponses?.data as blogger_v3.Schema$PostList)?.items || [],
        nextPageToken: (PostResponses?.data as blogger_v3.Schema$PostList)?.nextPageToken ?? null,
        message: 'success',
        totalItems: (blogInfoResponse?.data as blogger_v3.Schema$Blog)?.posts?.totalItems || 0
      };
      res.status(200).json(results);
    } else {
      res.status(405).json({ message: 'We only support POST requests' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}