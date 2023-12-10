import "./Catalog.css";
import { RecipeItem } from "./RecipeItem/RecipeItem";
export const Catalog = (props) => {

    return (
        <div className="catalog">
            <h1 className="catalog-title">All Recipies</h1>
            <div className="catalog-container">
                <RecipeItem />
                <RecipeItem />
                <RecipeItem />
            </div>
        </div>
    )
}