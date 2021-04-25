import styles from './Button.module.css'; 

export function Button({children, onClickBtn, disableStatus, buttonStyle}) {
    return(
        <button type="button" className={`${styles.button} ${buttonStyle}`} onClick={onClickBtn} disabled={disableStatus} >{children}</button>
    );
}

export function ButtonCompleted ({children, onClickBtn, buttonStyle}){
    return(
        <button type="button" className={`${styles.button} ${buttonStyle}`} onClick={onClickBtn}>{children}</button>
    );
}