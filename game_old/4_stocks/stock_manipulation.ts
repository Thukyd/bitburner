/* 
https://bitburner.readthedocs.io/en/latest/basicgameplay/stockmarket.html

Hacking
If a server has a corresponding stock (e.g. foodnstuff server -> FoodNStuff stock), then hacking that server can decrease the stock’s second-order forecast. This causes the corresponding stock’s forecast to trend downwards in value over time.

This effect only occurs if you set the stock option to true when calling the hack() function. The chance that hacking a server will cause this effect is based on what percentage of the server’s total money you steal.

A single hack will have a minor effect, but continuously hacking a server for lots of money over time will have a noticeable effect in making the stock’s forecast trend downwards.

Growing
If a server has a corresponding stock (e.g. foodnstuff server -> FoodNStuff stock), then growing that server’s money can increase the stock’s second-order forecast. This causes the corresponding stock’s forecast to trend upwards in value over time.

This effect only occurs if you set the stock option to true when calling the grow() function. The chance that growing a server will cause this effect is based on what percentage of the server’s total money to add to it.

A single grow operation will have a minor effect, but continuously growing a server for lots of money over time will have a noticeable effect in making the stock’s forecast trend upwards.


*/


type stockData = {
    symbol : string,
    price : number,
    forecast : number,
    volatility : number
}[];


async function getStock(ns, symbol:string) {
	return {
			symbol : symbol,
			price : ns.stock.getPrice(symbol),
			forecast : ns.stock.getForecast(symbol),
			volatility : ns.stock.getVolatility(symbol)
		}
}


/*
async function getStocks(ns, symbols:stockData) {
	let stocks = []
	for (let symbol of symbols) {
		stocks.push({
			symbol : symbol,
			price : ns.stock.getPrice(symbol),
			forecast : ns.stock.getForecast(symbol),
			volatility : ns.stock.getVolatility(symbol)
		})
	}
}
*/

/** @param {NS} ns **/
export async function main(ns:any) {
   // TODO: get server to attack by args
   if (ns.args.length !== 1) {
	 throw new Error("Cannot find server as param")
   }

   // TODO: Company to server server Mapping
   const SERVER = ns.args[0]
   const SERVER_SYMBOL = "MGCP"


   // Loop
   	// TODO: buy & hack until low 
	
   	// TODO: sell & grow until high


}

main("das")