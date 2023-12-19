import styles from './RecipeComment.module.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import * as commentService from '../../../services/commentService';
import { useForm } from '../../../hooks/useForm';

export const RecipeComment = ({ _ownerId, content, username, _id, setComments, recipeId }) => {
    const navigate = useNavigate();
    const { userId, token } = useContext(AuthContext);
    const [isEdited, setIsEdited] = useState(false);

    const onEditSubmit = async (formValues) => {
        const newComment = await commentService.editComment(_id, content, username, token); //put
        setComments(state => [state.filter(comment => comment._id !== _id), newComment]); // update all comments state
        navigate(`/catalog/${recipeId}`);
    }

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        'content': '',
        'username': username
    }, onEditSubmit);

    //On clicking Edit, show the form and run a getOne request for the comment we edit, then change initial formValues in useForm hook
    const onEditClick = async () => {
        setIsEdited(true);
        const result = await commentService.getOneComment(_id);
        changeValues(result);
    }

    //check css importing
    return (

        <div className={styles["comment-container"]}>


            <ul className={styles["comment-controls"]}>
                {userId === _ownerId &&
                    <>
                        <li onClick={onEditClick} className={styles["comment-button"]}>Edit</li>
                        <li className={styles["comment-button"]}>Delete</li>
                    </>}
            </ul>


            {isEdited ?
                <form method='post' onSubmit={onSubmit} className={styles['comment-form']}>
                    <label htmlFor="newContent">Edit comment: </label>
                    <textarea name="newContent" cols={30} rows={3} value={formValues.content} onChange={onChangeHandler}></textarea>
                    <button type='submit' className={styles["comment-button"]}>Save</button>
                    <button type='button' className={styles["comment-button"]} onClick={() => setIsEdited(false)}>Discard</button>
                </form>
                : (<>
                    <p className={styles["comment-owner"]}>User: {username}</p>
                    <p className={styles["comment-body"]}>{content}</p>
                </>

                )}

        </div>
    )
}