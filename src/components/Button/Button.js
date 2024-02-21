import styles from './Button.module.css';

export const Button = ({ content, type, onClickHandler}) => {

    return (
        <button type={type} className={styles.button} onClick={onClickHandler}>{content} </button>
    )
}