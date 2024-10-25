import type { NextApiRequest, NextApiResponse } from 'next'
import { runMiddleware } from '@/config/cors';
import { supportedMethod } from '@/utilities/api';
import { COMMON_API_RESPONSES } from '@/constants/server';

export interface BlogSummary {
    version: string
    encoding: string
    feed: Feed
}

export interface HashType<T> {
    $t: T;
}

export interface Feed {
    xmlns: string
    xmlns$openSearch: string
    xmlns$blogger: string
    xmlns$georss: string
    xmlns$gd: string
    xmlns$thr: string
    id: HashType<string>
    updated: HashType<string>
    category: HashType<string>[]
    title: Title
    subtitle: Subtitle
    link: Link[]
    author: Author[]
    generator: Generator
    openSearch$totalResults: HashType<string>
    openSearch$startIndex: HashType<string>
    openSearch$itemsPerPage: HashType<string>
    entry: Entry[]
}

export interface Title extends HashType<string> {
    type: string
}

export interface Subtitle extends HashType<string> {
    type: string
}

export interface Link {
    rel: string
    type?: string
    href: string
}

export interface Author {
    name: HashType<string>
    uri: HashType<string>
    email: HashType<string>
    gd$image: GdImage
}


export interface GdImage {
    rel: string
    width: string
    height: string
    src: string
}

export interface Generato extends HashType<string> {
    version: string
    uri: string
}

export type ResponseData = {
    status: number;
    message: string;
    data?: BlogSummary;
}

export interface Entry {
    id: HashType<string>
    published: HashType<string>
    updated: HashType<string>
    title: Title2
    content: Content
    link: Link2[]
    author: Author2[]
    media$thumbnail: MediaThumbnail
    thr$total: HashType<string>
    category?: Category2[]
}
export interface Title2 extends HashType<string> {
    type: string
}
export interface Content extends HashType<string> {
    type: string
}
export interface Link2 {
    rel: string
    type: string
    href: string
    title?: string
}
export interface Author2 {
    name: HashType<string>
    uri: HashType<string>
    email: HashType<string>
    gd$image: GdImage2
}
export interface GdImage2 {
    rel: string
    width: string
    height: string
    src: string
}
export interface MediaThumbnail {
    xmlns$media: string
    url: string
    height: string
    width: string
}
export interface Category2 {
    scheme: string
    term: string
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
                .json({
                    status: COMMON_API_RESPONSES.BAD_REQUEST.STATUS,
                    message: message ?? COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE
                });
        }
        const { limit = 500 } = req.query;
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

        const response = await fetch(`${endpoint}?alt=json&max-results=${limit}`, requestOptions);
        const data = await response.json();

        res.status(COMMON_API_RESPONSES.SUCCESS.STATUS).json({
            status: COMMON_API_RESPONSES.SUCCESS.STATUS,
            data: data,
            message: COMMON_API_RESPONSES.SUCCESS.MESSAGE
        });
    } catch (error) {
        res
            .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
            .json({
                status: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS,
                message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE
            });
    }
}