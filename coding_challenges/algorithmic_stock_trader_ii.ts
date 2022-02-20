/*
hong-fang-tea
Algorithmic Stock Trader II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

159,3,172,44,161,77,80,76,50,108,81,43,114,154,34,191,97,140,53,4,33,151,98,181

Determine the maximum possible profit you can earn using as many transactions as you'd like. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0

*/

let stockPricesII = [159,3,172,44,161,77,80,76,50,108,81,43,114,154,34,191,97,140,53,4,33,151,98,181];

// find the maximum incline => 15 - 191

// FIXME still version of before
    // now you can do as many transactions as you like
    // you can't sell before buying
// TODO:
    // check for each increasing trend
    // add the distance as max profit
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



console.log(`The max profit is : ${algoTraderII(stockPricesII)}`)
/** Expected buying periods
 * 3 => 172
 * 44 => 161
 * 77 => 80
 * 50 => 108
 * ....
 */