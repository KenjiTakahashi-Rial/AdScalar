const apiUrl = 'https://interview-api.sbly.com';
const performanceEndpoint = '/ad-insights';
const accessToken = 'SHAREABLY_SECRET_TOKEN';
const adFetchOptions = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

let date = '2020-01-01';
let metrics = 'spend,impressions';

getAdInsights(date, metrics).then(a => console.log(a));
getAdBudget('bdd60126-d19a-69d2-7d10-b92955b4ee49').then(a => console.log(a));

// Helper Functions -------------------------------------------------------------------------------

function constructUrl(base, endpoint, params = {}) {
    let url = base + endpoint;

    let isFirst = true;
    for (let key in params) {
        url += (isFirst ? '?' : '&') + key + '=' + params[key];
        isFirst = false;
    }

    return url;
}

function getAdInsights(date, metrics) {
    let url = constructUrl(apiUrl, performanceEndpoint, {
        accessToken: accessToken,
        date: date,
        metrics: metrics
    });

    return fetch(url, adFetchOptions)
        .then(response => response.json())
        .catch(error => console.log(error));
}

function getAdBudget(id) {
    let url = constructUrl(apiUrl, '/ad/' + id, {
        accessToken: accessToken
    });

    return fetch(url, adFetchOptions)
        .then(response => response.json())
        .then(result => result.budget)
        .catch(error => console.log(error));
}