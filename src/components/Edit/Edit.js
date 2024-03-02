import styles from './Edit.module.css';
import { useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm";
import * as recipeService from '../../services/recipeService';
import { RecipeContext } from "../../contexts/RecipeContext";
import { Button } from '../Button/Button';
import { AuthContext } from '../../contexts/AuthContext';

export const Edit = () => {
    const { recipeId } = useParams();
    const { onEditSubmit } = useContext(RecipeContext);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        name: '',
        img: '',
        difficulty: '',
        prepTime: '',
        ingredients: '',
        steps: ''
    }, onEditSubmit);

    //getOne to fill in the current details
    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(result => {
                // Deny access if userId != _ownerId of recipe
                if((result._ownerId !== userId)){
                    navigate('/unauthorized');
                }
                //changeValues updates the initialValues for the useForm hook
                changeValues(result);
            })
            .catch(err => { //Handle server down situation
                navigate('/nodata');
            });
        
    }, [recipeId]);

    return (
        <div className={styles["edit-container"]}>
            <h1 className={styles["edit-title"]}>Edit recipe</h1>

            <form className={styles["edit-form"]} method="post" onSubmit={onSubmit}>

                <label htmlFor="name">Recipe name*</label>
                <input className={styles["edit-name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} required />

                <label htmlFor="img">Recipe photo</label>
                <input className={styles["edit-img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="difficulty">Difficulty*</label>
                <input className={styles["edit-difficulty"]} name="difficulty" type="text" onChange={onChangeHandler} value={formValues.difficulty} required />

                <label htmlFor="prepTime">Preparation time*</label>
                <input className={styles["edit-prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} required />

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["edit-ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} required />

                <label className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["edit-steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} required />

                <Button type={"submit"} content={"Edit recipe"} />
            </form>
        </div>
    )
}