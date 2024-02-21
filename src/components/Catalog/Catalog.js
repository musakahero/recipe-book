import styles from "./Catalog.module.css";
import { RecipeItem } from "./RecipeItem/RecipeItem";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import { Search } from "./Search/Search";

export const Catalog = () => {
    const { recipes, onResetSubmit, allRecipes, setRecipes} = useContext(RecipeContext);

    // Cleanup - reset to AllRecipes state when Catalog is exited
    useEffect(() => {
        setRecipes(allRecipes);
        return () => {
            setRecipes(allRecipes);
        }
    }, []);

    return (
        <div className={styles['catalog']}>
            <h1 className={styles['catalog-title']}>All Recipes</h1>
            <Search placeholder={'Search for a recipe...'}/>
            <div className={styles['catalog-container']}>
                {recipes?.map(x => <RecipeItem key={x._id} {...x} />)}
            </div>
        </div>
    )
}