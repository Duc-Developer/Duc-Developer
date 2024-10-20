import { ResponseData as CategoryResponses } from "@/pages/api/posts/category/list";

const endpoint = `${process.env.DOMAIN}/api/posts/category`;

export const getCategories = async (): Promise<CategoryResponses> => {
    const responses = await fetch(`${endpoint}/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (responses.status !== 200) {
        throw new Error('Failed to fetch categories');
    }
    const data = await responses.json();
    return data;
};