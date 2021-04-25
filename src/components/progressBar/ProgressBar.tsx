import styles from './ProgressBar.module.css';
import { useContext } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext'

export function ProgressBar() {
    const { pointsProgress, levelGoal} = useContext(ApplicationContext);

    // create a const bar wich will increase its width in % according to the goal value
    const bar = pointsProgress * 100 / levelGoal;
    const widthBar = (bar == NaN ? 0 : bar);

    return (
        <div className={styles.progressBar__container}>
            {/* starting point */}
            <span>0 xp</span>
            {/* progress background*/}
            <div className={styles.progressBar}>
                {/* current progress: position will be replaced by variables */}
                <div className={styles.currentProgress} style={{ width: `${widthBar}%` }}>
                    {/* progress label */}
                    <span className={styles.progressLabel} style={{ left: `${bar}%` }}>{pointsProgress} xp</span>
                </div>
            </div>
            {/* ending point */}
            <span>{levelGoal} xp</span>
        </div>
    );
}