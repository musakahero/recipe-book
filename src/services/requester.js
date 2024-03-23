export const request = async (method, url, data, token, isLogout) => {

    const options = {};

    //isLogout defines whether body is required for the GET request
    if (method !== 'GET' || isLogout) {
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
            return { value: {}, error: new Error(result.message) }
        } else {
            throw Error(result.message);
        }
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

