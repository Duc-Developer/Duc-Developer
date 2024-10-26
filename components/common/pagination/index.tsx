import React from 'react';
import styles from './styles.module.css';
import { useTranslation } from '@/hooks/useTranslation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, prevPage }) => {
    const { t } = useTranslation('common');
    return (
        <div className={styles.pagination}>
            <p className={styles.pageInfo}>
                {t('page_in_total', { current: currentPage.toString(), total: totalPages.toString() })}
            </p>
            <button
                className={styles.pageButton}
                onClick={prevPage}
                disabled={currentPage === 1 || totalPages === 0}
            >
                {t('previous')}
            </button>
            <button
                className={styles.pageButton}
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                {t('next')}
            </button>
        </div>
    );
};

export default Pagination;
