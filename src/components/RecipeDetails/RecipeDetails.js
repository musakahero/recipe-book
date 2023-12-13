import './RecipeDetails.css';
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import * as recipeService from '../../services/recipeService'
import * as commentService from '../../services/commentService'
// import { RecipeContext } from '../../contexts/RecipeContext';
import { AuthContext } from '../../contexts/AuthContext';

export const RecipeDetails = () => {

    // const { onCommentSubmit } = useContext(RecipeContext);
    const navigate = useNavigate();
    const { token, isAuthenticated } = useContext(AuthContext);
    const { recipeId } = useParams();
    const [details, setDetails] = useState({});
    const [comments, setComments] = useState({});

    // Comment submit
    const onCommentSubmit = async (formValues) => {
        const newComment = await commentService.createComment(recipeId, formValues.comment, token); //post
        setComments(state => [...state, newComment]); // update comment state
        navigate(`/catalog/${recipeId}`);
    }

    //comment form handling via useForm hook
    const { formValues, onChangeHandler, onSubmit } = useForm({
        'content': '',
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


    //TODO: UPDATE IMG
    const img = '';

    return (
        <div className="details">
            <div className="details-container">
                <h1 className="details-title">{details.name}</h1>
                {/* Check if there's any img URL provided. If not, put a backup img div */}
                {img !== '' ?
                    <div className="details-img-container" style={{ backgroundImage: `url(${img})` }}>
                    </div>
                    : <div className="details-img-container-backup"></div>
                }
                <div className="details-summary">
                    <p className="details-summary-prepTime">Preparation time: {details.prepTime} </p>
                    <ol className="details-summary-ingredientsCount">Ingredients: {details.ingredients ? details.ingredients.map(x => <li key={x}>{x}</li>) : null}
                    </ol>
                </div>
                <div className="details-steps">
                    <p>stepstetepeppss</p>
                </div>
                {/* All comments */}

                {/* Comment Form */}
                {isAuthenticated() ?
                    <form method="post" className="comment-form" onSubmit={onSubmit}>
                        <label htmlFor="content">Add new comment:</label>
                        <input className="comment-content" type="text" name="content" value={formValues.content} onChange={onChangeHandler} />
                        <button type="submit" className="btn comment-submit">Post comment</button>
                    </form>
                    : null}


            </div>
        </div>
    )
}