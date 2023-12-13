import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAllComments = async (recipeId) => {
    const searchQuery = encodeURIComponent(`recipeId="${recipeId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    return Object.values(result);
};

export const createComment = async (recipeId, content, username, token) => {
    const result = await request.post(baseUrl, { recipeId, content, username }, token);
    return result;
};