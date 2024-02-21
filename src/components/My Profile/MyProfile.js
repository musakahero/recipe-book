import styles from './MyProfile.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as recipeService from '../../services/recipeService';
import { RecipeItem } from '../Catalog/RecipeItem/RecipeItem';
import { AuthContext } from '../../contexts/AuthContext';

export const MyProfile = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const { param_userId } = useParams();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        // Deny access if logged in user is not profile owner
        if (param_userId != userId) {
            navigate('/unauthorized');
        } else {
            recipeService.getOwned(param_userId)
                .then(result => {
                    setMyRecipes(result);
                })
                .catch(err => { //Handle server down situation
                    navigate('/nodata');
                })
        }
    }, [param_userId, userId]);

    return (
        <div className={styles["profile-container"]}>
            <h1>Your recipes</h1>
            <div className={styles["catalog"]}>
                <div className={styles["catalog-container"]}>
                    {myRecipes.map(x => <RecipeItem key={x._id} {...x} />)}
                </div>
            </div>

        </div>
    )
}