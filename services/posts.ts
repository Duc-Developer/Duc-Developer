import { blogger_v3 } from "googleapis";
import { ResponseData as PostResponses } from "@/pages/api/posts";
import { ResponseData as InsertPostResponses } from "@/pages/api/posts/insert";
import { ResponseData as UpdatePostResponses } from "@/pages/api/posts/update";
import { ResponseData as PublishPostResponses } from "@/pages/api/posts/publish";

const endpoint = `${process.env.DOMAIN}/api/posts`;

export const getPosts = async (params?: blogger_v3.Params$Resource$Posts$List): Promise<PostResponses> => {
    const responses = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    });
    if (responses.status !== 200) {
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
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(params),
    });
    if (responses.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    const data = await responses.json();
    return data;
};

export const getPostByPath = async (path: string) => {
    const endCodeUri = encodeURIComponent(path);
    const responses = await fetch(`${endpoint}/path/${endCodeUri}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (responses.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    const summaryData = await responses.json();
    const responseDetail = await fetch(`${endpoint}/${summaryData?.data?.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (responseDetail.status !== 200) {
        throw new Error('Failed to fetch posts');
    }
    const detailData = await responseDetail.json();
    const fullData = { ...summaryData?.data, ...detailData.data };
    return fullData;
};

export const insertPost = async (body: blogger_v3.Schema$Post): Promise<InsertPostResponses> => {
    const responses = await fetch(`${endpoint}/insert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ requestBody: body }),
    });
    if (responses.status !== 200) {
        throw new Error('Failed to insert post');
    }
    const data = await responses.json();
    return data;
};

export const updatePost = async (body: blogger_v3.Schema$Post): Promise<UpdatePostResponses> => {
    if (!body?.id) throw new Error('Post ID is required');
    const responses = await fetch(`${endpoint}/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ postId: body.id, requestBody: body }),
    });
    if (responses.status !== 200) {
        throw new Error('Failed to update post');
    }
    const data = await responses.json();
    return data;
};

export const publishPost = async (body: blogger_v3.Schema$Post): Promise<PublishPostResponses> => {
    if (!body?.id) throw new Error('Post ID is required');
    const responses = await fetch(`${endpoint}/publish`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ postId: body.id, requestBody: body }),
    });
    if (responses.status !== 200) {
        throw new Error('Failed to publish post');
    }
    const data = await responses.json();
    return data;
};