import styles from './Header.module.css';
import format from 'date-fns/format';
import enGB from 'date-fns/locale/en-GB';
import { ProgressBar } from '../progressBar/ProgressBar';

export function Header() {
    // create a const for the date
    const currentDate = format(new Date(), `E, d MMM`);
    return (
        <header className={styles.header__container}>
            {/* logo */}
            <img src='/logo.png'
            alt="OnTrack Timer logo" />
            {/* progress bar */}
            <ProgressBar />
            {/* date */}
            <span className={styles.header__date}>{currentDate}</span>
        </header>
    )
}
