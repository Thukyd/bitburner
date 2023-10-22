import {main as TIER} from "2_hacknet/tier-orchestration.js";

/** @param {NS} ns **/
export async function main(ns) {
	/// RUN THE loop and execute the prefered scaling method
	let stillUpgrading = false;

	while(!stillUpgrading) {
		stillUpgrading = await TIER(ns) // Orchstrate by Tier System
		await ns.sleep(500)
	}

	ns.tprint(`ERROR: MAX NODES OF ${ns.hacknet.numNodes()} REACHED`)
}