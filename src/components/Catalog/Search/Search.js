import styles from "./Search.module.css";
import { useContext } from "react";
import { RecipeContext } from "../../../contexts/RecipeContext";
import { Button } from "../../Button/Button";
import { useForm } from "../../../hooks/useForm";


export const Search = ({placeholder}) => {
    const {onSearchSubmit, onResetSubmit} = useContext(RecipeContext);

    const { formValues, onChangeHandler, onSubmit } = useForm({
        searchString: ''
    }, onSearchSubmit);

    return (
        <div className={styles['catalog-search-container']}>

                <form method="post" onSubmit={onSubmit} className={styles['catalog-search-form']}>
                    <input 
                    type="text" 
                    className={styles["search-field"]} 
                    name="searchString"
                    placeholder={placeholder}
                    value={formValues.searchString}
                        onChange={onChangeHandler} required/>
                    <Button content="Search" type={"submit"} />
                    <Button content="Reset" type={"button"} onClickHandler={
                        () => {
                            onResetSubmit();
                            formValues.searchString = '';
                        }
                    }/>
                </form>
            </div>
    )
}