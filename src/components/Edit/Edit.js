import styles from './Edit.module.css';
import { useContext, useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import { useForm } from "../../hooks/useForm";
import * as recipeService from '../../services/recipeService';
import { RecipeContext } from "../../contexts/RecipeContext";

export const Edit = () => {
    const { recipeId } = useParams();
    const { onEditSubmit } = useContext(RecipeContext);

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        _id: '',
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
                //changeValues updates the initialValues for the useForm hook
                changeValues(result);

            });
    }, [recipeId]);

    return (
        <div className={styles["edit-container"]}>
            <h1 className={styles["edit-title"]}>Edit recipe</h1>

            <form className={styles["edit-form"]} method="post" onSubmit={onSubmit}>

                <label htmlFor="name">Recipe name*</label>
                <input className={styles["edit-name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} />

                <label htmlFor="img">Recipe photo</label>
                <input className={styles["edit-img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="prepTime">Preparation time*</label>
                <input className={styles["edit-prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} />

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["edit-ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} />

                <label className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["edit-steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} />

                <button type="submit" className={`${styles["btn"]} ${styles["edit-submit"]}`}>Edit Recipe</button>
            </form>
        </div>
    )
}