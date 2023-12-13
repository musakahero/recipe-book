import { useContext, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import * as recipeService from '../../services/recipeService';

export const Delete = () => {

const {recipeId} = useParams();
const { token } = useContext(AuthContext);
const {setRecipes } = useContext(RecipeContext);

useEffect( () => {
    onDeleteClick();
}, []);

const onDeleteClick = async () => {
    const result = await recipeService.deleteItem(recipeId, token);
    setRecipes(state => state.filter(x => x._id !== recipeId));
}
    return <Navigate to="/catalog" />
}