/*
hong-fang-tea

Algorithmic Stock Trader III
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

31,168,178,42,80,152,109,22,152,109,16,184,164,32,37,151,35,122,54,33,68,162,5,72,112,101,120,5,75,100

Determine the maximum possible profit you can earn using at most two transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0
*/

let stockPricesIII = [31,168,178,42,80,152,109,22,152,109,16,184,164,32,37,151,35,122,54,33,68,162,5,72,112,101,120,5,75,100];

/**
 * Checks for max possible profits of a given stock price history
 * - two possible transactions
 * @param prices 
 * @returns max
 */
function algoTraderIII (prices:number[]) {
    let maxProfit = 0;


    return maxProfit
}


console.log(`The max profit is : ${algoTraderIII(stockPricesIII)}`)




///////////
// Deprecated ...

/*


// try get max profit using to transactions (2 x Buying; 2 selling)
// caluculate max profit 
    // find the the peaks and lows
        // low peak low peak ==> do it that way
        // low low peak peak ==> go with biggest win
        // low peak peak low => 
        // peak low low peak => 
    // you should always calculate from right to left

function findMax (prices:number[]) {
    return Math.max(...prices)
}

function findMin(prices:number[]) {
    return Math.min(...prices)
}

console.log(findMax(stockPrices))
console.log(findMin(stockPrices))

let indexOfMax = stockPrices.indexOf(42);

console.log(indexOfMax)



///////////


function biggestProfit(stockHistory:number[]) {
    /// create a hash structure to store {index, value}; 
        // see also: https://www.youtube.com/watch?v=F95z5Wxd9ks
    let result = stockHistory.map((value, index) =>  (value, index));
    console.log(result)
        
    
  
    // sort by value
    // check the longest path
        // check if index of low_price is smaller than index of high_price => if yes => this transaction ist possible

    return 1
} 

console.log(biggestProfit(stockPrices))

*/