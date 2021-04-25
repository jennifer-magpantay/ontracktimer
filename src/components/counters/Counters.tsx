import styles from './Counters.module.css';
import { useContext } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext'

export function Counters() {
    const { level, totalScore, rounds} = useContext(ApplicationContext);

    return (
        <div className={styles.counters__container}>
            <p>
                Level: <span>{level}</span>
            </p>
            <div className={styles.counter}>
                <p>Total score</p>
                <p><span>{totalScore}</span></p>
            </div>
            <div className={styles.counter}>
                <p>Rounds Completed</p>
                <p><span>{rounds}</span></p>
            </div>
        </div>
    );
}