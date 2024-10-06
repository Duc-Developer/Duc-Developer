import { blogger_v3 } from "googleapis";
import GoogleAuth from "./auth";

const blogger = new GoogleAuth(['https://www.googleapis.com/auth/blogger']).blogger();

export const getBlogInfo = async (params?: typeof blogger.blogs.get.arguments[0], options?: typeof blogger.blogs.get.arguments[1]) => {
    const response = await blogger.blogs.get({
        blogId: process.env.GOOGLE_BLOG_ID,
        ...params
    }, options);
    return response.data as blogger_v3.Schema$Blog;
};

export const getPosts = async (params?: blogger_v3.Params$Resource$Posts$List, options?: any) => {
    const response = await blogger.posts.list({ blogId: process.env.GOOGLE_BLOG_ID, status: ['LIVE'], ...params }, options);
    return {
        posts: (response?.data as blogger_v3.Schema$PostList)?.items || [],
        nextPageToken: (response?.data as blogger_v3.Schema$PostList)?.nextPageToken,
    };
};

export const getBlogByPath = async (path: string) => {
    const response = await blogger.posts.getByPath({
        path,
        blogId: process.env.GOOGLE_BLOG_ID,
    }, {
        apiVersion: 'v3'
    });
    let summaryData = { data: {} };
    if (response?.data?.id) {
        summaryData = await blogger.posts.get({ postId: response.data.id, blogId: process.env.GOOGLE_BLOG_ID, fetchBody: false, fetchImages: true });
    }
    const fullData = { ...summaryData?.data, ...response.data };
    return fullData;
};