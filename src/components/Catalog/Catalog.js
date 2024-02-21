import styles from "./Catalog.module.css";
import { RecipeItem } from "./RecipeItem/RecipeItem";
import { useEffect, useState } from "react";
import { Search } from "./Search/Search";
import { Sort } from "./Sort/Sort";
import { sortRecipes } from "../../utils/sortRecipes";

export const Catalog = ({ allRecipes }) => {
    // current recipes state
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    // search state
    let [searchMode, setSearchMode] = useState(false);
    // sort state
    const [selectedSort, setSelectedSort] = useState('name_asc');

    useEffect(() => {
        // sort values from the drop-down options are received in format 'factor_order'
        const [sortFactor, sortOrder] = selectedSort.split('_');

        let sortedRecipes = [];
        if (searchMode) {
            sortedRecipes = sortRecipes([...displayedRecipes], sortOrder, sortFactor);
        } else {
            sortedRecipes = sortRecipes([...allRecipes], sortOrder, sortFactor);
        }
        setDisplayedRecipes(sortedRecipes);

    }, [allRecipes, selectedSort, searchMode]);

    // Reset search filters
    const onResetSubmit = () => {
        setDisplayedRecipes(allRecipes);
        setSearchMode(false);
    };

    const onSearchSubmit = (formValues) => {
        setSearchMode(true);
        let filteredRecipes = allRecipes
        .filter(x => x.name.toLowerCase()
        .includes(formValues.searchString.toLowerCase()));
        setDisplayedRecipes(filteredRecipes);
    }

    return (
        <div className={styles['catalog']}>
            <h1 className={styles['catalog-title']}>All Recipes</h1>
            <div className={styles['catalog-search-sort-container']}>
                <Search
                    placeholder={'Search for a recipe...'}
                    onSearchSubmit={onSearchSubmit}
                    onResetSubmit={onResetSubmit}
                />
                <Sort
                    setSelectedSort={setSelectedSort}
                    selectedSort={selectedSort}
                />
            </div>
            <div className={styles['catalog-container']}>
                {displayedRecipes?.map(x => <RecipeItem key={x._id} {...x} />)}
            </div>
        </div>
    )
}