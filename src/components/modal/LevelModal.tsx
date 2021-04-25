import styles from './LevelModal.module.css';
import { ApplicationContext } from '../../context/ApplicationContext'
import { useContext } from 'react';
import { CountdownContext } from '../../context/CountdownContext';

export function LevelModal() {
    const { level } = useContext(ApplicationContext);
    const { closeModal } = useContext(CountdownContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.modal__container} >
                <button type="button" className={styles.modal__button} onClick={closeModal}>x</button>
                <header>
                    <h2>Level {level}</h2>
                </header>
                <strong>Congratulations!!</strong>
                <p>You have updated a level!</p>
                <p>Keep focused and respect your breaks!</p>
            </div>
        </div>
    )
}
