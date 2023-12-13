import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/recipes';


export const getAll = async () => {
    const result = await request.get(baseUrl);
    const recipes = Object.values(result);
    return recipes;
}

export const create = async (data, token) => {
    const result = await request.post(baseUrl, data, token);
    return result;
}

export const getOne = async (recipeId) => {
    const result = await request.get(`${baseUrl}/${recipeId}`);
    return result;
}

// export const addComment = async (itemId, data, token) => {
//     const result = await request.post(`${baseUrl}/${recipeId}/comments`, data, token);
//     return result;
// };

export const edit = async (data, token) => {
    //const result = await request.post(`${baseUrl}/recipes/${data._id}`, data, token);
    //return result;
}

export const deleteItem = async (recipeId, token) => {
    const result = await request.del(`${baseUrl}/${recipeId}`, {}, token);
    return result;
};
