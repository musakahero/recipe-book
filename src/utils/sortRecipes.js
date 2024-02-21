/* Add factors as cases and order as If clauses*/

export const sortRecipes = (array, order, factor) => {
    switch(factor){
        case 'name':
            if(order==='asc'){
                array.sort((a,b) => (a.name).localeCompare(b.name));
            } else {
                array.sort((a,b) => (b.name).localeCompare(a.name));
            };
        break;
        case 'ingr':
            if(order==='asc'){
                array.sort((a,b) => a.ingredients.length-b.ingredients.length);
            } else {
                array.sort((a,b) => b.ingredients.length-a.ingredients.length);
            };
            break;
        default:
            array.sort((a,b) => (a.name).localeCompare(b.name));
            break;
    };
    return array;
};

// const [sortFactor, sortOrder] = sortType.split('_'); 