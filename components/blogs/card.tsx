import Image from 'next/image';
import styles from './card.module.css'
import { blogger_v3 } from 'googleapis';
import { sanitizeDescription, SlugConverter } from '@/utilities';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";

const PostCard = ({ data }: { data: blogger_v3.Schema$Post }) => {
    const cleanedContent = sanitizeDescription(data);
    return <div className={styles.wrapper}>
        <div className={styles.cardHover}>
            <div className={styles.cardHoverBackground} />
            <div className={styles.cardHoverContent}>
                <h3 className={styles.cardHoverTitle}>
                    {data.title}
                </h3>
                <p className={styles.cardHoverText}>
                    <span>{cleanedContent}</span>
                </p>
                <Link href={`blogs/${SlugConverter.toPostSlug(data.url) ?? '#not-found'}`} className={styles.cardHoverLink}>
                    <span>Xem tiếp</span>
                    <FaArrowRight />
                </Link>
            </div>
            <div className={styles.cardHoverExtra}>
                <h4 className={styles.cardHoverTextExtra}>Nếu thấy hay đừng quên <span>like</span> và <span>share</span> cho mình nhé!</h4>
                <i>www.codecungdavid.blogspot.com</i>
            </div>
            <Image
                className={styles.cardHoverThumbnail}
                src={data.images?.[0].url ?? ''}
                alt="blog-post"
                width={200}
                height={150}
            />
        </div>
    </div>;
}

export default PostCard