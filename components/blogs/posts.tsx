import { blogger_v3 } from 'googleapis';
import PostCard from './card';
import styles from './posts.module.css';
import Pagination from '../common/pagination';
import { useState } from 'react';
import NoData from '../common/blank/no-data';

const Posts = ({ data, loading }: { data: blogger_v3.Schema$Post[]; loading?: boolean; }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / postsPerPage);

    // Get the posts for the current page
    const currentPosts = data.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.posts}>
                {!data?.length
                    ? <NoData wrapperClassName='mt-32' />
                    : currentPosts.map((post: any) => {
                        return <PostCard
                            key={post.id}
                            data={post}
                            isLoading={loading}
                        />;
                    })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default Posts