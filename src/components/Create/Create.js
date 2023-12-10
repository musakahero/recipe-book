import { useState } from "react";
import "./Create.css";
import { useForm } from "../../hooks/useForm";

export const Create = ({onCreateSubmit}) => {

    const {formValues, onChangeHandler, onSubmit} = useForm({
        'create-name': '',
        'create-ingredients': '',
        'create-prep-time': '',
        'create-steps': ''
    }, onCreateSubmit);

    return (
        <div className="create-container">
            <h1 className="create-title">Post a recipe</h1>

            <form className="create-form" method="post" onSubmit={onSubmit}>

                <label htmlFor="create-name">Recipe name</label>
                <input className="create-name"  name="create-name" type="text" onChange={onChangeHandler} value={formValues['create-name']} />

                <label className="ingredients-label" htmlFor="create-ingredients">Ingredients (separated by comma)</label>
                <textarea rows={5} cols={40} className="create-ingredients" name="create-ingredients" type="text" onChange={onChangeHandler} value={formValues['create-ingredients']} />

                <label htmlFor="create-prep-time">Preparation time</label>
                <input className="create-prep-time" name="create-prep-time" type="text" onChange={onChangeHandler} value={formValues['create-prep-time']} />

                <label htmlFor="create-steps" className="steps-label">Steps to prepare: </label>
                <textarea className="create-steps" rows={10} cols={40} name="create-steps" type="text" onChange={onChangeHandler} value={formValues['create-steps']} />

                <button type="submit" className="btn create-submit">Add Recipe</button>
            </form>
        </div>
    )
};