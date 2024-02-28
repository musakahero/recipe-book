import { useContext, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import * as recipeService from '../../services/recipeService';

export const Delete = () => {

    const { recipeId } = useParams();
    const { token } = useContext(AuthContext);
    const { setAllRecipes} = useContext(RecipeContext);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(result => {
                // Deny access if userId != _ownerId of recipe
                if ((result._ownerId !== userId)) {
                    navigate('/unauthorized');
                } else {
                    onDeleteClick();
                }
            })
            .catch(err => { //Handle server down situation
                navigate('/nodata');
            });
    }, []);

    const onDeleteClick = async () => {
        try {
            await recipeService.deleteItem(recipeId, token);
             setAllRecipes(state => state.filter(x => x._id !== recipeId));
        } catch (err) {
            alert(`Deletion failed: ${err.message}`);
        };

    }
    return <Navigate to="/catalog" />
}