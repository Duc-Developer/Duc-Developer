import Image from 'next/image';
import styles from './card.module.css'
import { blogger_v3 } from 'googleapis';
import { formatDate, sanitizeDescription, SlugConverter } from '@/utilities';
import Link from 'next/link';
import { showToast } from '../common/toast';
import { FaShareAlt } from 'react-icons/fa';
import { IMAGE_SRC_DEFAULT } from '@/constants';
import { useTranslation } from '@/hooks/useTranslation';
import { classNames } from '@/lib/utils';
import { useRouter } from 'next/router';

type Props = { data: blogger_v3.Schema$Post; isLoading?: boolean; placeholder?: string; };
const PostCard = ({ data, isLoading, placeholder = IMAGE_SRC_DEFAULT }: Props) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const cleanedContent = sanitizeDescription(data);

    const handleShareClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
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

    return <div
        className={classNames(
            styles.card,
            "bg-astronaut50 backdrop-blur15 border-8 border-astronaut50",
            isLoading ? 'loading' : ''
        )}
        onClick={() => {
            router.push(`/blogs/${SlugConverter.toPostSlug(data.url) ?? '/not-found'}`)
        }}
    >
        {isLoading ? (
            <div className="animate-pulse">
                <div className="absolute top-0 left-0 bg-gray-300 h-64 w-full rounded"></div>
            </div>)
            : <Image
                src={data.images?.[0].url ?? ''}
                alt="blog-post"
                width={200}
                height={150}
                overrideSrc={placeholder}
                className={styles.thumbnail}
            />}
        {
            isLoading ? (
                <div className="animate-pulse w-full flex flex-col justify-between gap-4">
                    <div className="bg-gray-300 h-40 w-full rounded"></div>
                    <div className="bg-gray-300 h-8 w-full rounded"></div>
                </div>
            ) : <div className={styles.info}>
                <div className={styles.headerInfo}>
                    {data.author?.displayName && <div className={styles.author}>{data.author.displayName}</div>}
                    {data.published && <div className={styles.date}>{formatDate(data.published)}</div>}
                </div>
                <p className={styles.title}>{data.title}</p>
                <p className={styles.description}>
                    {cleanedContent}
                </p>
                <div className={styles.footer}>
                    {
                        data?.labels?.[0] && <div className={styles.tag}>
                            {data.labels[0]}
                        </div>
                    }
                    <div className={styles.actions}>
                        <button
                            className={styles.shareButton}
                            onClick={handleShareClick}
                            title={t('share')}
                        >
                            <FaShareAlt className={styles.shareIcon} size={20} />
                        </button>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default PostCard