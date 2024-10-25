import { blogger_v3 } from "googleapis";
import GoogleAuth from "./auth";

export const rootAuth = new GoogleAuth([
    'https://www.googleapis.com/auth/blogger'
]);
export const blogger = rootAuth.blogger();

export const getBlogInfo = async (params?: typeof blogger.blogs.get.arguments[0], options?: typeof blogger.blogs.get.arguments[1]) => {
    const response = await blogger.blogs.get({
        blogId: process.env.GOOGLE_BLOG_ID,
        ...params
    }, options);
    return response.data as blogger_v3.Schema$Blog;
};

export const getSummary = async ({ limit = 500 }: { limit?: number }) => {
    const response = await fetch(`/api/blogs/davidBlogSummary?limit=${limit}`);
    if (response.status !== 200) throw new Error('Failed to fetch blog summary');
    const data = await response.json();
    return data;
}