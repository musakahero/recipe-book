import styles from "./Sort.module.css";

export const Sort = ({ setSelectedSort, selectedSort }) => {
    const handleDropdownChange = (e) => {
        setSelectedSort(e.target.value);
    };

    return (
        <div className={styles["sort-container"]}>
            <label htmlFor="sortSelect">Sort</label>
            <select name="sortSelect"
                className={styles["sort-select"]}
                value={selectedSort}
                onChange={handleDropdownChange}>

                <option value="name_asc">By name, ascending</option>
                <option value="name_desc">By name, descending</option>
                <option value="ingr_asc">By total ingredients, ascending</option>
                <option value="ingr_desc">By total ingredients, descending</option>
            </select>
        </div>
    )
}