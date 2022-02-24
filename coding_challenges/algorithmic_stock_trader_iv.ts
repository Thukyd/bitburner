/*
hong-fang-tea
Algorithmic Stock Trader IV
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array with two elements:

[6, [197,47,28,191,198,129,117,82,171]]

The first element is an integer k. The second element is an array of stock prices (which are numbers) where the i-th element represents the stock price on day i.

Determine the maximum possible profit you can earn using at most k transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you can buy it again.

If no profit can be made, then the answer should be 0.
 */

let stockPricesIVa:[number, number[]] = [6, [197,47,28,191,198,129,117,82,171]]; // define array as tuple type
let test:[number, number[]] = [6, [1, 2, 1, 2, 1, 2, 12, 12, 12, 323, 2, 2, 323, 342, 234, 23, 234, 1, 2, 1, 2, 1, 2, 1]]; // define array as tuple type


/**
 * - Checks for max possible profits of a given stock price history 
 * @param orderSheet The first element is an integer k. The second element is an array of stock prices (which are numbers) where the i-th element represents the stock price on day i. 
 * @returns max
 */
 function algoTraderIV (transactionSheet:[number, number[]]) { // expect tuple type as input
    let possible_transactions = transactionSheet[0];
    let prices = transactionSheet[1];
    
    // defining new Transaction type
    // Transaction holds profit, buy/sell values and their responding index
        // you only need profit to solve this task, but if you want to get a better understanding how it works & debug it
        // it's useful to add index and prices to the structure as well.
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

    // calculate the max profits from that
    let profitableTrades = increasePeriods
        .sort((a, b) => (a.profit < b.profit) ? 1 : -1) // sort by profit
        .slice(0,possible_transactions) // limit to X possible trades
        .map(transaction => transaction.profit) // create array of profits
        .reduce((a, b) => a + b) // add all array elements (total profits)

    return profitableTrades // return max profits 
}


console.log(`SOLUTION : There is a max profit of "${algoTraderIV(stockPricesIVa)}"`)
console.log(`TEST: There is a max profit of "${algoTraderIV(test)}"`)

