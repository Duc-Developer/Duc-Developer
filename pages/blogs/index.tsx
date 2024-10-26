'use client';

import Posts from "@/components/blogs/posts";
import { useEffect, useState } from "react";
import SearchBox from "@/components/common/input/search-box";
import { showToast } from "@/components/common/toast";
import useDebounce from "@/hooks/useDebounce";
import { IMAGE_SRC_DEFAULT } from "@/constants";
import usePostList from "@/hooks/usePostList";
import Select from "@/components/common/select";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import { Category } from "../api/posts/category/list";
import { Option } from "@/components/common/select";

export const PAGE_SIZE = 12;
const PostSkeleton: any = Array.from({ length: PAGE_SIZE }).fill({
    title: 'Sample Blog Post',
    images: [{ url: IMAGE_SRC_DEFAULT }],
    content: "<p>Sample content</p>"
}, 0);

const Blogs = () => {
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search, 500);
    const [selectedCategory, setSelectedCategory] = useState<string>('null');

    const {
        posts,
        totalItems,
        currentPage,
        isFetching,
        error,
        resetWithFetch,
        nextPage,
        prevPage
    } = usePostList({
        searchKey: searchDebounce,
        pageSize: PAGE_SIZE,
        labels: selectedCategory === 'null' ? undefined : [selectedCategory]
    });

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await getCategories();
            return data.data ?? [];
        }
    });

    useEffect(() => {
        if (error) {
            showToast({ status: 'error', message: error.message });
        }
    }, [error]);

    useEffect(() => {
        resetWithFetch();
    }, [searchDebounce]);


    const handleChooseCategory = (option: Option) => {
        setSelectedCategory(option.value);
        resetWithFetch();
    };

    return <>
        <div className="flex gap-4 justify-center mb-4">
            <Select
                className="w-24 md:w-36"
                options={categories}
                selected={selectedCategory}
                onChange={handleChooseCategory}
            />
            <div className="w-60 md:w-96">
                <SearchBox
                    value={search}
                    onChange={setSearch}
                    placeholder="search_placeholder"
                />
            </div>
        </div>
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