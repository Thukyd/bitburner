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
		name: "hacknet-node-5",
		level: 1,
		ram: 64,
		cores: 12,
		production: 25047.45195307829,
		timeOnline: 33765.20000002322,
		totalProduction: 697869621.9599792,
	},
	{
		name: "hacknet-node-6",
		level: 200,
		ram: 32,
		cores: 11,
		production: 25047.45195307829,
		timeOnline: 28572.600000023238,
		totalProduction: 526589018.7539026,
	},
	{
		name: "hacknet-node-7",
		level: 200,
		ram: 64,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 21538.80000001554,
		totalProduction: 366745494.7278987,
	},
	{
		name: "hacknet-node-8",
		level: 200,
		ram: 16,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 14105.600000010449,
		totalProduction: 349370558.5916234,
	},
	{
		name: "hacknet-node-9",
		level: 200,
		ram: 64,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 13715.200000008992,
		totalProduction: 290257717.3264488,
	},
	{
		name: "hacknet-node-10",
		level: 200,
		ram: 5,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 12861.000000005264,
		totalProduction: 244850267.3768638,
	},
	{
		name: "hacknet-node-11",
		level: 200,
		ram: 32,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 9894.799999998513,
		totalProduction: 228739506.142359,
	},
	{
		name: "hacknet-node-12",
		level: 123,
		ram: 1,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 9824.399999998515,
		totalProduction: 218403562.3540772,
	},
	{
		name: "hacknet-node-13",
		level: 200,
		ram: 64,
		cores: 16,
		production: 25047.45195307829,
		timeOnline: 457.79999999998734,
		totalProduction: 11171371.074173864,
	},
	{
		name: "hacknet-node-14",
		level: 1,
		ram: 1,
		cores: 1,
		production: 4.096599194115257,
		timeOnline: 6.800000000000003,
		totalProduction: 27.856874519983762,
	},
];


//////////////////////
/// test

// refrence to const CLUSTER to get the data
let singleNode = CLUSTER[0];
//console.log(singleNode)




/// TODO: FILE Structure
    /** 
     *  Orchestrator.js as main execution point
     *      => inside this it references to different scaling logics as functions 
     *      => in the main I define my conifg as well
     * 
     *      => my first scaling function as described below the "tierScaling()""
     *  */


/// TODO: Before purchasing anything check the tiers
// TODO: READ DOCS https://github.com/danielyxie/bitburner/blob/dev/markdown/bitburner.hacknet.md
//                  https://github.com/danielyxie/bitburner/blob/dev/markdown/bitburner.hacknetnodesformulas.md
/**

 *  //TODO for TIERS find out the cost of an of production of a node & find out the cost to upgrade all
 *  // if it's too expenisve set it as tier limit
 *  // could be the same with upgrades => you don't have to upgrade to 200,64,16 Nodes => there might better value choices
 */

//////////////
const TIER = [
    {"name" : "TIER-1", "maxNodes" : 6},
    {"name" : "TIER-2", "maxNodes" : 9},
    {"name" : "TIER-3", "maxNodes" : 12}
]


	////////////
	// A) purchase 6 nodes
// find first 6 Nodes
const PRICE = 1;
let money = 2;
const MAX_NODE_NUM = 6;
const TEST_MAX_NODE_LEVEL = 200
let firstXNodes = CLUSTER.slice(0, MAX_NODE_NUM);
//console.log(firstXNodes)

	// (!NEW) upgrade 6 up to 32gb ram 
let sortedByRam = firstXNodes.sort( (a,b) =>  (a.ram > b.ram) ? 1: -1) // sort by lowest ram
//console.log(sortedByRam)

let testNodeNum = 2

for(let i = 0; i < MAX_NODE_NUM; i++){
    if(money >= PRICE && testNodeNum <= 6) {
        //console.log(`INFO: Purchased "hacknet-node-${i}"`)
        money--
        testNodeNum++
    }
}

	// a) 6 nodes up to level 100
// ilter to first 6 Nodes under lvl 100
// find the lowest to update next
money = 192
let sortedAndFilteredByLvl = firstXNodes
    .sort((a,b) => (a.level < b.level) ? 1 : -1) // sorted by high level => buy low levels first
    .filter(node => node.level < 100)

//console.log(sortedAndFilteredByLvl)


for(let i = 0; i < MAX_NODE_NUM; i++){
    if(money >= PRICE) {
        //console.log(`TEST: level of ${sortedAndFilteredByLvl[i].name} was ${sortedAndFilteredByLvl[i].level} before`)
        while (money >= PRICE && sortedAndFilteredByLvl[i].level < TEST_MAX_NODE_LEVEL) {
            money--
            sortedAndFilteredByLvl[i].level++
            //console.log(`INFO: Purchased for ${sortedAndFilteredByLvl[i].name}: now level ${sortedAndFilteredByLvl[i].level}"`)
        }
    }
}

	// b) upgrade 6 nodes and upgrade ram to 64gb
// filter to 6 nodes with ram under 64gb
// find the lowest to update next
// no need to purchase here because the loops before worked

let sortAndFilterByRam = firstXNodes
    .sort( (a, b) => (a.ram > b.ram) ? 1 : -1)
    .filter( node => node.ram < 64)

//console.log(sortAndFilterByRam)

	// c) upgrade 6 nodes to  4 cores
// TODO filter to 6 nodes with cores under 4
// TODO find the lowest to update next

let sortAndFilterByCores = firstXNodes
    .sort((a, b) => (a.cores > b.cores) ? 1 : -1)
    .filter(node => node.cores < 4)

console.log(sortAndFilterByCores)

	// d) buy rest of nodes and upgrade them the same
// TODO test next TIER level