import { adInsights } from './adApi.js';
import { currentBudget } from './adApi.js';
import { dates } from './adApi.js';

// Calculate the averages for all ad insight data across all days
async function insightAverages(insights) {
    let avgs = {};
    let numAds = insights[0].length;
    let metrics = Object.keys(insights[0][0]);

    for (let i = 0; i < numAds; i++) {
        let id = insights[0][i].id;
        avgs[id] = {};

        for (let metric of metrics) {
            if (metric != 'id') {
                let avg = 0;

                for (let j = 0; j < dates.length; j++) {
                    avg += insights[j][i][metric] / dates.length;
                }

                avgs[id][metric] = avg;
            }
        }
    }

    return avgs;
}

// Calculate the weighted averages of profit margins for all ads across all days
async function weightedProfitMargins(insights) {
    let weightedAvgs = {};
    let numAds = insights[0].length;

    for (let i = 0; i < numAds; i++) {
        let id = insights[0][i].id;
        let dividend = 0;
        let divisor = 0;

        for (let j = 0; j < dates.length; j++) {
            let ad = insights[j][i];
            let weight = ad.spend * recencyWeight(j);
            divisor += weight;
            dividend += profitMargin(ad) * weight;
        }

        weightedAvgs[id] = dividend / divisor;
    }

    return weightedAvgs;
}

// Calculate an ad's profit margin for a certain day
function profitMargin(ad) {
    return (ad['revenue'] - ad['spend']) / ad['spend'];
}

// Calculate a date's recency weight
function recencyWeight(dateIndex) {
    return Math.pow(0.5, dates.length - 1 - dateIndex)
}

// Gather all data to be displayed on the table
async function nextBudgets() {
    let nextBudgets = {};
    let insights = [];
    let metrics = 'spend,revenue,impressions,clicks';

    for (let date of dates) {
        insights.push(await adInsights(date, metrics));
    }

    let avgs = await insightAverages(insights);
    let weightedAvgs = await weightedProfitMargins(insights);

    for (let id in weightedAvgs) {
        let weighted = weightedAvgs[id];
        let avg = avgs[id];
        let current = await currentBudget(id);
        let proposed = (1 + weighted) * current;

        nextBudgets[id] = {
            weightedProfitMargin: weighted.toFixed(2),
            currentBudget: current.toFixed(2),
            proposedBudget: proposed.toFixed(2),
            averageSpending: avg['spend'].toFixed(2),
            averageRevenue: avg['revenue'].toFixed(2),
            averageImpressions: avg['impressions'].toFixed(0),
            averageClicks: avg['clicks'].toFixed(0),
        };
    }

    return nextBudgets;
}

export default nextBudgets