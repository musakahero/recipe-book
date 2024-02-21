import { useContext} from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './CommentSection.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as commentService from '../../services/commentService'
import { RecipeComment } from '../RecipeDetails/RecipeComment/RecipeComment';
import { Button } from '../Button/Button';

export const CommentSection = ({comments, setComments, recipeId}) => {

    const navigate = useNavigate();
    const { token, isAuthenticated, username } = useContext(AuthContext);

    // Comment submit
    const onCommentSubmit = async (formValues) => {
        try {
            //validation - check for empty strings
            for (const field in formValues) {
                if (formValues[field] == false) {
                    throw Error('All fields must be filled.');
                }
            };
            changeValues({
                'content': '',
                'username': username
            }); //clears form values after submit
            const newComment = await commentService.createComment(recipeId, formValues.content, formValues.username, token); //post
            setComments(state => [...state, newComment]); // update comment state
            navigate(`/catalog/${recipeId}`);
        } catch (err) {
            alert(err.message)
        }
    };

    //comment form handling via useForm hook
    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        'content': '',
        'username': username
    }, onCommentSubmit);

    return (
        <>
            {/* All comments */}
            <div className={styles["comments-container"]} >
                {comments.length > 0 ? comments.map(x => <RecipeComment
                    key={x._id}
                    {...x}
                    setComments={setComments} />)
                    : <p className={styles["no-comments"]} >No comments posted yet.</p>}
            </div>
            {/* Comment Form */}
            {isAuthenticated() ?
                <form method="post" className={styles["comment-form"]} onSubmit={onSubmit}>
                    <label htmlFor="content">Add new comment:</label>
                    <textarea className={styles["comment-content"]} type="text" cols={30} rows={3} name="content" value={formValues.content} onChange={onChangeHandler} />
                    <Button type={'submit'} content={'Post'} />
                </form>
                : null}
        </>
    )
}