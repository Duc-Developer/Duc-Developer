import React from 'react';
import styles from './styles.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, nextPage, prevPage }) => {

    return (
        <div className={styles.pagination}>
            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                className={styles.pageButton}
                onClick={prevPage}
                disabled={currentPage === 1 || totalPages === 0}
            >
                Previous
            </button>
            <button
                className={styles.pageButton}
                onClick={nextPage}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
