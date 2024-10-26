import { blogger_v3 } from 'googleapis';
import PostCard from './card';
import styles from './posts.module.css';
import Pagination from '../common/pagination';
import { useState } from 'react';
import NoData from '../common/blank/no-data';
import { PAGE_SIZE } from '@/pages/blogs';

interface Props {
    data: blogger_v3.Schema$Post[];
    loading?: boolean;
    totalItems: number;
    currentPage: number;
    nextPage: () => void;
    prevPage: () => void;
}
const Posts = ({ data, loading, totalItems, currentPage, nextPage, prevPage }: Props) => {

    const totalPage = Math.ceil(totalItems / PAGE_SIZE);
    return (
        <div className={styles.wrapper}>
            <div className={styles.posts}>
                {!data?.length
                    ? <NoData wrapperClassName='mt-32' />
                    : data.map((post: any, index) => {
                        return <PostCard
                            key={loading ? index : post.id}
                            data={post}
                            isLoading={loading}
                        />;
                    })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}

export default Posts