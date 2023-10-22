import { moveScripts } from "0_access/network_move_scripts.js";

/** filterIntersectingItems()
 * -
 * - takes checkArr and removes items which intersect with knownArr
 * @param {[string]} checkArr
 * @param {[string]} knownArr
 * @returns {[string]} new items in checkArr
 */
function filterIntersectingItems(checkArr, knownArr) {
	/** 
	 * indexOff searches for the first occurance of a value
	 * if the value is not found it returns with -1 
	 * therfore the expression returns all unique values
	 *  */
	let newItemArr = checkArr.filter(item => knownArr.indexOf(item) == -1)
	return newItemArr
}


/** mergeWithoutDuplicates()
 * -
 * - merges two arrays into new array of unique values 
 * @param {[string]} arr1
 * @param {[string]} arr2
 * @returns {[string]}
 */
function mergeWithoutDuplicates(arr1, arr2) {
	// uses spread to merge
	let mergeArr = [...arr1, ...arr2]
	// uses set to filter down duplicates
	// uses spread to create an array of set items
	let removeDuplicates = [...new Set(mergeArr)];
	return removeDuplicates
}

/**
 * 
 * spread_att_specific.js
 * - 
 * Recursive function to atttack a specific server and spread the same commmand to every other servers in the network
 * - runs getRoot()
 * 	- success =>
 * 		- copy script to target
 * 		- repeat this script from target (next connection layer)
 * 	- fail =>  
 * 		- skip server & mark down as "visited"
 *  @param {NS} ns **/
export async function main(ns) {
	if(!ns.args[0]) {
		ns.tprint("ERROR: Please define target server before running the script")
		return
	}
	
	const TARGET_SERVER = ns.args.slice(0,1); // first param
	const CONNECTON_PARAMS = ns.args.slice(1,); // all the other params

	/// A) Recursion preps
	let scannedConnections = ns.scan(); // get connected servers
	// we need to know which servers are new here => root
	let newConnections = (CONNECTON_PARAMS.length > 0) // check for servers received as params
		? filterIntersectingItems(scannedConnections, CONNECTON_PARAMS) 
		// else: all scanned connections are new
		: [...scannedConnections];
	// we need to know which servers are already known => skip
	let knownConnections = (CONNECTON_PARAMS.length > 0)
		? mergeWithoutDuplicates(scannedConnections, CONNECTON_PARAMS)
		// else: scanned connections are all connections known
		: [...scannedConnections];
	
	
	/// B) move scripts
	for (let spreadServer of newConnections) {
		// a) check if has root to move scripts
		if (ns.hasRootAccess(spreadServer)) {
			// b) copies scripts to target
			await moveScripts(ns, spreadServer); // imported function
			// exec this script
			let targetAndConnections = [...TARGET_SERVER, ...knownConnections]
			ns.exec("spread_att_specific.js", spreadServer, 1, ...targetAndConnections);
			
		}else{ // c) if not root - skipe
			continue;
		}
	}
	
	/// C) attack sever
		// check threads
	const HOST = ns.getHostname();
	let attScriptRam = ns.getScriptRam("/1_hack/standard.js") 
	let availableRam = ns.getServerMaxRam(HOST) - ns.getServerUsedRam(HOST); // returns: int
	const THREADS = Math.floor(availableRam / attScriptRam);
	ns.print(`\nINFO: | ${THREADS} threads | ${availableRam} / ${attScriptRam}`);
	if (THREADS < 1) {
		ns.tprint(`\nERROR: Not enough threads (${THREADS}) on ${HOST} available`)
		return
	}
	
	// run attack on target server
	let res = await ns.run("/1_hack/standard.js", THREADS, ...TARGET_SERVER, THREADS)
	ns.tprint(`ERROR: TEST ${TARGET_SERVER}`);
	if(res) {
		ns.tprint(`\nINFO: Hack @${TARGET_SERVER} from ${HOST} started with ${THREADS}`)
	} else {
		ns.tprint(`\nERROR: Hack @${TARGET_SERVER} from ${HOST} failed`);
	}
}	