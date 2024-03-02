import styles from "./RecipeItem.module.css";
import { Link } from "react-router-dom";

export const RecipeItem = ({ _id, name, prepTime, difficulty, ingredients, img }) => {
    return (
        <Link to={`/catalog/${_id}`}><div className={styles["recipe-item"]}>
            {/* Check if there's any img URL provided. If not, put a backup img div */}
            {img !== '' ?
                <div className={styles["img-container"]} style={{ backgroundImage: `url(${img})` }}>
                </div>
                : <div className={styles["img-container-backup"]}></div>
            }
            <p className={`${styles["item-element"]} ${styles["item-name"]}`}> {name}</p>
            <p className={`${styles["item-difficulty"]} ${styles["item-difficulty"]}`}> Difficulty: {difficulty}</p>
            <p className={`${styles["item-element"]} ${styles["item-prepTime"]}`} >Preparation time: {prepTime}</p>
            <p className={`${styles["item-element"]} ${styles["item-ingredientsCount"]}`}>Ingredients: <br></br>{ingredients.length}</p>
        </div></Link>
    )
};

