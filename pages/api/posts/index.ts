import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3, google } from "googleapis";
import { blogger, rootAuth } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';
import { getBearerToken } from '@/utilities/api';

export type ResponseData = {
  message: string;
  posts?: blogger_v3.Schema$Post[];
  nextPageToken?: string | null;
  totalItems?: number;
}

const getPostListByReader = (params: any) => {
  const blogId = process.env.GOOGLE_BLOG_ID;
  return blogger.posts.list({ blogId, status: ['LIVE'], ...params });
};

const getPostListByAuthor = (params: any, bearerToken: string | null) => {
  const blogId = process.env.GOOGLE_BLOG_ID;
  if (bearerToken) {
    rootAuth.clientCtx.setCredentials({ access_token: bearerToken });
  }
  return google.blogger({
    version: 'v3',
    auth: rootAuth.clientCtx
  }).posts.list({ blogId, status: ['LIVE'], ...params });
};

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await runMiddleware(req, res);
    if (req.method === 'POST') {
      const params = req.body;
      const bearerToken = getBearerToken(req);

      const isAdminRequest = !!bearerToken && params?.view === 'AUTHOR' || params?.view === 'ADMIN';
      const [postResponses, blogInfoResponse] = await Promise.all([
        isAdminRequest ? getPostListByAuthor(params, bearerToken) : getPostListByReader(params),
        blogger.blogs.get({
          blogId: process.env.GOOGLE_BLOG_ID,
          maxPosts: 0,
          view: 'READER'
        }, { apiVersion: 'v3' })
      ]);
      const results = {
        posts: (postResponses?.data as blogger_v3.Schema$PostList)?.items || [],
        nextPageToken: (postResponses?.data as blogger_v3.Schema$PostList)?.nextPageToken ?? null,
        message: 'success',
        totalItems: (blogInfoResponse?.data as blogger_v3.Schema$Blog)?.posts?.totalItems || 0
      };
      res.status(200).json(results);
    } else {
      res.status(405).json({ message: 'We only support POST requests' });
    }
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: 'Internal server error' });
  }
}