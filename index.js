const { getTokens } = require("./Getting_tokens.js");
const { getTopTraders } = require("./Highest_winners.js");
const { createOrUpdateExcel } = require("./excel.js");

const sleep = ms => new Promise(r => setTimeout(r, ms));

// first call get tokens and retieve the list of current tokens
async function findingMostProfits(){
    let i = 0;

    while (i <= 60){
    const tokens = await getTokens();
    console.log("Getting tokens, on interation: ", i);

    for (const token of tokens) {
        const tokenPair = token._id.pair;
        const totalSupply = token.token.metrics.totalSupply;
        const currentPrice = token.pair.price;
        const name = token.pair.name;
        const marketCap = totalSupply * currentPrice;
        const startTime = new Date().toLocaleString();

        const data_for_excel = [];


        const topTraders = await getTopTraders(tokenPair);

        isTokenAddressBeingSent = true;
        if (isTokenAddressBeingSent){
            data_for_excel.push({Address: tokenPair, TokenAddress: "Yes", MarketCap: marketCap});
            isTokenAddressBeingSent = false;
        }

        for (const holders of topTraders){
            // console.log(holders.address);
            // console.log(holders.profit);
            data_for_excel.push({Address: holders.address, TokenAddress: "No", MarketCap: "N/A", Profit: holders.profit, time: startTime});
        }

        createOrUpdateExcel(data_for_excel, `${name}_${tokenPair}`);
        };
        console.log("Sleeping for 60 seconds");
        i++;
        await sleep(60000);
    }

    const winners = findingWinnersAndRemovingDuplicates('excel_sheets_token');


}

let counter = 0;
while (counter <= 24){
    findingMostProfits().then(response => {
        // console.log(response);
        console.log("Current on reponse: ", counter);
        counter++;
    });

}