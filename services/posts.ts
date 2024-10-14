import { blogger_v3 } from "googleapis";
import { ResponseData as PostResponses } from "@/pages/api/posts";

const endpoint = `${process.env.DOMAIN}/api/posts`;

export const getPosts = async (params?: blogger_v3.Params$Resource$Posts$List): Promise<PostResponses> => {
    const responses = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    if(responses.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    const data = await responses.json();
    return data;
};

export const searchPosts = async (params?: blogger_v3.Params$Resource$Posts$List & blogger_v3.Params$Resource$Posts$Search): Promise<PostResponses> => {
    const responses = await fetch(`${endpoint}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });
    if(responses.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    const data = await responses.json();
    return data;
};