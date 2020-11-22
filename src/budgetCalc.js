import { adInsights, currentBudget, dates } from 'adApi';

async function weightedAverages() {
    let dateAdInsights = [];
    let weightedAvgs = {};
    let metrics = 'spend,revenue';

    for (let i = 0; i < dates.length; i++) {
        dateAdInsights.push(await adInsights(dates[i], metrics));
    }

    let numAds = dateAdInsights[0].length;

    for (let i = 0; i < numAds; i++) {
        let weightedAvg = 0;

        for (let j = 0; j < dates.length; j++) {
            let ad = dateAdInsights[j][i];
            weightedAvg += profitMargin(ad) * ad.spend * recencyWeight(j);
        }

        let id = dateAdInsights[0][i].id;
        weightedAvgs[id] = weightedAvg;
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

    for (id in weightedAvgs) {
        console.log(`id: ${id}, avg: ${weightedAvgs[id]}`);
        nextBudgets[id] = (1 + weightedAvgs[id]) * (await currentBudget(id));
    }

    return nextBudgets;
}