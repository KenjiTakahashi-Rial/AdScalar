const apiUrl = 'https://interview-api.sbly.com';
const performanceEndpoint = '/ad-insights';
const budgetEndpoint = '/ad/AD_ID';
const accessToken = 'SHAREABLY_SECRET_TOKEN';
let date = '2020-01-01';
let metrics = 'spend,impressions';

let url = constructUrl(apiUrl, performanceEndpoint, {
    accessToken: accessToken,
    date: date,
    metrics: metrics
});
console.log(url);

let options = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
};

fetch(url, options)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

function constructUrl(base, endpoint, params) {
    let url = base + endpoint;

    let isFirst = true;
    for (let key in params) {
        url += (isFirst ? '?' : '&') + key + '=' + params[key];
        isFirst = false;
    }

    return url;
}