import { blogger_v3 } from 'googleapis';
import PostCard from './card';
import styles from './posts.module.css';
import Pagination from '../common/pagination';
import { useState } from 'react';

const Posts = ({ data }: { data: blogger_v3.Schema$Post[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

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
                    ? <div>No post</div>
                    : currentPosts.map((post: any) => <PostCard key={post.id} data={post} />)}


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