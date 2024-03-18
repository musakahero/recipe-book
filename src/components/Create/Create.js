import styles from "./Create.module.css";
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
// import {Button} from "../Button/Button"
import { Form } from "../Form/Form";
export const Create = () => {

    const { onCreateSubmit } = useContext(RecipeContext);
    
    const { formValues, onChangeHandler, onSubmit } = useForm({
        name: '',
        img: '',
        difficulty: '',
        prepTime: '',
        ingredients: [],
        steps: ''
    }, onCreateSubmit);
    
    return (
        <div className={styles["create-container"]}>
            <h1 className={styles["create-title"]}>Post a recipe</h1>

            {/* <form className={styles["create-form"]} method="post" onSubmit={onSubmit}>
                <label htmlFor="name">Recipe name*</label>
                <input className={styles["create-name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} required/>

                <label htmlFor="img">Recipe photo</label>
                <input className={styles["create-img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="difficulty">Difficulty*</label>
                <input className={styles["create-difficulty"]} name="difficulty" type="text" onChange={onChangeHandler} value={formValues.difficulty} required/>

                <label htmlFor="prepTime">Preparation time (minutes)*</label>
                <input className={styles["create-prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} required/>

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["create-ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} required/>

                <label  className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["create-steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} required/>

                <Button content="Add recipe" type={"submit"}/>
            </form> */}
            <Form 
            onSubmit={onSubmit} 
            onChangeHandler={onChangeHandler} 
            formValues={formValues}
            buttonSubmitContent={'Create recipe'}/>
        </div>
    )
};