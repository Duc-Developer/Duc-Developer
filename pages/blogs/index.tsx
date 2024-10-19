'use client';

import Posts from "@/components/blogs/posts";
import { useEffect, useState } from "react";
import { searchPosts } from "@/services/posts";
import { ResponseData as PostResponses } from "@/pages/api/posts";
import SearchBox from "@/components/common/input/search-box";
import { showToast } from "@/components/common/toast";
import useDebounce from "@/hooks/useDebounce";
import { IMAGE_SRC_DEFAULT } from "@/constants";

const PostSkeleton: any = Array.from({ length: 12 }).fill({
    title: 'Sample Blog Post',
    images: [{ url: IMAGE_SRC_DEFAULT }],
    content: "<p>Sample content</p>"
}, 0);
const Blogs = () => {
    const [posts, setPosts] = useState<PostResponses['posts']>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search, 500);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const data = await searchPosts({
                fetchImages: true,
                fetchBodies: true,
                view: 'READER',
                maxResults: 500,
                q: searchDebounce
            });
            setPosts(data.posts);
        } catch (error) {
            showToast({ message: 'Failed to fetch posts', status: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [searchDebounce]);

    return <>
        <SearchBox className="mb-4" value={search} onChange={setSearch} />
        {
            <Posts loading={loading} data={loading ? PostSkeleton : (posts ?? [])} />
        }
    </>;
};

export default Blogs;