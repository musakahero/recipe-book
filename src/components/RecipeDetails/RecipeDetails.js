import styles from './RecipeDetails.module.css';
import clockIcon from '../../images/clock-icon.svg';
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import * as recipeService from '../../services/recipeService';
import * as commentService from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';
import { CommentSection } from '../Comment Section/CommentSection';
import { Button } from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import useSort from './../../hooks/'

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
            <h1 className={styles["details-title"]} >{details.name}</h1>
            <div className={styles["details-container"]} >

                <div className={styles["details-controls"]}>
                    {/* Show control buttons if user is authenticated & authorized */}
                    {isAuthenticated() && userId === details._ownerId ?
                        <div className={styles["controls-buttons"]}>
                            <Button content={<FontAwesomeIcon icon={faEdit} />} type={'button'} onClickHandler={() => navigate(`/edit/${recipeId}`)} />
                            <Button content={<FontAwesomeIcon icon={faTrash} />} type={'button'} onClickHandler={() => navigate(`/delete/${recipeId}`)} />
                        </div> : null}
                </div>
                <div className={styles["details-meta"]}>
                    <div className={styles["details-prepTime"]}>
                        <img src={clockIcon} className={styles["clock-icon"]} alt='Duration icon' />
                        <span>{details.prepTime} min</span>
                    </div>
                    <span className={styles["details-difficulty"]}>Difficulty: <span className={styles['difficulty-value']}>{details.difficulty}</span></span>
                </div>
                <div className={styles["details-img-container"]} style={{ backgroundImage: `url(${details.img})` }}>
                    </div>
                    
                <div className={styles["details-summary"]} >
                    <ul className={styles["details-summary-ingredients"]} ><h4>Ingredients:</h4> {details.ingredients &&
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