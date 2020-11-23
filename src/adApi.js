const apiUrl = 'https://interview-api.sbly.com';
const performanceEndpoint = '/ad-insights';
const accessToken = 'SHAREABLY_SECRET_TOKEN';
const adFetchOptions = { headers: { 'Content-Type': 'application/json;charset=utf-8' } };
export const dates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05'];

// Construct a properly formatted URL string
function constructUrl(base, endpoint, params = {}) {
    let url = base + endpoint;

    let isFirst = true;
    for (let key in params) {
        url += (isFirst ? '?' : '&') + key + '=' + params[key];
        isFirst = false;
    }

    return url;
}

// Fetch ad insight data for the given date and metrics
export async function adInsights(date, metrics) {
    let url = constructUrl(apiUrl, performanceEndpoint, {
        accessToken: accessToken,
        date: date,
        metrics: metrics
    });

    return await fetch(url, adFetchOptions)
        .then(response => response.json())
        .catch(error => console.log(error));
}

// Fetch the current budget for an ad
export async function currentBudget(id) {
    let url = constructUrl(apiUrl, '/ad/' + id, {
        accessToken: accessToken
    });

    return await fetch(url, adFetchOptions)
        .then(response => response.json())
        .then(result => result.budget)
        .catch(error => console.log(error));
}