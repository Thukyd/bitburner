/*
CSEC
Algorithmic Stock Trader I
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

43,65,133,117,15,102,17,187,20,84,57,129,123,150,69,108,183,186,75,191

Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it
*/


///////////////////////////////////////////////////////
// Solution Version 2
///////////////////////////////////////////////////////
/* 
    Problem with Version 1: checks only the max profit from "x-price to max-price"; if "min-price to y-price" or "x-price to to y-price" are more profitable it won't take that into account

    Taks: fix flaw by implementing a way to check for price periods and get the most profitable one
    
    Logic: 
        [43,65,133] => 90
        [15,102] => 87
        [17,187] =>  170 !!! 
        [20,84] => 64
        [57,129] => 72
        [123,150] =>  27
        [69,108,183,186] => 117 
        [75,191] => 116
    ==> Max Profit is from index 6 to index 7
        Buying at 17 and selling at 187 which gives you a profit of 170
*/

let stockPricesI = [43,65,133,117,15,102,17,187,20,84,57,129,123,150,69,108,183,186,75,191];

/**
 * Checks for max possible profits of a given stock price history
 * - only one transaction is possible
 * 
 * @param prices 
 * @returns max
 */
function algoTraderI (prices:number[]) {
    let maxProfit = 0;
    let increasePeriods = []
    let increaseData = {}
    // a)  create stock price increase periods
    // TODOS:
    /**
     * - does not work for ongoing increases as [43,65,133]
     * - does not work for last increase [75,191] => 116
     * - add profit to increase element
     */

    for (let i = 1; i < prices.length; i++) {
        // prices are increasing
        if (prices[i] > prices[i-1]){
            if (Object.keys(increaseData).length === 0) { // start of an increase period
                increaseData = {
                    "buyIndex" : i-1,
                    "buyPrice": prices[i-1],
                    "sellIndex": i,
                    "sellPrice" : prices[i],
                    "profit" : prices[i] - prices[i-1]
                }
            } else { // increase period goes on
                //FIXME How can I do that instead the one below
                //increaseData.sellIndex = i;
                //increaseData.sellPrice = prices[i];
                //increaseDatea.profit = (increaseData.sellPrice - increaseData.buyPrice)
                
            }
        // prices are decreasing
        // FIXME Not sure what you did there yet...
        } else if (Object.keys(increaseData).length === 0){ // 
            
            
        } else { // this is the end of an increasing period; save the old one
            increasePeriods.push(increaseData)
            increaseData = {}
        }
    }
    console.log(increasePeriods)

    // b) filter increase periods by max profit & return it
    let sortedProfit = increasePeriods.sort((a, b)=> (a.profit < b.profit) ? 1 : -1)
    maxProfit = sortedProfit[0].profit;
    return maxProfit
}

console.log(algoTraderI(stockPricesI))



///////////////////////////////////////////////////////
// Solution Version 1
///////////////////////////////////////////////////////
/**
 * Checks for max possible profits of a given stock price history
 * - only one transaction is possible
 * - solution flaw: checks only the max profit from "x-price to max-price"; if "min-price to y-price" or "x-price to to y-price" are more profitable it won't take that into account
 * 
 * @param prices 
 * @returns max
 */
 function algoTraderI_flawed_solution (prices:number[]) {
    let maxProfit = 0;

    // sort frome min to max price
    let sortedPrices =  prices.sort((a, b) => (a > b) ? 1 : -1);
    // create array for direct manipulation
    let checkArr = [...sortedPrices]; 
    // check max profit from X to max_price
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

//console.log(algoTraderI_flawed_solution(stockPricesI))