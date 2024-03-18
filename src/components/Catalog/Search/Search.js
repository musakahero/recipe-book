import styles from "./Search.module.css";
import { Button } from "../../Button/Button";
import { useForm } from "../../../hooks/useForm";


export const Search = ({ placeholder, onSearchSubmit, onResetSubmit }) => {
    const { formValues, onChangeHandler, onSubmit } = useForm({
        searchString: ''
    }, onSearchSubmit);

    return (
        <div className={styles['search-container']}>

            <form method="post" onSubmit={onSubmit} className={styles['search-form']}>
                <input
                    type="text"
                    className={styles["search-field"]}
                    name="searchString"
                    placeholder={placeholder}
                    value={formValues.searchString}
                    onChange={onChangeHandler} />
                <Button content="Search" type={"submit"} />
                <Button content="Cancel" type={"button"} 
                onClickHandler={
                    () => {
                        onResetSubmit();
                        formValues.searchString = '';
                    }
                } />
            </form>
        </div>
    )
}