import { useState } from "react";
import "./Create.css";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

export const Create = () => {

    const { onCreateSubmit } = useContext(RecipeContext);
    
    const { formValues, onChangeHandler, onSubmit } = useForm({
        'name': '',
        'img': '',
        'prepTime': '',
        'ingredients': [],
        'steps': ''
    }, onCreateSubmit);
    
    return (
        <div className="create-container">
            <h1 className="create-title">Post a recipe</h1>

            <form className="create-form" method="post" onSubmit={onSubmit}>

                <label htmlFor="name">Recipe name*</label>
                <input className="create-name" name="name" type="text" onChange={onChangeHandler} value={formValues.name} />

                <label htmlFor="img">Recipe photo</label>
                <input className="create-img" name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="prepTime">Preparation time*</label>
                <input className="create-prep-time" name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} />

                <label className="ingredients-label" htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className="create-ingredients" name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} />

                <label  className="steps-label" htmlFor="steps">Steps to prepare:* </label>
                <textarea className="create-steps" rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} />

                <button type="submit" className="btn create-submit">Add Recipe</button>
            </form>
        </div>
    )
};