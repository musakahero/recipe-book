import styles from './RecipeDetails.module.css';
import clockIcon from '../../images/clock-icon.svg';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import * as recipeService from '../../services/recipeService'
import * as commentService from '../../services/commentService'
import { AuthContext } from '../../contexts/AuthContext';
import { CommentSection } from '../Comment Section/CommentSection';

export const RecipeDetails = () => {

    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);
    const { recipeId } = useParams();
    const [details, setDetails] = useState({});
    const [comments, setComments] = useState([]);

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


                <div className={styles["details-controls"]}>
                    {/* Show control buttons if user is authenticated & authorized */}
                    {isAuthenticated() && userId === details._ownerId ?
                        <div className={styles["controls-buttons"]}>
                            <Link className={styles["details-button"]} to={`/edit/${recipeId}`}>Edit</Link>
                            <Link className={styles["details-button"]} to={`/delete/${recipeId}`} >Delete</Link>
                        </div> : null}
                </div>
                <div className={styles["details-meta"]}>
                    <div className={styles["details-prepTime"]}>
                        <img src={clockIcon} className={styles["clock-icon"]} alt='Duration icon' />
                        <span>{details.prepTime}</span>
                    </div>
                    <span className={styles["details-difficulty"]}>Difficulty: {details.difficulty}</span>
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

            {/* Display Comment section */}
            <CommentSection comments={comments} setComments={setComments} recipeId={recipeId} />

        </div>
    )
}