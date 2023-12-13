import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAllComments = async (recipeId) => {
    const searchQuery = encodeURIComponent(`recipeId="${recipeId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    return Object.values(result);
};

export const createComment = async (recipeId, comment, token) => {
    const result = await request.post(baseUrl, { recipeId, comment }, token);
    return result;
};