/// get access to all networks
// TODO => add non directly linked

/** 
 * portOperations
 * - checks if port programs exists and runs them on target	
 * @param {NS} ns
 * @param {string} target which server it should be used on
 * **/
export async function portOperations(ns, target) {	
	// try to open all ports
	(ns.fileExists("BruteSSH.exe", "home"))
		? ns.brutessh(target)
		: ns.tprint("ERROR: No SSH tool yet");

	(ns.fileExists("FTPCrack.exe", "home"))
		? ns.ftpcrack(target)
		: ns.tprint("ERROR: No FTP tool yet");	

	(ns.fileExists("relaySMTP.exe", "home"))
		? ns.relaysmtp(target)
		: ns.tprint("ERROR: No SMTP tool yet");

	(ns.fileExists("HTTPWorm.exe", "home"))
		? ns.httpworm(target)
		: ns.tprint("ERROR: No HTTP tool yet");

	(ns.fileExists("SQLInject.exe", "home"))
		? ns.sqlinject(target)
		: ns.tprint("ERROR: No SQL tool yet");
}


/** @param {NS} ns 
 *	@param {String} target
 * 	@returns {Bool} true/false
 */
export async function getRoot(ns, target) {
	// enough hack-skill?
	let skillNeeded = ns.getServerRequiredHackingLevel(target);
	if (ns.getHackingLevel() < skillNeeded) {
		ns.tprint(`INFO: Skipping ${target} - skill ${skillNeeded} needed`)
		return false;
	}

	// open up ports
	await portOperations(ns, target)
	
	// Nuke server
	ns.nuke(target);

	// check success 
	let hasRoot = ns.hasRootAccess(target);
	if (hasRoot) {
		ns.tprint(`INFO: Got root @${target}.`)
		return true;
	} else {
		ns.tprint(`ERROR: Not sufficient port tools for ${target}.`)
		return false;
	}
}