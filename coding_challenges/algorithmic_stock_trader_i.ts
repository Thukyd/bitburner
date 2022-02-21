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
let stockPricesI_testI = [43,65,133,117,15,102,17,187,287,20,84,57,129,123,150,69,108,183,186,75,191];
let stockPricesI_testII = [0, 10, 20, 30, 40 , 50, 45, 35, 25, 15];


/**
 * Checks for max possible profits of a given stock price history
 * - only one transaction is possible
 * 
 * @param prices 
 * @returns {Object} Transaction
 * { buyIndex : number, buyPrice: number, sellIndex: number, sellPrice : number, profit : number }
 */
function algoTraderI (prices:number[]) {
    // defining new Transaction type
        // Transaction holds profit, buy/sell values and their responding index
    type Transaction = { [key:string]: number}; // you just define that there is a key and a number value, but not which one
    // Defining array of Transatcion type
    let increasePeriods: Transaction[] = [];
    // defining object of Transaction type
    let increaseData : Transaction = {}

    // looping through array to detect the periods of increasing prices
    for (let i = 1; i < prices.length + 1; i++) {
        console.log(`If ${prices[i]} > ${prices[i-1]}`)
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
// BUG: See Bugfix in AlgoTrader III
        } else {
            increasePeriods.push(increaseData) // save transaction to increasePeriods
            increaseData = {} // reset transaction
        }
    }
    //console.log(increasePeriods) // just for testing

    // b) filter increase periods by max profit & return it
    let sortedProfit = increasePeriods.sort((a, b)=> (a.profit < b.profit) ? 1 : -1)
    return sortedProfit[0];
}

// Solution
//let solution = algoTraderI(stockPricesI)
//console.log(`SOLUTION : There is a max profit of "${solution.profit}" if you buy at ${solution.buyPrice} and sell at ${solution.sellPrice}`)

// TEST 
//let testI = algoTraderI(stockPricesI_testI)
//console.log(`TEST: There is a max profit of "${testI.profit}"" if you buy at ${testI.buyPrice} and sell at ${testI.sellPrice}`)

// TEST II
let testII = algoTraderI(stockPricesI_testII)
console.log(`TEST: There is a max profit of "${testII.profit}"" if you buy at ${testII.buyPrice} and sell at ${testII.sellPrice}`) 



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