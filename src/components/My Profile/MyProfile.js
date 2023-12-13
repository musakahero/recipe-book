import styles from './MyProfile.module.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as recipeService from '../../services/recipeService';
// import { RecipeItem } from '../Catalog/RecipeItem/RecipeItem';
import { ProfileRecipeItem } from './ProfileRecipeItem/ProfileRecipeItem';

export const MyProfile = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        recipeService.getOwned(userId)
        .then(result => {
            setMyRecipes(result);
        })
    }, [userId]);

    return (
        <div className={styles["profile-container"]}>
            <h1>Your recipes</h1>
            <div className={styles["catalog"]}>
            <div className={styles["catalog-container"]}>
                {myRecipes.map(x => <ProfileRecipeItem key={x._id} {...x}/>)}
            </div>
        </div>

        </div>
    )
}