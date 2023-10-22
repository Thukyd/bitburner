type stockData = {
    symbol : string,
    price : number,
    forecast : number,
    volatility : number
}[];

let exampleData = [{"symbol":"ECP","price":44516.63105340946,"forecast":0.31004975268095375,"volatility":0.0043},{"symbol":"MGCP","price":76735.87563736577,"forecast":0.6610067618061538,"volatility":0.0048},{"symbol":"BLD","price":25182.96672452659,"forecast":0.358268264607955,"volatility":0.0072},{"symbol":"CLRK","price":2626.4731736023805,"forecast":0.6006612612778437,"volatility":0.0073},{"symbol":"OMTK","price":7830.865865110841,"forecast":0.6528563271481902,"volatility":0.0067},{"symbol":"FSIG","price":61014.4569471162,"forecast":0.6103069538448406,"volatility":0.0101},{"symbol":"KGI","price":5181.4639163617685,"forecast":0.4080072278118284,"volatility":0.0083},{"symbol":"FLCM","price":3575.4221819906124,"forecast":0.6231749701926722,"volatility":0.0129},{"symbol":"STM","price":14545.749922843635,"forecast":0.3960534632247159,"volatility":0.0089},{"symbol":"DCOMM","price":8013.045813501947,"forecast":0.40129695565692847,"volatility":0.006500000000000001},{"symbol":"HLS","price":13871.323557282334,"forecast":0.3890981734774228,"volatility":0.005699999999999999},{"symbol":"VITA","price":3972.1239378500413,"forecast":0.4323456849015815,"volatility":0.0074},{"symbol":"ICRS","price":21952.06364855275,"forecast":0.5672815071274095,"volatility":0.0060999999999999995},{"symbol":"UNV","price":44399.13898354363,"forecast":0.38743337252114635,"volatility":0.0052},{"symbol":"AERO","price":7707.867040437805,"forecast":0.42544734457004174,"volatility":0.005699999999999999},{"symbol":"OMN","price":13014.251673869398,"forecast":0.5679467997173346,"volatility":0.006500000000000001},{"symbol":"SLRS","price":1053.4872080803457,"forecast":0.5732376469258957,"volatility":0.0079},{"symbol":"GPH","price":24915.260197539807,"forecast":0.33935592550047977,"volatility":0.005600000000000001},{"symbol":"NVMD","price":52837.16563890314,"forecast":0.4378179108601592,"volatility":0.0077},{"symbol":"WDS","price":75006.00116290577,"forecast":0.450507684546411,"volatility":0.025699999999999997},{"symbol":"LXO","price":10083.515645617856,"forecast":0.4323440266212951,"volatility":0.012199999999999999},{"symbol":"RHOC","price":5383.500261001781,"forecast":0.5509636601470507,"volatility":0.0058},{"symbol":"APHE","price":298759.0124533847,"forecast":0.581215567402681,"volatility":0.0202},{"symbol":"SYSC","price":8463.708756703389,"forecast":0.5692594446186796,"volatility":0.015300000000000001},{"symbol":"CTK","price":1508.7637527832103,"forecast":0.5745946038606305,"volatility":0.0089},{"symbol":"NTLK","price":6.377443223792451,"forecast":0.3250868941732479,"volatility":0.0315},{"symbol":"OMGA","price":1236.508494674973,"forecast":0.4394603206523085,"volatility":0.0106},{"symbol":"FNS","price":1704.9538767698234,"forecast":0.5526031947174126,"volatility":0.0079},{"symbol":"JGN","price":13.000095213165547,"forecast":0.5589358418527979,"volatility":0.035},{"symbol":"SGC","price":382.2926374432657,"forecast":0.44645684414907805,"volatility":0.016200000000000003},{"symbol":"CTYS","price":402.8932598635965,"forecast":0.4269235272329129,"volatility":0.013600000000000001},{"symbol":"MDYN","price":13331.993934585682,"forecast":0.5809782449733005,"volatility":0.0073},{"symbol":"TITN","price":27369.396254812535,"forecast":0.39071259137819075,"volatility":0.0059}]




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
    // a) get stocks
//TODO  change for PROD
    //let symbols = ns.stock.getSymbols();
    //let stocks = getStocks(ns, symbols)
    let test:stockData = exampleData; 
    let stocks:stockData = exampleData;
////////	

    // b) sort by volatility
    stocks.sort((a,b) => (a.volatility < b.volatility) ? 1 : -1)
    let max = stocks.reduce((prev, current) => (prev.forecast > current.forecast) ? prev : current)


    console.log(stocks);
	console.log(`\n\nHighest Increase`);
    console.log(max)



	// https://github.com/danielyxie/bitburner/blob/dev/markdown/bitburner.tix.md

	
	//ns.tprint(ns.stock.buy(symbols[0],1))
	//ns.tprint(ns.stock.getPosition(symbols[0]))

}

main("das")