import "./RecipeItem.css";
import { Link } from "react-router-dom";

export const RecipeItem = ({ _id, name, prepTime, ingredients, img }) => {

    
    return (
        <Link to={`/catalog/${_id}`}><div className="recipe-item">
            {/* Check if there's any img URL provided. If not, put a backup img div */}
            {img !== '' ?
                <div className="img-container" style={{ backgroundImage: `url(${img})` }}>
                </div>
                : <div className="img-container-backup"></div>
            }
            <p className="item-element item-name">{name}</p>
            <p className="item-element item-prepTime">Preparation time: {prepTime}</p>
            <p className="item-element item-ingredientsCount">Number of ingredients: {ingredients.length}</p>
        </div></Link>
    )
}

