import { blogger_v3 } from "googleapis";
import GoogleAuth from "./auth";

export const blogger = new GoogleAuth(['https://www.googleapis.com/auth/blogger']).blogger();

export const getBlogInfo = async (params?: typeof blogger.blogs.get.arguments[0], options?: typeof blogger.blogs.get.arguments[1]) => {
    const response = await blogger.blogs.get({
        blogId: process.env.GOOGLE_BLOG_ID,
        ...params
    }, options);
    return response.data as blogger_v3.Schema$Blog;
};