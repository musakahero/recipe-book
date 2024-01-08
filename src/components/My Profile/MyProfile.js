import styles from './MyProfile.module.css';
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as recipeService from '../../services/recipeService';
import {RecipeItem} from '../Catalog/RecipeItem/RecipeItem';

export const MyProfile = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const {userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        recipeService.getOwned(userId)
        .then(result => {
            setMyRecipes(result);
        })
        .catch(err => { //Handle server down situation
            navigate('/nodata');
          })
    }, [userId]);

    return (
        <div className={styles["profile-container"]}>
            <h1>Your recipes</h1>
            <div className={styles["catalog"]}>
            <div className={styles["catalog-container"]}>
                {myRecipes.map(x => <RecipeItem key={x._id} {...x}/>)}
            </div>
        </div>

        </div>
    )
}