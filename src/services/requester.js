import { Navigate } from "react-router-dom";

export const request = async (method, url, data, token, isLogout) => {

    const options = {};

    //isLogout defines whether body is required for the GET request
    if (method !== 'GET' || isLogout) {
        console.log('here1');
        options.method = method;
        options.headers = {};

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        };

        if (token) {
            options.headers['X-Authorization'] = token;
        };
    }

    const response = await fetch(url, options);
    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    //return result only if response code is OK
    if (!response.ok) {
        if (response.status === 403) {
            if(result.message === 'User session does not exist'){
                throw Error('User session timed out. Please sign-in again!');
            }
            // alert('You have to sign in first!');
            throw Error('Something went wrong!');
        } else {
            //thrown Error is caught in the onLoginSubmit try-catch.
            throw Error('Something went wrong!');
        };

    } else {
        console.log(response.status);

        return result;
    }
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');

