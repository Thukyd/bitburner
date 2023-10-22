// TODO: Add killall?

import {getRoot} from "0_access/getRoot.js" 
import {moveScripts} from "0_access/network_move_scripts.js"


/** filterIntersectingItems()
 * -
 * - takes checkArr and removes items which intersect with knownArr
 * @param {[string]} checkArr
 * @param {[string]} knownArr
 * @returns {[string]} new items in checkArr
 */
function filterIntersectingItems(checkArr,knownArr) {
    /** 
     * indexOff searches for the first occurance of a value
     * if the value is not found it returns with -1 
     * therfore the expression returns all unique values
     *  */ 
    let newItemArr = checkArr.filter(item => knownArr.indexOf(item) == -1 )
    return newItemArr
}

/** mergeWithoutDuplicates()
 * -
 * - merges two arrays into new array of unique values 
 * @param {[string]} arr1
 * @param {[string]} arr2
 * @returns {[string]}
 */
function mergeWithoutDuplicates(arr1,arr2) {
	// uses spread to merge
    let mergeArr = [...arr1, ...arr2] 
	// uses set to filter down duplicates
	// uses spread to create an array of set items
    let removeDuplicates = [...new Set(mergeArr)]; 
    return removeDuplicates
}


/**
 * 
 * Spread-Root
 * - 
 * Recursive function to spread network to all servers, root & copy scripts to them
 * - runs getRoot()
 * 	- success =>
 * 		- copy script to target
 * 		- repeat this script from target (next connection layer)
 * 	- fail =>  
 * 		- skip server & mark down as "visited"
 *  @param {NS} ns **/
export async function main(ns) {
	
	/// Recursion preps
	let scannedConnections = ns.scan(); // get connected servers
	// we need to know which servers are new here => root
	let newConnections = (ns.args[0]) // check for servers received as params
		? filterIntersectingItems(scannedConnections, ns.args) 
		// else: all scanned connections are new
		: [...scannedConnections];
	// we need to know which servers are already known => skip
	let knownConnections = (ns.args[0])
		? mergeWithoutDuplicates(scannedConnections, ns.args)
		// else: scanned connections are all connections known
		: [...scannedConnections];

	/// runs rooting at server list
	for (let targetServer of newConnections) {
		// a) roots target
		let rooted = await getRoot(ns, targetServer); // imported function
		if (rooted) {
			// b) copies scripts to target
			await moveScripts(ns, targetServer); // imported function
			// c) runs "spread-root.js" from target again (recursion)
				// it does not attack known server by sending them as param
				// this is necesarry to avoid recursion loop!
			ns.exec("root-spread.js", targetServer, 1, ...knownConnections);
		}else{ // d) if root not succesful skip it
			continue;
		}
	}
}