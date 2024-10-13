import styles from './loading-page.module.css';

const LoadingPage = () => {
    return (
        <div className={styles.wrapper} >
            <div className={styles.loader} data-content="Loading" />
        </div>
    );
};

export default LoadingPage;