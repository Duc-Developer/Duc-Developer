import { getBlogInfo, getSummary } from '@/services/blogs';
import type {
    InferGetStaticPropsType,
    GetStaticPaths,
} from 'next'
import DOMPurify from "isomorphic-dompurify";
import { sanitizeDescription, SlugConverter } from '@/utilities';
import PostContent from '@/components/blogs/post-content';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { getPostByPath } from '@/services/posts';

export const getStaticPaths = (async () => {

    const responses = await getSummary({ limit: 500});
    const posts = responses?.data?.feed?.entry ?? [];

    const paths: any[] = [];
    posts?.forEach(post => {
        const originLinkItem = post?.link?.find(link => link.rel === 'alternate');
        const originLink = originLinkItem?.href ?? '';
        const newUrl = SlugConverter.toPostSlug(originLink);
        if (!newUrl) return;
        paths.push({
            params: {
                slug: newUrl
            },
        });
    });

    return {
        paths,
        fallback: 'blocking'
    }
}) satisfies GetStaticPaths


export const getStaticProps: GetStaticProps = async (context) => {
    const slug = Array.isArray(context.params?.slug) ? context.params.slug?.[0] : context.params?.slug;
    const originUrl = slug ? '/' + slug.replaceAll('_', '/') + '.html' : null;
    if (!originUrl) return { notFound: true };
    const post = await getPostByPath(originUrl);
    return {
        props: {
            data: post,
        },
        revalidate: 86400,
    };
};


const Post = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <>
        <Head>
            {data.title && <title>{DOMPurify.sanitize(data.title)}</title>}
            {data.title && <meta name="description" content={sanitizeDescription(data, 150)} />}

            {data.title && <meta name="og:title" content={DOMPurify.sanitize(data.title)} />}
            {data.images?.[0]?.url && <meta name="og:image" content={data.images[0].url} />}
            {data.title && <meta name="og:image:alt" content={DOMPurify.sanitize(data.title)} />}

            {data.title && <meta name="twitter:title" content={DOMPurify.sanitize(data.title)} />}
            {data.images?.[0]?.url && <meta name="twitter:image" content={data.images[0].url} />}
            {data.title && <meta name="twitter:image:alt" content={DOMPurify.sanitize(data.title)} />}
        </Head>
        <PostContent data={data} />
    </>;
}

export default Post