import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as recipeService from '../../services/recipeService';
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import styles from './Edit.module.css';

export const Edit = () => {

    const navigate = useNavigate();
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState();
    const { token } = useContext(AuthContext);

    //Edit handler
    const onEditSubmit = async (formValues) => {
        const result = await recipeService.edit(recipeId, formValues, token);
        
        //TODO: STATE UPDATE
        navigate(`/catalog/${recipeId}`);
        // TODO: null?
        // setRecipe(state => state.map(x => x._id === formValues._id ? result : null));
    }

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        name: '',
        img: '',
        prepTime: '',
        ingredients: '',
        steps: ''
    }, onEditSubmit);

    //get one to fill in the current details
    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(result => {
                changeValues(result);
            });
    }, [recipeId]);

    return (
        <div className={styles["edit-container"]}>
            <h1 className={styles["edit-title"]}>Post a recipe</h1>

            <form className={styles["edit-form"]} method="post" onSubmit={onSubmit}>

                <label htmlFor="name">Recipe name*</label>
                <input className={styles["edit-name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} />

                <label htmlFor="img">Recipe photo</label>
                <input className={styles["edit-img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="prepTime">Preparation time*</label>
                <input className={styles["edit-prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} />

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["edit-ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} />

                <label  className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["edit-steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} />

                <button type="submit" className={`${styles["btn"]} ${styles["edit-submit"]}` }>Add Recipe</button>
            </form>
        </div>
    )
}