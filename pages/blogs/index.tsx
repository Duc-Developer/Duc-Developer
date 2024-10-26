'use client';

import Posts from "@/components/blogs/posts";
import { useEffect, useState } from "react";
import SearchBox from "@/components/common/input/search-box";
import { showToast } from "@/components/common/toast";
import useDebounce from "@/hooks/useDebounce";
import { IMAGE_SRC_DEFAULT } from "@/constants";
import usePostList from "@/hooks/usePostList";

export const PAGE_SIZE = 12;
const PostSkeleton: any = Array.from({ length: PAGE_SIZE }).fill({
    title: 'Sample Blog Post',
    images: [{ url: IMAGE_SRC_DEFAULT }],
    content: "<p>Sample content</p>"
}, 0);

const Blogs = () => {
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search, 500);
    const {
        posts,
        totalItems,
        currentPage,
        isFetching,
        error,
        resetWithFetch,
        nextPage,
        prevPage
    } = usePostList(searchDebounce, PAGE_SIZE);

    useEffect(() => {
        if (error) {
            showToast({ status: 'error', message: error.message });
        }
    }, [error]);

    useEffect(() => {
        resetWithFetch();
    }, [searchDebounce]);

    return <>
        <SearchBox className="mb-4" value={search} onChange={setSearch} />
        {
            <Posts
                loading={isFetching}
                data={isFetching ? PostSkeleton : (posts ?? [])}
                nextPage={nextPage}
                prevPage={prevPage}
                totalItems={totalItems}
                currentPage={currentPage}
            />
        }
    </>;
};

export default Blogs;