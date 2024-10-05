import { getBlogByPath, getBlogInfo, getPosts } from '@/services/blogs';
import type {
    InferGetStaticPropsType,
    GetStaticPaths,
} from 'next'
import DOMPurify from "isomorphic-dompurify";
import { SlugConverter } from '@/utilities';
import PostContent from '@/components/blogs/post-content';

export const getStaticPaths = (async () => {
    const blogInfo = await getBlogInfo();

    const posts = await getPosts({
        fetchImages: false,
        fetchBodies: false,
        view: 'READER',
        maxResults: blogInfo.posts?.totalItems ?? 500,
    }) ?? [];

    const paths: any[] = [];
    posts?.forEach(post => {
        const newUrl = SlugConverter.toPostSlug(post.url);
        if (!newUrl) return;
        paths.push({
            params: {
                slug: newUrl
            },
        });
    });

    return {
        paths,
        fallback: false
    }
}) satisfies GetStaticPaths

export const getStaticProps = async (context: any) => {
    const slug = context.params?.slug;
    const originUrl = slug ? '/' + slug.replaceAll('_', '/') + '.html' : null;
    if (!originUrl) return { notFound: true };
    const post = await getBlogByPath(originUrl);
    return {
        props: {
            data: post,
        },
    };
};


const Post = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <PostContent data={data} />;
}

export default Post