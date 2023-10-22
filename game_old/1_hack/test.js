/** @param {NS} ns **/
export async function main(ns) {
	const TARGET = "foodnstuff"; //"n00dles"

	// NS1:
	//For example, if you want to determine how many grow calls you need to double the amount of money on foodnstuff, you would use:
	let growTimes = ns.growthAnalyze(TARGET, 2);
	//If this returns 100, then this means you need to call grow 100 times in order to double the money (or once with 100 threads).

	ns.tprint(`TEST: ns.growthAnalyze(TARGET, 2) returns ${growTimes}`)

	////////////////////////////////////

	let growth = ns.getServerGrowth(TARGET)
	let maxMoney = ns.getServerMaxMoney(TARGET)
	let availableMoney =ns.getServerMoneyAvailable(TARGET)

	ns.tprint(`INFO: BEFORE Rate = ${growth}, ${availableMoney.toLocaleString('de-DE')} of  ${maxMoney.toLocaleString('de-DE')}`)
	await ns.grow(TARGET);
	growth = ns.getServerGrowth(TARGET);
	availableMoney =ns.getServerMoneyAvailable(TARGET);
	ns.tprint(`INFO: AFTER Rate = ${growth}, ${availableMoney.toLocaleString('de-DE')} of  ${maxMoney.toLocaleString('de-DE')}`)
	

	/////////
	// a) don't push over omney limit
	// b) start growth if under certain % of money level
	// c) estimate how much growth operations to grow until x% of growth

	// Configuration variables
	let min_percentage = 0.5; // threshold % before growth() (relates to ServerMaxMoney)
	let aim_percentage = 1; // threshold % to stop growth() (relates to ServerMaxMoney)

	let maxMoney = ns.getServerMaxMoney(TARGET) // this seems to be no hard limit - the growth rate will decrease
	let minMoney =  maxMoney * min_percentage; // min threshold to start growth()
	let aimMoney = maxMoney * aim_percentage; // threshold to stop growth()



	
	
}