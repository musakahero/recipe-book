import { Link } from 'react-router-dom';
import styles from './RecipeComment.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export const RecipeComment = ({ _ownerId, content, username, _id }) => {
    const { userId } = useContext(AuthContext);
    return (
        <div className={styles["comment-container"]}>
            <p className={styles["comment-owner"]}>User: {username}</p>

            <div className={styles["comment-controls"]}>
                {userId === _ownerId ? 
                <>
                    <Link className={styles["comment-button"]}>Delete</Link>
                    <Link className={styles["comment-button"]}>Edit</Link>
                </> 
                : null}
            </div>

            <p className={styles["comment-body"]}>{content}</p>
        </div>
    )
}