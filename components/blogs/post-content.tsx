import React from 'react'
import { blogger_v3 } from 'googleapis';
import DOMPurify from "isomorphic-dompurify";
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './post-content.module.css';

const PostContent = ({ data }: { data: blogger_v3.Schema$Post }) => {
    const router = useRouter();
    if (!data?.content) return <div>Opp!.. Not found</div>;
    const clean = DOMPurify.sanitize(data.content);

    const handleBackClick = () => {
        router.back();
    };

    const handleShareClick = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this post!',
                    url: window.location.href,
                });
                console.log('Content shared successfully');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            console.error('Web Share API not supported in this browser');
        }
    };

    
    return (<div className={styles.wrapper}>
        <button className={styles.backButton} onClick={handleBackClick} title='go back'>
            <FaArrowLeft className={styles.icon} size={20} />
        </button>
        <button className={styles.shareButton} onClick={handleShareClick} title='share'>
                <FaShareAlt className={styles.icon} size={20} />
            </button>
        <div className={styles.postContent}>
            <div dangerouslySetInnerHTML={{
                __html: clean
            }} />
        </div>

    </div>)
}

export default PostContent