/*
hong-fang-tea

Algorithmic Stock Trader III
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

31,168,178,42,80,152,109,22,152,109,16,184,164,32,37,151,35,122,54,33,68,162,5,72,112,101,120,5,75,100

Determine the maximum possible profit you can earn using at most two transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0
*/

let stockPricesIIIa = [31,168,178,42,80,152,109,22,152,109,16,184,164,32,37,151,35,122,54,33,68,162,5,72,112,101,120,5,75,100];

let stockPricesIIIb = [100,190,188,56,99,116,149,199,189,179,28,60,138,134,49,19,177,149];


/**
 * Checks for max possible profits of a given stock price history
 * - two possible transactions
 * @param prices 
 * @returns max
 */
function algoTraderIII (prices:number[]) {
    // defining new Transaction type
    // Transaction holds profit, buy/sell values and their responding index
    type Transaction = { [key:string]: number}; // you just define that there is a key and a number value, but not which one
    // Defining array of Transatcion type
    let increasePeriods: Transaction[] = [];
    // defining object of Transaction type
    let increaseData : Transaction = {}

    // looping through array to detect the periods of increasing prices
    for (let i = 1; i < prices.length + 1; i++) {
        // a) looking at increasing prices
        if (prices[i] > prices[i-1]){ 
            // it's the start of increase or...
            if (Object.keys(increaseData).length === 0) { 
                increaseData = {
                    "buyIndex" : i-1,
                    "buyPrice": prices[i-1],
                    "sellIndex": i,
                    "sellPrice" : prices[i],
                    "profit" : prices[i] - prices[i-1]
                }
            //... the increase goes on 
            } else { 
                increaseData.sellIndex = i;
                increaseData.sellPrice = prices[i];
                increaseData.profit = (increaseData.sellPrice - increaseData.buyPrice)
            }
        // b) prices decline again  
        } else if(increaseData.profit) { // only push profitable transactions
            increasePeriods.push(increaseData) // save transaction to increasePeriods
            increaseData = {} // reset transaction
        }
    }
    //console.log(increasePeriods) // just for testing

    let twoMostProfitableTrades = increasePeriods.sort((a, b) => (a.profit < b.profit) ? 1 : -1)
    
    //console.log(twoMostProfitableTrades)

    console.log(`1st : There is a max profit of "${twoMostProfitableTrades[0].profit}" if you buy at ${twoMostProfitableTrades[0].buyPrice} and sell at ${twoMostProfitableTrades[0].sellPrice}`)
    console.log(`2nd : There is a max profit of "${twoMostProfitableTrades[1].profit}" if you buy at ${twoMostProfitableTrades[1].buyPrice} and sell at ${twoMostProfitableTrades[1].sellPrice}`)
    
    let maxProfit = twoMostProfitableTrades[0].profit + twoMostProfitableTrades[1].profit

    return maxProfit
}

/*
    Expected solution = 315

    [31,168,178,42,80,152,109,22,152,109,16,184,164,32,37,151,35,122,54,33,68,162,5,72,112,101,120,5,75,100]

    1st: 184 - 16 = 168
    2nd: 178 - 31 = 174
    Profit 1st & 2nd = 168 + 174 = 315
*/
console.log(`SOLUTION A: There is a max profit of "${algoTraderIII(stockPricesIIIa)}"\n`)


console.log(`SOLUTION B: There is a max profit of "${algoTraderIII(stockPricesIIIb)}"\n`)

