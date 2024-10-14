import styles from './loading-list.module.css';

const LoadingList = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.loader} />
    </div>
  )
}

export default LoadingList