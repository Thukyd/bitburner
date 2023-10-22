///////////////////
/// TODO:
/// 	- write grow function
/// in calling function ==> threads (number) - Number of threads to use for this function. Must be less than or equal to the number of threads the script is running with.
///////////////////
/**
 * Hacking Operations
 */
export async function tryToHack(ns, HOST, THREADS) {
	let result = await ns.hack(HOST, { threads: THREADS });
	if (!result) {
		return false
	} else {
		return true;
	}
};

/**
 * Weaken Security Level
 * 	- runs until minimum is reached
 */
export async function weakenSecurityLevel(ns, HOST, THREADS) {
	let minLvl = ns.getServerMinSecurityLevel(HOST); // returns: 3
	let currentLvl = ns.getServerSecurityLevel(HOST); // returns: 3.45

	while (currentLvl !== minLvl) {
		await ns.weaken(HOST, { threads: THREADS })
		currentLvl = ns.getServerSecurityLevel(HOST);
		ns.print(`${HOST}'s security level is ${currentLvl} of ${minLvl}`)
	}
	ns.print(`Reached min security level of ${HOST}: ${currentLvl} of ${minLvl}`)
	return
}

/**	
 * staticGrowth()
 * 	- runs growth 5 times in a row
 * @param {NS} ns 
 * @param (String) HOST - target server
 * **/
export async function staticGrowth(ns, HOST) {
	for (let i = 0; i < 5; i++){
		let money = ns.getServerMoneyAvailable(HOST)
		ns.print(`INFO: Money on ${HOST}: ${money.toLocaleString('en-US',{maximumFractionDigits:0})}`)
		await ns.grow(HOST);
	}
}

/**	
 * percentageGrowth()
 * - keeps running growth() until acceptable availabale server money
 * @param {NS} ns 
 * @param {String} TARGET target server
 * @param {String} aim_percentage threshold % to stop growth() (relates to ServerMaxMoney)
 * */
export async function percentageGrowth(ns, TARGET, aim_percentage) {	
	let maxMoney = ns.getServerMaxMoney(TARGET) // this seems to be no hard limit - the growth rate will decrease
	let currentMoney = ns.getServerMoneyAvailable(TARGET)
	let aimMoney = maxMoney * aim_percentage; // threshold to stop growth()

	ns.print(`INFO: Start to .grow() money on @${TARGET}: current ${currentMoney.toLocaleString('en-US',{maximumFractionDigits:0})}\$`);
	while(currentMoney < aimMoney) {	
		await ns.grow(TARGET);
		currentMoney = ns.getServerMoneyAvailable(TARGET)
		ns.print(`INFO: grow() aim | ${currentMoney.toLocaleString('en-US',{maximumFractionDigits:0})}\$ / ${aimMoney.toLocaleString('en-US',{maximumFractionDigits:0})}\$`);
	}
	ns.print(`INFO: Finished to .grow() money on @${TARGET}: current ${currentMoney.toLocaleString('en-US',{maximumFractionDigits:0})}\$`);

}


/** @param {NS} ns 
 * 	HOW TO CALL "run standard.js -t 5 "foodnstuff" 5"
 * 	==> the second number defines the number of threads running in the hacking
 * **/
export async function main(ns) {

	// PARAM HOST required
	if (!ns.args[0] && typeof (ns.args[0]) != String) {
		ns.tprint(`ERROR: func expects param "hostname" as string`)
		return
	}
	const HOST = ns.args[0];

	// PARAM THREADS optional; default = 1
	const THREADS = (ns.args[1]) ? ns.args[1] : 1;
	ns.tprint(`INFO: @${HOST} with ${THREADS} threads`)

	// Config | grow()
		// currently: percentageGrowth()
	let maxMoney = ns.getServerMaxMoney(HOST) // this seems to be no hard limit - the growth rate will decrease
	let currentMoney = ns.getServerMoneyAvailable(HOST)
	let min_percentage = 0.05; // threshold % before growth() (relates to ServerMaxMoney)
	let aim_percentage = 0.1; // threshold % to stop growth() (relates to ServerMaxMoney)
	let minMoney =  maxMoney * min_percentage; // min threshold to start growth()

	while (true) {
		// grow()
			// by percentageGrowth()
		if(currentMoney < minMoney) {
			ns.print(`ERROR: Low money @${HOST} - reached ${currentMoney.toLocaleString('en-US',{maximumFractionDigits:0})}`);
			ns.print(`INFO: ${HOST} should have ${minMoney.toLocaleString('en-US',{maximumFractionDigits:0})}\$ before continueing.`);
			await percentageGrowth(ns, HOST , aim_percentage);
		}
		// hack()
		let hackSuccess = await tryToHack(ns, HOST, THREADS);
		// weaken()
			// to lowest security level
		if (!hackSuccess) {
			ns.print(`ERROR: hacking ${HOST} failed.\nStarting proces to lower security level`);
			await weakenSecurityLevel(ns, HOST, THREADS);
		}
	}
}