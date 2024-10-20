import type { NextApiRequest, NextApiResponse } from 'next'
import { blogger_v3, google } from "googleapis";
import { rootAuth } from "@/services/blogs";
import { runMiddleware } from '@/config/cors';
import { getBearerToken, supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export type Category = {
    id: string;
    label: string;
    value: string;
}
export type ResponseData = {
    message: string;
    data?: Category[];
}

const endpoint = "https://codecungdavid.blogspot.com/feeds/posts/default";
export default async function getCategories(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        await runMiddleware(req, res);
        const { status, message } = supportedMethod(['GET'], req.method);
        if (!status) {
            return res
                .status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS)
                .json({ message: message ?? COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE });
        }
        const myHeaders = new Headers();
        myHeaders.append("accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01");
        myHeaders.append("accept-language", "en,vi;q=0.9");
        myHeaders.append("cache-control", "no-cache");
        myHeaders.append("referer", "https://codecungdavid.blogspot.com/");

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect
        };

        const response = await fetch(`${endpoint}?alt=json&start-index=10&max-results=0`, requestOptions);
        const data = await response.json();
        const categories = data.feed.category.map((item: { term: string; }) => ({
            id: item.term,
            label: item.term,
            value: item.term
        }));

        res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({
            data: categories,
            message: COMMON_API_RESPONSES.SUCCESS.MESSAGE
        });
    } catch (error) {
        res
            .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
            .json({ message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE });
    }
}