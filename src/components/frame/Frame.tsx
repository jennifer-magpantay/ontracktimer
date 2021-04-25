import styles from './Frame.module.css';

function Frame({children}) {
    return (
        <div className={styles.frame__container}>
            {children}
        </div>
    )
}

export default Frame;
