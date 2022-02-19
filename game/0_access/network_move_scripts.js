/** @param {NS} ns **/
export async function moveScripts(ns, target) {
	const HOST = ns.getHostname()
	const TARGET = target;

	let files = [
			"root-spread.js",
			"att_specific.js",
			"/0_access/getRoot.js",
			"/0_access/network_move_scripts.js",
			"/1_hack/standard.js",
			"spread_att_specific.js"			
		];

	// push infiltrations scripts to server connected
	let result = await ns.scp(files, HOST, TARGET); // returns: true
	(result) 
		? ns.tprint(`INFO: Script copied to connected "${TARGET}"`) 
		: ns.tprint(`ERROR: Could not move scripts to "${TARGET}"`)
	return;
}

export async function main(ns, target) {
	await moveScripts(ns, target)
}