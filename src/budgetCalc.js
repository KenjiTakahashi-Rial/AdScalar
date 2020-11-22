import { adInsights } from './adApi.js';
import { currentBudget } from './adApi.js';
import { dates } from './adApi.js';

async function weightedAverages() {
    let dateAdInsights = [];
    let weightedAvgs = {};
    let metrics = 'spend,revenue';

    for (let date of dates) {
        dateAdInsights.push(await adInsights(date, metrics));
    }

    let numAds = dateAdInsights[0].length;

    for (let i = 0; i < numAds; i++) {
        let dividend = 0;
        let divisor = 0;

        for (let j = 0; j < dates.length; j++) {
            let ad = dateAdInsights[j][i];
            let weight = ad.spend * recencyWeight(j);
            divisor += weight;
            dividend += profitMargin(ad) * weight;
        }

        let id = dateAdInsights[0][i].id;
        weightedAvgs[id] = dividend / divisor;
    }

    return weightedAvgs;
}

function profitMargin(ad) {
    return (ad['revenue'] - ad['spend']) / ad['spend'];
}

function recencyWeight(dateIndex) {
    return Math.pow(0.5, dates.length - 1 - dateIndex)
}

async function nextBudgets() {
    let nextBudgets = {};
    let weightedAvgs = await weightedAverages();

    for (let id in weightedAvgs) {
        let weighted = weightedAvgs[id];
        let current = await currentBudget(id);
        let proposed = (1 + weighted) * current;

        nextBudgets[id] = {
            weightedProfitMargin: weighted.toFixed(2),
            currentBudget: current.toFixed(2),
            proposedBudget: proposed.toFixed(2)
        };
    }

    return nextBudgets;
}

export default nextBudgets