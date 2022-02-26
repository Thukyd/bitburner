/**
 * Source: https://github.com/kamukrass/Bitburner/blob/develop/getServers.js
 * Gets list of all servers
 * @param {*} ns 
 * @returns [] of servers
 */
 export function getAllServers(ns) {
	var servers = []; // list of servers
	var serverDiscovered = []; // list of already discovered servers

    // add home server as starting point
	servers.push("home"); 
	serverDiscovered["home"] = true;

	while (servers.length) { // while there are still starting points to scan
		let currentServer = servers.shift(); // get first server in list

		let scans = ns.scan(currentServer); // scan connections of first server

		for (let i = 0; i < scans.length; i++) { // runs down all connectons
			if (!serverDiscovered[scans[i]]) { 
				serverDiscovered[scans[i]] = true; // mark as discoverd
				servers.push(scans[i]); // push server as starting point to scan
			}
		}
	}
	return Object.keys(serverDiscovered); // return all discovered servers
}