import styles from './RecipeDetails.module.css';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import * as recipeService from '../../services/recipeService'
import * as commentService from '../../services/commentService'
// import { RecipeContext } from '../../contexts/RecipeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { RecipeComment } from './RecipeComment/RecipeComment';

export const RecipeDetails = () => {

    const navigate = useNavigate();
    const { token, isAuthenticated, username, userId } = useContext(AuthContext);
    const { recipeId } = useParams();
    const [details, setDetails] = useState({});
    const [comments, setComments] = useState([]);

    // Comment submit
    const onCommentSubmit = async (formValues) => {
        try {
            const newComment = await commentService.createComment(recipeId, formValues.content, formValues.username, token); //post
            setComments(state => [...state, newComment]); // update comment state
            navigate(`/catalog/${recipeId}`);
        } catch (err) {
            alert(err.message)
        }

    }

    //comment form handling via useForm hook
    const { formValues, onChangeHandler, onSubmit } = useForm({
        'content': '',
        'username': username
    }, onCommentSubmit);

    //get one request and save the details to state
    useEffect(() => {
        Promise.all([
            recipeService.getOne(recipeId),
            commentService.getAllComments(recipeId)])
            .then(([recipeData, comments]) => {
                setDetails(recipeData);
                setComments(comments);
            })
    }, [recipeId]);


    return (
        <div className={styles["details"]}>
            <div className={styles["details-container"]} >
                <h1 className={styles["details-title"]} >{details.name}</h1>
                <div className={styles["details-controls"]} >
                    {isAuthenticated() && userId === details._ownerId ?
                        <>
                            <Link className={styles["details-button"]} to={`/edit/${recipeId}`}>Edit</Link>
                            <Link className={styles["details-button"]} to={`/delete/${recipeId}`} >Delete</Link>
                        </> : null}

                </div>
                {/* Check if there's any img URL provided. If not, put a backup img div */}
                {details.img !== '' ?
                    <div className={styles["details-img-container"]} style={{ backgroundImage: `url(${details.img})` }}>
                    </div>
                    : <div className={styles["details-img-container-backup"]} ></div>
                }
                <div className={styles["details-summary"]} >
                    <p className={styles["details-summary-prepTime"]} >Preparation time: {details.prepTime} </p>
                    <ol className={styles["details-summary-ingredients"]} >Ingredients: {details.ingredients &&
                        details.ingredients.map(x => <li key={x}>{x}</li>)}
                    </ol>
                </div>
                <div className={styles["details-steps"]} >
                    <p>stepstetepeppss</p>
                </div>
            </div>

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
                    <button type="submit" className={`${styles["btn"]} ${styles["comment-submit"]}`}>Post comment</button>
                </form>
                : null}
        </div>
    )
}