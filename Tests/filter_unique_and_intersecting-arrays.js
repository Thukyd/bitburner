/////////////
/** Task:
 * Given a list of servers you have already visited and a list of servers which directly connected to the current servers (neigbours).
 * 
 * Example: 
 *      const visitedServers = ["server1", "server2", "server3", "server4", "server5"];
 *      const connectedServer = ["server2", "server3", "server6", "server7", "server8"];
 * 
 * a) Check: Which servers are "new"?
 *      - expected: ["server6", "server7", "server8"] ;
 *      => abstract: filter out shared items of visited servers (arr2) from connected servers list (arr1)
 *      
 * b) Check: Which servers are "known"?
 *      - expected: ["server1", "server2", "server3", "server4", "server5", "server6", "server7", "server8"]
 *      => abstract: filter out intersecting items of two arrays
 *  */



/////////////////////////////
/// Solution a)

/** filterIntersectingItems()
 * -
 * - takes checkArr and removes items which intersect with knownArr
 * @param {[string]} checkArr
 * @param {[string]} knownArr
 * @returns {[string]} new items in checkArr
 */
function filterIntersectingItems(checkArr,knownArr) {
    /** 
     * indexOff searches for the first occurance of a value
     * if the value is not found it returns with -1 
     * therfore the expression returns all unique values
     *  */ 
    let newItemArr = checkArr.filter(item => knownArr.indexOf(item) == -1 )
    return newItemArr

    // other solution
    let newitemArr2 = [...new Set(checkArr.filter(item => !knownArr.includes(item)))]
}

/////////////////////////////
/// Solution b)


/** mergeWithoutDuplicates()
 * -
 * - merges two arrays into new array of unique values 
 * @param {[string]} arr1
 * @param {[string]} arr2
 * @returns {[string]}
 */
function mergeWithoutDuplicates(arr1,arr2) {
    // uses spread to merge
    let mergeArr = [...arr1, ...arr2] 
    // uses set to filter down duplicates
    // uses spread to create an array of set items
    let setOfItems = [...new Set(mergeArr)]; 
    return removeDuplicates
}

/////////////////////////////
/// TEST

const visitedServers = ["server1", "server2", "server3", "server4", "server5"];
const connectedServer = ["server2", "server3", "server6", "server7", "server8"];

// a) 
console.log("A)")
console.log(filterIntersectingItems(connectedServer, visitedServers))
// expected: ["server6", "server7", "server8"] ;

// b) 
console.log("B")
console.log(mergeWithoutDuplicates(connectedServer,visitedServers))
// expected: ["server1", "server2", "server3", "server4", "server5", "server6", "server7", "server8"]
// => real result is not sorted!
