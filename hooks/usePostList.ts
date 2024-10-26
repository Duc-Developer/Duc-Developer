import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchPosts } from '@/services/posts';

import { ResponseData as PostResponses } from "@/pages/api/posts";

const usePostList = (searchKey: string, pageSize: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageToken, setPageToken] = useState<string | undefined>(undefined);

    const { data, isLoading, isFetching, error, refetch } = useQuery<PostResponses>({
        queryKey: ['posts'],
        queryFn: () => searchPosts({
            fetchImages: true,
            fetchBodies: true,
            view: 'READER',
            maxResults: pageSize,
            status: ['LIVE'],
            q: searchKey,
            pageToken,
        })
    });

    const refetchWithPageToken = (newPage: number, token?: string) => {
        setPageToken(newPage === 1 ? undefined :token);
        setCurrentPage(newPage);
        setTimeout(() => refetch(), 0);
    }

    return {
        currentPage: currentPage,
        posts: data?.posts ?? [],
        totalItems: data?.totalItems || 0,
        isFetching,
        isLoading,
        error,
        resetWithFetch: () => refetchWithPageToken(1),
        nextPage: () => refetchWithPageToken(currentPage + 1, data?.nextPageToken || undefined),
        prevPage: () => refetchWithPageToken(currentPage - 1, data?.prevPageToken || undefined,),
    };
};

export default usePostList;