import styles from './Button.module.css';

export const Button = ({ content, type }) => {

    return (
        <button type={type} className={styles.button}>{content}</button>
    )
}