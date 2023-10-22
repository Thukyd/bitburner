import { getAllServers } from "3_contracts/find_servers.js";


/**
* Copies files in file list to all servers and returns an array of all servers
*  @param {NS} ns **/
export function main(ns) {
	let serverList = getAllServers(ns);
	ns.tprint(serverList)
}