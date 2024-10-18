import React, { useEffect, useRef, useState } from 'react'
import { blogger_v3 } from 'googleapis';
import DOMPurify from "isomorphic-dompurify";
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './post-content.module.css';
import { setupDOMPurify } from '@/utilities';
import { showToast } from '../common/toast';
import { TbArrowBigUpLinesFilled, TbArrowBigUp } from "react-icons/tb";

const PostContent = ({ data, isPreview }: { data: blogger_v3.Schema$Post; isPreview?: boolean; }) => {
    const router = useRouter();
    const [isPurifySetup, setIsPurifySetup] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const postContentRef = useRef<HTMLDivElement>(null);

    const setup = async () => {
        if (!router) return;
        await setupDOMPurify();
        setIsPurifySetup(true);
    };

    const handleScroll = () => {
        if (postContentRef.current && postContentRef.current.scrollTop > 300) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };
    useEffect(() => {
        setup();
        const postContentElement = postContentRef.current;
        if (postContentElement) {
            postContentElement.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (postContentElement) {
                postContentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    if (!data?.content) return <div>Opp!.. Not found</div>;
    const clean = isPurifySetup ? DOMPurify.sanitize(data.content) : '';

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
                showToast({ message: 'Content shared successfully', status: 'success' });
            } catch (error) {
                showToast({ message: 'Share canceled', status: 'error' });
            }
        } else {
            showToast({ message: 'Web Share API not supported in this browser' });
        }
    };
    const handleScrollToTopClick = () => {
        if (postContentRef.current) {
            postContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (<div className={styles.wrapper}>
        {
            !isPreview && (
                <>
                    <button className={styles.backButton} onClick={handleBackClick} title='go back'>
                        <FaArrowLeft className={styles.icon} size={20} />
                    </button>
                    <button className={styles.shareButton} onClick={handleShareClick} title='share'>
                        <FaShareAlt className={styles.icon} size={20} />
                    </button>
                </>
            )
        }
        <div className={styles.postContent} ref={postContentRef}>
            <div dangerouslySetInnerHTML={{
                __html: clean
            }} />
        </div>
        {showScrollToTop && (
            <button className={styles.scrollToTopButton} onClick={handleScrollToTopClick} title='scroll to top'>
                <TbArrowBigUp className={`${styles.icon} ${styles.normal}`} size={20} />
                <TbArrowBigUpLinesFilled className={`${styles.icon} ${styles.floating}`} size={20} />
            </button>
        )}
    </div>)
}

export default PostContent