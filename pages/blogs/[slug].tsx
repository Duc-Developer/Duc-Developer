import { getBlogByPath, getBlogInfo, getPosts } from '@/services/blogs';
import type {
    InferGetStaticPropsType,
    GetStaticPaths,
} from 'next'
import DOMPurify from "isomorphic-dompurify";

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
        const pattern = /https?:\/\/codecungdavid\.blogspot\.com\/([0-9]+)\/([0-9]+)\/(.*).html$/g;
        const match = post.url ? pattern.exec(post.url) : null;
        if (!match) return;
        const newUrl = match[1] + '_' + match[2] + '_' + match[3];
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
    if (!data?.content) return <div>Opp!.. Not found</div>;
    const clean = DOMPurify.sanitize(data.content);
    return (
        <div
            style={{
                color: '#000',
                padding: '1.8rem 2rem',
                margin: '0 8rem',
                maxHeight: 'calc(100vh - 12rem)',
                overflowY: 'auto',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
            }}
        >
            <div dangerouslySetInnerHTML={{
                __html: clean
            }} />
        </div>
    )
}

export default Post