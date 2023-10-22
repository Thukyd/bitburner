/**
 * 	run: 
 * 		run att_network_themselves.js
 * 	desc:
 * 		- copies attack script on neighbour servers
 * 		- lets them attack themselves
 * 
 *  @param {NS} ns **/
export async function main(ns) {
	// check for required ram
	let attScriptRam = ns.getScriptRam("/1_hack/standard.js")
	await ns.sleep(1000)

	// ceheck for connections 
	let connections = ns.scan()

	ns.tprint(`\n\nINFO: Starting hacking...`)

	for (let host of connections) {
		/**	calculate threads
		 * 	@param {number} availableRam - subtract used ram from the total
		 * 	@param {number} attScriptRam - needed to attack server
		 */
		let availableRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); // returns: int
		const THREADS = Math.floor(availableRam / attScriptRam);
		ns.tprint(`\nINFO: ${THREADS} threads | ${availableRam} / ${attScriptRam}`);

		// copy scripts to server
		let files = ["/1_hack/standard.js", "att_network_themselves.js"]
		let copy = await ns.scp(files, host); // returns: true
		(copy) ? ns.tprint(`\nINFO: Successful moved script on ${host}`)
			:ns.tprint(`\nError: Failed to move script to ${host}`)
		
		if (THREADS < 1) {
			ns.tprint(`\nError: Not enough threads (${THREADS}) on ${host} available`)
			continue
		}

		// run script on host
		let res = ns.exec("/1_hack/standard.js", host, THREADS, host, THREADS);
		(res) 
			? ns.tprint(`\nINFO: Hack @${host} started with ${THREADS}`)
			: ns.tprint(`\nERROR: Hack @${host} failed`);
	}

}