"use client";

import { getPosts } from "@/services/blogs";
import { useEffect, useState } from "react";

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        const fetchPosts = async () => {
            // setLoading(true);
            // try {
            //     const posts = await getPosts({
            //         fetchImages: false,
            //         fetchBodies: false,
            //         view: 'READER',
            //         maxResults: 10,
            //     }) ?? [];
            //     setPosts(posts);
            // } catch (error) {
            //     setError(error);
            // } finally {
            //     setLoading(false);
            // }
        };
        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message}</div>;

    if (!posts?.length) return <div>No post</div>

    return (
        <div>
            {
                posts.map((post: any) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Blogs;