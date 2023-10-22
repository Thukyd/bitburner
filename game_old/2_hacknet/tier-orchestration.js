/** 
 * @param {NS} ns
 * @returns {Object[]} cluster information as name, gb, ram etc. 
 **/
async function getClusterData(ns) {
	let nodeCount = ns.hacknet.numNodes()
	// there is no node yet
	if (nodeCount == 0) {
		return 0
	}

	let cluster = []
	for (let i = 0; i < nodeCount; i++) {
		let singleNode = await ns.hacknet.getNodeStats(i);
		cluster.push(singleNode)
	}

	return cluster;
}

/** 
 * @param {Object[]} Cluster information
 * @param {Number} nodeNum 
 * @returns {Object[]} the first "nodeNum" of the cluster information
 **/
async function getXNodes(clusterData, nodeNum) {
	return await clusterData.slice(0, nodeNum);
}

/** 
 * @param {Object[]} Cluster information
 * @param {Number} maxLevel  
 * @returns {Object[]} a sorted array of nodes which did not reach maxLevel yet
 **/
async function nodesByMinLevel(clusterData, maxLevel) {
	return await clusterData
		.sort((a, b) => (a.level > b.level) ? 1 : -1) // sorted by min level => buy low levels first
		.filter(node => node.level < maxLevel)
}

/** 
 * @param {Object[]} Cluster information
 * @param {Number} maxRam 
 * @returns {Object[]} a sorted array of nodes which did not reach maxRam  yet
 **/
async function nodesByMinRam(clusterData, maxRam) {
	return await clusterData
		.sort((a, b) => (a.ram > b.ram) ? 1 : -1) // sorted by min ram => buy low ram first
		.filter(node => node.ram < maxRam)
		
}

/** 
 * @param {Object[]} Cluster information
 * @param {Number} maxRam 
 * @returns {Object[]} a sorted array of nodes which did not reach maxCores  yet
 **/
async function nodesByMinCores(clusterData, maxCores) {
	return await clusterData
		.sort((a, b) => (a.cores > b.cores) ? 1 : -1) // sorted by min cores => buy low amount cores first
		.filter(node => node.cores < maxCores)
}

/** 
 * Loop to buy nodes until you are out of money or the max is reached
 * @param {NS} ns 
 * @param {Number} maxNodestoBuy 
 **/
async function buyNumNodes(ns, maxNodesToBuy) {
	ns.print("INFO: buyNumNodes() check")
	let numNodes = ns.hacknet.numNodes();
	let money =  Math.floor(ns.getPlayer().money) - 1; // -1 to avoid rounding errors
	let price =  Math.floor(ns.hacknet.getPurchaseNodeCost());

	if (numNodes < maxNodesToBuy && money > price) {
		let nodeName = ns.hacknet.purchaseNode();
		ns.tprint(`INFO: Purchased hacknet-node-${nodeName}`);
	}
}

/**
 * - Loop to buy ram until you are out of money or the max is reached
 * - takes a cluster and 
 * @param {NS} ns 
 * @param {Object[]} cluster information
 **/
async function buyNumRam(ns, cluster) {
	// check if there are clusters which do not have the max ram
	if(cluster.length === 0) {
		ns.print("INFO: Could not add more RAM to nodes because defined 'maxRamToBuy' was reached already")
		return false
	}

	// try to upgrade ram (cluster is already sorted by the low as index 0)
	let nodeIndex = Number(cluster[0].name.replace('hacknet-node-','')) // get index
	let upgraded = await ns.hacknet.upgradeRam(nodeIndex , 1) // buy ram
	if (upgraded) {
		ns.tprint(`INFO: Upgraded ${cluster[0].name} to ${cluster[0].ram} ram`)
	} else {
		 ns.print(`INFO: Could not upgrade ${cluster[0].name}`)
	}
	
	return true // upgrades are still possible
}

/**
 * - Loop to buy level until you are out of money or the max is reached
 * - takes a cluster and 
 * @param {NS} ns 
 * @param {Object[]} cluster information
 **/
async function buyNumLevel(ns, cluster) {
	// check if there are clusters which do not have the max level
	if(cluster.length === 0) {
		ns.print("INFO: Could not add more Level to nodes because defined 'maxLevelToBuy' was reached already")
		return false
	}

	// try to upgrade ram (cluster is already sorted by the low as index 0)
	let nodeIndex = Number(cluster[0].name.replace('hacknet-node-','')) // get index
	let upgraded = await ns.hacknet.upgradeLevel(nodeIndex , 10) // buy level
	if (upgraded) {
		ns.tprint(`INFO: Upgraded ${cluster[0].name} to level ${ns.hacknet.getNodeStats(nodeIndex).level}`)
	} else {
		 ns.print(`INFO: Could not upgrade ${cluster[0].name}`)
	}
	
	return true // upgrades are still possible
}

/**
 * - Loop to buy cores until you are out of money or the max is reached
 * - takes a cluster and 
 * @param {NS} ns 
 * @param {Object[]} cluster information
 **/
async function buyNumCores(ns, cluster) {
	// check if there are clusters which do not have the core ram
	if(cluster.length === 0) {
		ns.print("INFO: Could not add more cores to nodes because defined 'maxCoresToBuy' was reached already")
		return false
	}

	// try to upgrade ram (cluster is already sorted by the low as index 0)
	let nodeIndex = Number(cluster[0].name.replace('hacknet-node-','')) // get index
	let upgraded = await ns.hacknet.upgradeCore(nodeIndex , 1) // buy ram
	if (upgraded) {
		ns.tprint(`INFO: Upgraded ${cluster[0].name} to ${cluster[0].cores + 1} cores`)
	} else {
		 ns.print(`INFO: Could not upgrade ${cluster[0].name}`)
	}
	
	return true // upgrades are still possible
}


/** @param {NS} ns **/
export async function main(ns) {
	const CLUSTER = await getClusterData(ns);

	let OPERATIONS_LOG = {
		"max_nodes": 12,
		"a": false,
		"b": false,
		"c" : false,
		"d" : false,
		"e" : false,
		"f" :false,
		"g" : false,
	}

	////////////
	// a) purchase X nodes
	if(ns.hacknet.numNodes() < OPERATIONS_LOG.max_nodes)	{
		return await buyNumNodes(ns, OPERATIONS_LOG.max_nodes)
	} else {
		ns.print(`INFO: Operation a) | MAX_NODES of ${OPERATIONS_LOG.max_nodes} reached`);
		OPERATIONS_LOG.a = true;
	}

	if(!OPERATIONS_LOG.a){
		return false;
	}

	////////////
	// b) upgrade X nodes to 16gb ram
	let maxRam = 16
	// order nodes by min ram
	let clusterByRam = await nodesByMinRam(CLUSTER, maxRam);
	// if there are no upgradable nodes (conditions apply) it returns false
	let bStillToBeUpgraded = await buyNumRam(ns, clusterByRam)
	if (!bStillToBeUpgraded) {
		ns.print(`INFO: Operation b) | relevant nodes fully upgraded to ${maxRam} gb ram`)
		OPERATIONS_LOG.b = true;
	}
	
	if(!OPERATIONS_LOG.b){
		return false;
	}

	///////////
	// c) upgrade X nodes to level 100
	let maxLevel = 100
	let clusterByLevel = await nodesByMinLevel(CLUSTER, maxLevel);
	let cStillToBeUpgraded = await buyNumLevel(ns, clusterByLevel);
	if (!cStillToBeUpgraded) {
		ns.print(`INFO: Operation c) | relevant nodes fully upgraded to level ${maxLevel}`)
		OPERATIONS_LOG.c = true;
	}
	if(!OPERATIONS_LOG.c){
		return false;
	}


	///////////
	// d) upgrade X nodes to 4 cores
	let maxCores = 4
	let clusterByCore = await nodesByMinCores(CLUSTER, maxCores);
	let dStillToBeUpgraded = await buyNumCores(ns, clusterByCore);
	if (!dStillToBeUpgraded) {
		ns.print(`INFO: Operation d) | relevant nodes fully upgraded to ${maxCores} cores`)
		OPERATIONS_LOG.d = true;
	}
	if(!OPERATIONS_LOG.d){
		return false;
	}

	///////////
	// e) upgrade X nodes to 64gb ram
	maxRam = 64
	// order nodes by min ram
	clusterByRam = await nodesByMinRam(CLUSTER, maxRam);
	// if there are no upgradable nodes (conditions apply) it returns false
	let eStillToBeUpgraded = await buyNumRam(ns, clusterByRam)
	if (!eStillToBeUpgraded) {
		ns.print(`INFO: Operation e) | relevant nodes fully upgraded to ${maxRam} gb ram`)
		OPERATIONS_LOG.e = true;
	}
	
	if(!OPERATIONS_LOG.e){
		return false;
	}

	///////////
	// f) upgrade X nodes to level 200
	maxLevel = 200
	clusterByLevel = await nodesByMinLevel(CLUSTER, maxLevel);
	let fStillToBeUpgraded = await buyNumLevel(ns, clusterByLevel);
	if (!fStillToBeUpgraded) {
		ns.print(`INFO: Operation f) | relevant nodes fully upgraded to level ${maxLevel}`)
		OPERATIONS_LOG.f = true;
	}
	if(!OPERATIONS_LOG.f){
		return false;
	}

	///////////
	// g) upgrade X nodes to 16 cores
	maxCores = 16
	clusterByCore = await nodesByMinCores(CLUSTER, maxCores);
	let gStillToBeUpgraded = await buyNumCores(ns, clusterByCore);
	if (!gStillToBeUpgraded) {
		ns.print(`INFO: Operation g) | relevant nodes fully upgraded to ${maxCores} cores`)
		OPERATIONS_LOG.g = true;
	}
	if(!OPERATIONS_LOG.g){
		return false;
	}

	///////////
	// h) 
	/// Repeat with next two nodes
	OPERATIONS_LOG = {
		"max_nodes": OPERATIONS_LOG.max_nodes + 2,
		"a": false,
		"b": false,
		"c" : false,
		"d" : false,
		"e" : false,
		"f" :false,
		"g" : false,
	}

// TODO
	// change to 16
	if (OPERATIONS_LOG.max_nodes > 18) {
		return true;
	}


}