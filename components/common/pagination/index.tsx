import React from 'react';
import styles from './styles.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`${styles.pageNumber} ${i === currentPage ? styles.active : ''}`}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Trước
            </button>
            {renderPageNumbers()}
            <button
                className={styles.pageButton}
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sau
            </button>
        </div>
    );
};

export default Pagination;