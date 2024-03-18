import styles from './RecipeComment.module.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import * as commentService from '../../../services/commentService';
import { useForm } from '../../../hooks/useForm';
import { Button } from '../../Button/Button';

export const RecipeComment = ({ _ownerId, content, username, _id, setComments, recipeId }) => {
    const navigate = useNavigate();
    const { userId, token } = useContext(AuthContext);
    const [isEdited, setIsEdited] = useState(false); //form appears if isEdited=true

    const onEditSubmit = async (formValues) => {
        try {
            changeValues({ content: '' });
            const newComment = await commentService.editComment(_id, recipeId, formValues.content, username, token); //put
            setComments(state => [...state.filter(comment => comment._id !== _id), newComment]); // update all comments state
            setIsEdited(false); //close the form dialogue
            navigate(`/catalog/${recipeId}`);
        } catch (err) {
            alert(err.message);
        }
    }

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        content: '',
    }, onEditSubmit);

    //On clicking Edit, display the form then change initial formValues in useForm hook
    const onEditClick = () => {
        setIsEdited(true);
        changeValues({ _ownerId, content, username, _id });
    }
    //Delete comment
    const onDeleteClick = async () => {
        try {
            await commentService.deleteComment(_id, token);
        } catch (err) {
            alert(err.message)
        }
        setComments(state => [...state.filter(x => x._id !== _id)]); //update state
    }

    return (
        <div className={styles["comment-container"]}>
            {isEdited ?
                <>
                    <label htmlFor="content" className={styles["comment-owner"]}>Edit comment: </label>
                    <form method='post' onSubmit={onSubmit} className={styles['comment-body']}>
                        <textarea name="content" cols={29} rows={2} value={formValues.content} onChange={onChangeHandler} />
                        <div className={styles['comment-controls']}>
                            <Button type={'submit'} content={'Save'}/>
                            <Button type={'button'} onClickHandler={onDeleteClick} content={'Delete'}/>
                            <Button type={'button'} onClickHandler={() => setIsEdited(false)} content={'Cancel'}/>
                        </div>
                    </form>
                </>
                : (<>
                    <p className={styles["comment-owner"]}>User: {username}</p>
                    <div className={styles["comment-body"]}>
                        <p className={styles["comment-content"]}>{content}</p>
                        <div className={styles["comment-controls"]}>
                            {userId === _ownerId &&
                                <>
                                    <Button type={'button'} onClickHandler={onEditClick} content={'Edit'}/>
                                    <Button type={'button'} onClickHandler={onDeleteClick} content={'Delete'}/>
                                </>}
                        </div>
                    </div>

                </>
                )}
        </div>
    )
}