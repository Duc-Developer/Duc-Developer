import Image from 'next/image';
import styles from './card.module.css'
import { blogger_v3 } from 'googleapis';
import { sanitizeDescription, SlugConverter } from '@/utilities';
import Link from 'next/link';
import { showToast } from '../common/toast';
import { FaShareAlt } from 'react-icons/fa';
import { IMAGE_SRC_DEFAULT } from '@/constants';

type Props = { data: blogger_v3.Schema$Post; isLoading?: boolean; placeholder?: string; };
const PostCard = ({ data, isLoading, placeholder = IMAGE_SRC_DEFAULT }: Props) => {
    const cleanedContent = sanitizeDescription(data);
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
    return <div className={styles.wrapper}>
        <div className={styles.cardHover}>
            {isLoading ? (
                <div className="animate-pulse">
                    <div className="bg-gray-300 h-56 w-full rounded"></div>
                </div>
            ) : <Image
                className={styles.cardHoverThumbnail}
                src={data.images?.[0].url ?? ''}
                alt="blog-post"
                width={200}
                height={150}
                overrideSrc={placeholder}
            />}
            <div className={styles.cardHoverContent}>
                {isLoading ? (
                    <div className="animate-pulse">
                        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                        <div className="bg-gray-300 h-16 w-full rounded"></div>
                    </div>
                ) : <>
                    <h3 className={styles.cardHoverTitle} title={data.title ?? ''}>
                        {data.title}
                    </h3>
                    <p className={styles.cardHoverText}>
                        <span>{cleanedContent}</span>
                    </p>
                </>
                }
            </div>
            <div className={styles.cardHoverFooter}>
                {isLoading ? (
                    <div className="animate-pulse flex space-x-4 px-2">
                        <div className="bg-gray-300 h-8 grow rounded"></div>
                        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
                    </div>
                ) :
                    <>
                        <Link
                            href={`blogs/${SlugConverter.toPostSlug(data.url) ?? '#not-found'}`}
                            className={styles.cardHoverLink}
                            data-replace="Đọc tiếp"
                        >
                            <span>Đọc tiếp</span>
                        </Link>
                        <button className={styles.shareButton} onClick={handleShareClick} title='share'>
                            <FaShareAlt className={styles.shareIcon} size={18} />
                        </button>
                    </>
                }
            </div>
        </div>
    </div>;
}

export default PostCard