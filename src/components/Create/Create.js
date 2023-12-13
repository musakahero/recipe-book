import { useState } from "react";
import styles from "./Create.module.css";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

export const Create = () => {

    const { onCreateSubmit } = useContext(RecipeContext);
    
    const { formValues, onChangeHandler, onSubmit } = useForm({
        name: '',
        img: '',
        prepTime: '',
        ingredients: [],
        steps: ''
    }, onCreateSubmit);
    
    return (
        <div className={styles["create-container"]}>
            <h1 className={styles["create-title"]}>Post a recipe</h1>

            <form className={styles["create-form"]} method="post" onSubmit={onSubmit}>

                <label htmlFor="name">Recipe name*</label>
                <input className={styles["create-name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} />

                <label htmlFor="img">Recipe photo</label>
                <input className={styles["create-img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="prepTime">Preparation time*</label>
                <input className={styles["create-prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} />

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["create-ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} />

                <label  className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["create-steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} />

                <button type="submit" className={`${styles["btn"]} ${styles["create-submit"]}` }>Add Recipe</button>
            </form>
        </div>
    )
};