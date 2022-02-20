/*
CSEC
Algorithmic Stock Trader I
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

43,65,133,117,15,102,17,187,20,84,57,129,123,150,69,108,183,186,75,191

Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it
*/

let stockPricesI = [43,65,133,117,15,102,17,187,20,84,57,129,123,150,69,108,183,186,75,191];

/**
 * Checks for max possible profits of a given stock price history
 * - only one transaction is possible
 * - solution flaw: checks only the max profit from "x-price to max-price"; if "min-price to y-price" or "x-price to to y-price" are more profitable it won't take that into account
 * @param prices 
 * @returns max
 */
function algoTraderI (prices:number[]) {
    let maxProfit = 0;

    // sort first
    let sortedPrices =  prices.sort((a, b) => (a > b) ? 1 : -1);
    // create Array to manipulate
    let checkArr = [...sortedPrices]; 
    // check loop from min to max
    for (let i = 0; i < sortedPrices.length; i++) {
        let min = checkArr[i]
        let max = checkArr[checkArr.length - 1]

        if (prices.indexOf(min) < prices.indexOf(max)){
            maxProfit = max - min;
            break;
        }
    }
    return maxProfit
}

console.log(algoTraderI(stockPricesI))