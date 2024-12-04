export const api = (path, method = "GET", body = null, credentials = null) => {
    const url = "http://localhost:5000/api" + path;

    const options = {
        method,
        headers: {},
    };
    if (credentials) {
        //The btoa medhod creates a base 64 encoded ASCII string from a string data
        const encodedCredentials = btoa(
            `${credentials.username}:${credentials.password}`
        );
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
    } else options.headers["Content-Type"] = "application/json; charset=utf-8";

    //console.log(options);
    return fetch(url, options);
};