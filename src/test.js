const apiUrl = 'https://interview-api.sbly.com';
const performanceEndpoint = '/ad-insights';
const accessToken = 'SHAREABLY_SECRET_TOKEN';
const adFetchOptions = { headers: { 'Content-Type': 'application/json;charset=utf-8' } };
const dates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05'];

printResult(nextBudgets());

// Helper Functions -------------------------------------------------------------------------------

async function printResult(promise) {
    promise.then(p => console.log(p));
}

function constructUrl(base, endpoint, params = {}) {
    let url = base + endpoint;

    let isFirst = true;
    for (key in params) {
        url += (isFirst ? '?' : '&') + key + '=' + params[key];
        isFirst = false;
    }

    return url;
}

async function adInsights(date, metrics) {
    let url = constructUrl(apiUrl, performanceEndpoint, {
        accessToken: accessToken,
        date: date,
        metrics: metrics
    });

    return await fetch(url, adFetchOptions)
        .then(response => response.json())
        .catch(error => console.log(error));
}

async function currentBudget(id) {
    let url = constructUrl(apiUrl, '/ad/' + id, {
        accessToken: accessToken
    });

    return await fetch(url, adFetchOptions)
        .then(response => response.json())
        .then(result => result.budget)
        .catch(error => console.log(error));
}
}