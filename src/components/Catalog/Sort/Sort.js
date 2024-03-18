import styles from "./Sort.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

export const Sort = ({ setSelectedSort, selectedSort }) => {
    const handleDropdownChange = (e) => {
        setSelectedSort(e.target.value);
    };

    return (
        <div className={styles["sort-container"]}>
           <FontAwesomeIcon icon={faSort}/>
            <select name="sortSelect"
                className={styles["sort-select"]}
                value={selectedSort}
                onChange={handleDropdownChange}>

                <option value="name_asc">A-Z &#8593;</option>
                <option value="name_desc">A-Z &#8595;</option>
                <option value="ingr_asc">Ingredients &#8593;</option>
                <option value="ingr_desc">Ingredients &#8595;</option>
            </select>
        </div>
    )
}