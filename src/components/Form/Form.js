import { Button } from '../Button/Button';
import styles from './Form.module.css';

export const Form = ({onSubmit, onChangeHandler, formValues, buttonSubmitContent}) => {
    return (
        <form onSubmit={onSubmit} className={styles['form']}>
            <label htmlFor="name">Recipe name*</label>
                <input className={styles["name"]} name="name" type="text" onChange={onChangeHandler} value={formValues.name} required />

                <label htmlFor="img">Recipe image URL</label>
                <input className={styles["img"]} name="img" type="url" onChange={onChangeHandler} value={formValues.img} />

                <label htmlFor="difficulty">Difficulty*</label>
                <input className={styles["difficulty"]} name="difficulty" type="text" onChange={onChangeHandler} value={formValues.difficulty} required />

                <label htmlFor="prepTime">Preparation time (minutes)*</label>
                <input className={styles["prep-time"]} name="prepTime" type="text" onChange={onChangeHandler} value={formValues.prepTime} required />

                <label className={styles["ingredients-label"]} htmlFor="ingredients">Ingredients (separated by comma)*</label>
                <textarea rows={5} cols={40} className={styles["ingredients"]} name="ingredients" type="text" onChange={onChangeHandler} value={formValues.ingredients} required />

                <label className={styles["steps-label"]} htmlFor="steps">Steps to prepare:* </label>
                <textarea className={styles["steps"]} rows={10} cols={40} name="steps" type="text" onChange={onChangeHandler} value={formValues.steps} required />

                <Button type={"submit"} content={buttonSubmitContent} />
        </form>
    )
}