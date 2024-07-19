// import * as request from './requester';

// const baseUrl = 'http://localhost:3030/data/recipes';

// export const getAll = async () => {
//     const result = await request.get(baseUrl);
//     const recipes = Object.values(result);
//     return recipes;
// }

// export const create = async (data, token) => {
//     const result = await request.post(baseUrl, data, token);
//     return result;
// }

// export const getOne = async (recipeId) => {
//     const result = await request.get(`${baseUrl}/${recipeId}`);
//     return result;
// }

// export const edit = async (recipeId, data, token) => {
//     const result = await request.put(`${baseUrl}/${recipeId}`, data, token);
//     return result;
// }

// export const deleteItem = async (recipeId, token) => {
//     const result = await request.del(`${baseUrl}/${recipeId}`, {}, token);
//     return result;
// };

// export const getOwned = async (userId) => {
//     const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
//     const result = await request.get(`${baseUrl}?where=${searchQuery}`);
//     return Object.values(result);
// };

// export const search = async (searchString, token) => {
//     const searchQuery = encodeURIComponent(`name LIKE "${searchString}"`);
//     const result = await request.get(`${baseUrl}?where=${searchQuery}`);
//     return result;
    
// }