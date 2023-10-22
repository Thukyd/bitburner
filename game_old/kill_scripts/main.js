/** @param {NS} ns **/
export async function main(ns) {
	let servers = ns.scan();

	for (let server of servers) {
		ns.killall(server)
		ns.tprint(`INFO: killed all scripts on ${server}`)
	}
}