import { getBlogInfo, getPosts } from "@/services/blogs";
import { InferGetStaticPropsType } from "next";
import Posts from "@/components/blogs/posts";

export const getStaticProps = async (context: any) => {
    const blogInfo = await getBlogInfo();
    const { posts } = await getPosts({
        fetchImages: true,
        fetchBodies: true,
        view: 'READER',
        maxResults: blogInfo.posts?.totalItems ?? 500,
    }) ?? [];

    if (!posts) return { notFound: true };
    return {
        props: {
            posts,
        },
    };
};


const Blogs = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <Posts data={posts} />;
};

export default Blogs;