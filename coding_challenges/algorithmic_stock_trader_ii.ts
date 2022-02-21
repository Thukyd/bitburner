/*
hong-fang-tea
Algorithmic Stock Trader II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

159,3,172,44,161,77,80,76,50,108,81,43,114,154,34,191,97,140,53,4,33,151,98,181


Determine the maximum possible profit you can earn using as many transactions as you'd like. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0

*/

let stockPricesIIa = [159,3,172,44,161,77,80,76,50,108,81,43,114,154,34,191,97,140,53,4,33,151,98,181];
let stockPricesIIb = [194,108,149,189,44,85,172,5,191,31,99,132,126,118,133,162,30,187,15,84,153,75,121,164,146,20]

/**
 * Checks for max possible profits of a given stock price history
 * - unlimited transactions
 * @param prices 
 * @returns max
 */
function algoTraderII (prices:number[]) {
    let maxProfit = 0;

    for(let i = 1; i < prices.length; i++){
        if (prices[i] > prices[i-1]) {
            //console.log(`Kaufen von ${prices[i-1]} bis ${prices[i]}`)
            maxProfit += prices[i] - prices[i-1]
        }
    }
    return maxProfit
}

// SOLUTION for array a
console.log(`A) The max profit is : ${algoTraderII(stockPricesIIa)}`)
/** Expected buying periods
 * 3 => 172
 * 44 => 161
 * 77 => 80
 * 50 => 108
 * ....
 */


// SOLUTION for array b
console.log(`B) The max profit is : ${algoTraderII(stockPricesIIb)}`)
