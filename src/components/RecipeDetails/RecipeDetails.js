import styles from './RecipeDetails.module.css';
import clockIcon from '../../images/clock-icon.svg';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import * as recipeService from '../../services/recipeService'
import * as commentService from '../../services/commentService'
import { AuthContext } from '../../contexts/AuthContext';
import { RecipeComment } from './RecipeComment/RecipeComment';
import { Button } from './../Button/Button';

export const RecipeDetails = () => {

    const navigate = useNavigate();
    const { token, isAuthenticated, username, userId } = useContext(AuthContext);
    const { recipeId } = useParams();
    const [details, setDetails] = useState({});
    const [comments, setComments] = useState([]);

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

    }

    //comment form handling via useForm hook
    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
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
            .catch(err => { //Handle server down situation
                navigate('/nodata');
            })
    }, [recipeId]);

    return (
        <div className={styles["details"]}>
            <div className={styles["details-container"]} >
                <h1 className={styles["details-title"]} >{details.name}</h1>
                <div className={styles["details-controls"]} >
                    <div className={styles["details-prepTime"]}>
                        <img src={clockIcon} className={styles["clock-icon"]} />
                        <span>{details.prepTime}</span>
                    </div>
                    {isAuthenticated() && userId === details._ownerId ?
                        <div className={styles["controls-buttons"]}>
                            <Link className={styles["details-button"]} to={`/edit/${recipeId}`}>Edit</Link>
                            <Link className={styles["details-button"]} to={`/delete/${recipeId}`} >Delete</Link>
                        </div> : null}

                </div>
                {/* Check if there's any img URL provided. If not, put a backup img div */}
                {details.img !== '' ?
                    <div className={styles["details-img-container"]} style={{ backgroundImage: `url(${details.img})` }}>
                    </div>
                    : <div className={styles["details-img-container-backup"]} ></div>
                }
                <div className={styles["details-summary"]} >
                    <ul className={styles["details-summary-ingredients"]} >Ingredients: {details.ingredients &&
                        details.ingredients.map(x => <li key={x}>{x}</li>)}
                    </ul>
                </div>
                <div className={styles["details-steps"]} >
                    <p>{details.steps}</p>
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
                    <Button type={'submit'} content={'Post'} />
                </form>
                : null}

        </div>
    )
}