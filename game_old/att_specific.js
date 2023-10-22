/**
 * 	run: 
 * 		run att_neighbour "NAME"  
 * 	desc:
 * 		runs attack current server to connected server
 * 
 *  @param {NS} ns **/
export async function main(ns) {
	if(!ns.args[0] && typeof(ns.args[0]) != String) {
		ns.tprint(`ERROR: func expects param "hostname" as string`)
		return
	}
	const ATTACK_SERVER = ns.args[0];
	const HOST = ns.getHostname();

	
	
	/**	calculate threads
	 * 	@param {number} reserveHacknetScript - if hacknet is not running yet, reserve the ram for it
	 * 	@param {number} availableRam - subtract used ram from the total
	 * 	@param {number} attScriptRam - needed to attack server
	 */

	// TODO: THIS IS NOT UP_TO_DATE ANYMORE => there are new files!
	let reserveHacknetScript = 0;
	if(HOST === "home" && !ns.scriptRunning("hacknet.js", "home")) {
		reserveHacknetScript = ns.getScriptRam("/2_hacknet/orchestrate_cluster.js");
		ns.tprint(`\nINFO: Reserved additional ${reserveHacknetScript}GB ram for "orchestrate_cluster.js"`);

	}
	let availableRam = ns.getServerMaxRam(HOST) - ns.getServerUsedRam(HOST) - reserveHacknetScript; // returns: int
	let attScriptRam = ns.getScriptRam("/1_hack/standard.js")
	const THREADS = Math.floor(availableRam / attScriptRam);
	ns.tprint(`\nINFO: ${THREADS} threads | ${availableRam} / ${attScriptRam}`);

	// run attack script
	let run = ns.run("/1_hack/standard.js", THREADS, ATTACK_SERVER, THREADS);
	(run)
		? ns.tprint(`\nINFO: Hack @${ATTACK_SERVER} started with ${THREADS} threads`)
		: ns.tprint(`\nERROR: Hack @${ATTACK_SERVER} failed`);

}