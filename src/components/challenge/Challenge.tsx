import styles from './Challenge.module.css';
import { useContext } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext'

export function Challenge({children}) {
  const { challengeMessage} = useContext(ApplicationContext);

    return (
        <div className={styles.challenge__container}>
            <h2 className={styles.challenge__title}>{challengeMessage.title}</h2>
            <p className={styles.challenge__description}>{challengeMessage.description}</p>
            {children}
        </div>
    )
}

