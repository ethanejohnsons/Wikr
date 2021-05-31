module.exports = {
    fetch(endpoint) {
        const tokens = require('./config/tokens.json');
        const fetch = require('node-fetch');

        const api = "https://api-beta.gitbook.com/v1/";
        let bearer = 'Bearer ' + tokens.gitbook;

        return fetch(api + endpoint, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        });
    }
}