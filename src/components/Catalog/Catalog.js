import "./Catalog.css";
import { RecipeItem } from "./RecipeItem/RecipeItem";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

export const Catalog = () => {
    const { recipes } = useContext(RecipeContext);
    
    return (
        <div className="catalog">
            <h1 className="catalog-title">All Recipes</h1>
            <div className="catalog-container">
                {recipes.map(x => <RecipeItem key={x._id} {...x}/>)}
            </div>
        </div>
    )
}