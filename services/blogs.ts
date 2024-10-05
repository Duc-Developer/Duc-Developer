import { blogger_v3 } from "googleapis";
import GoogleAuth from "./auth";

const blogger = new GoogleAuth(['https://www.googleapis.com/auth/blogger']).blogger();

export const getBlogInfo = async () => {
    const response = await blogger.blogs.get({
        blogId: process.env.GOOGLE_BLOG_ID
    });
    return response.data;
};

export const getPosts = async (params?: blogger_v3.Params$Resource$Posts$List, options?: any) => {
    const response = await blogger.posts.list({ blogId: process.env.GOOGLE_BLOG_ID, ...params }, options);
    return (response.data as blogger_v3.Schema$PostList).items || [];
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