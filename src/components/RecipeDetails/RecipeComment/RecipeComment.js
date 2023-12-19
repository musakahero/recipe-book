import styles from './RecipeComment.module.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import * as commentService from '../../../services/commentService';
import { useForm } from '../../../hooks/useForm';

export const RecipeComment = ({ _ownerId, content, username, _id, setComments, recipeId }) => {
    const navigate = useNavigate();
    const { userId, token } = useContext(AuthContext);
    const [isEdited, setIsEdited] = useState(false); //form appears if isEdited=true

    const onEditSubmit = async (formValues) => {
        const newComment = await commentService.editComment(_id, recipeId, formValues.content, username, token); //put
        setComments(state => [...state.filter(comment => comment._id !== _id), newComment]); // update all comments state
        setIsEdited(false); //close the form dialogue
        navigate(`/catalog/${recipeId}`);
    }
    
    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        content: '',
    }, onEditSubmit);

    //On clicking Edit, display the form then change initial formValues in useForm hook
    const onEditClick = () => {
        setIsEdited(true);
        changeValues({_ownerId, content, username, _id});
    }
    //Delete comment
    const onDeleteClick = async () => {
        try {
            await commentService.deleteComment(_id, token);     
        } catch (err) {
           alert(err.message) 
        }
        setComments( state => [...state.filter(x => x._id !== _id)]); //update state
    }

    return (
        <div className={styles["comment-container"]}>
            <ul className={styles["comment-controls"]}>
                {userId === _ownerId &&
                    <>
                        <li onClick={onEditClick} className={styles["comment-button"]}>Edit</li>
                        <li onClick={onDeleteClick} className={styles["comment-button"]}>Delete</li>
                    </>}
            </ul>
            {/* open form if Edit is clicked */}
            {isEdited ?
                <form method='post' onSubmit={onSubmit} className={styles['comment-form']}>
                    <label htmlFor="content">Edit comment: </label>
                    <textarea name="content" cols={30} rows={3} value={formValues.content} onChange={onChangeHandler} />
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