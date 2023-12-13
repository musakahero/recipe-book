import styles from "./Catalog.module.css";
import { RecipeItem } from "./RecipeItem/RecipeItem";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

export const Catalog = () => {
    const { recipes } = useContext(RecipeContext);
    
    return (
        <div className={styles['catalog']}>
            <h1 className={styles['catalog-title']}>All Recipes</h1>
            <div className={styles['catalog-container']}>
                {recipes.map(x => <RecipeItem key={x._id} {...x}/>)}
            </div>
        </div>
    )
}