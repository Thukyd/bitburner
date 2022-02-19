const CLUSTER = [
	{
		name: "hacknet-node-0",
		level: 12,
		ram: 8,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 52022.39999993344,
		totalProduction: 1025945266.8600935,
	},
	{
		name: "hacknet-node-1",
		level: 200,
		ram: 1,
		cores: 2,
		production: 25047.45195307829,
		timeOnline: 51716.79999993346,
		totalProduction: 928796259.4796194,
	},
	{
		name: "hacknet-node-2",
		level: 196,
		ram: 64,
		cores: 3,
		production: 25047.45195307829,
		timeOnline: 51716.19999993346,
		totalProduction: 857070556.6988095,
	},
	{
		name: "hacknet-node-3",
		level: 200,
		ram: 2,
		cores: 6,
		production: 25047.45195307829,
		timeOnline: 33765.80000002323,
		totalProduction: 722218192.664927,
	},
	{
		name: "hacknet-node-4",
		level: 2,
		ram: 32,
		cores: 9,
		production: 25047.45195307829,
		timeOnline: 33765.400000023226,
		totalProduction: 710602835.9975631,
	},
	{
		name: "hacknet-node-16",
		level: 1,
		ram: 64,
		cores: 12,
		production: 25047.45195307829,
		timeOnline: 33765.20000002322,
		totalProduction: 697869621.9599792,
	}
];



function buyNumRam(cluster, maxRamToBuy) {
    /////////////////

    let getRamUpgradeCost = [
        5,
        6,
        9,
        10
    ]

    ///////////////////////


	//TODO documentation
	// let money = ns.getPlayer().money;

	// => this functions gives you cost for a specific node
	// you already ordered the cluster so that the lowest nodes are first
	// i think you don't need to get the cost up ahead but maybe create 
	// a new cluster data object which includes the price


	// Last part of the map has got to call fu
	// TEST THIS OUT!! 
	
	let clusterBuyList = cluster.map((node, index) =>  {
        let nodeIndex = Number(node.name.replace('hacknet-node-',''))
        console.log(nodeIndex)

        return {
            "name" : node.name,
            "ram" : node.ram,
            "num" : nodeIndex,
            "price" : getRamUpgradeCost[nodeIndex]
        }
    })

	// When you loop you need to update the price

    return clusterBuyList


}


let test = buyNumRam(CLUSTER, 6)

console.log(test)