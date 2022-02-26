/*
harakiri-sushi

Merge Overlapping Intervals
You are attempting to solve a Coding Contract. You have 15 tries remaining, after which the contract will self-destruct.


Given the following array of array of numbers representing a list of intervals, merge all overlapping intervals.

[[17,23],[2,7],[3,11],[10,14],[24,25],[18,19],[18,27],[5,10],[9,17],[15,22],[12,13],[22,26],[6,15],[2,4]]

Example:

[[1, 3], [8, 10], [2, 6], [10, 16]]

would merge into [[1, 6], [8, 16]].

The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.

*/

/**
 * Takes an array of array of numbers and merges overlapping intervals
 * @param matrix 
 * @returns overlapping-free array of array numbers
 */
function mergeOverlappingIntervals (matrix:number[][]) {
    // a) sort inner array by 0 of index
    matrix.sort((a,b) => a[0] - b[0])

    // b) check each inner array if merge or push is needed
    const mergedArr = [matrix[0]]; // add first array [1, 3]
    for (let innerArray of matrix ) {
        // take the second element of arrayA
        let endOfA = mergedArr[mergedArr.length - 1][1]
        // take the first element of next arrayB
        let beginOfB = innerArray[0]
        // take the second element of next arrayB
        let endOfB = innerArray[1]

        //check if end of arrayA is equal or bigger than arrayB 
            // if yes, they are overlapping and can be merged
        if (endOfA >= beginOfB) {
            // check for the biggest number in these two arrays
                // necesary for case  arrayA [1, 15], arrayB [2, 5] 
                // => mergedArray [arrayA[0], arrayA[1] || arrayB[1]]
            mergedArr[mergedArr.length - 1][1] =  Math.max(endOfA, endOfB);
        } else { // else add the inner array to the result array
            mergedArr.push(innerArray)
        }
    }
    return mergedArr
} 



let testArray = [[1, 3], [8, 10], [2, 6], [10, 16]];

console.log(mergeOverlappingIntervals(testArray))

let taskArray = [[17,23],[2,7],[3,11],[10,14],[24,25],[18,19],[18,27],[5,10],[9,17],[15,22],[12,13],[22,26],[6,15],[2,4]];
let taskArray2 = [[17,23],[4,8],[9,13],[18,25],[17,20],[15,17],[15,22],[25,33],[11,13],[16,20],[25,27]]
let taskArray3 = [[1,7],[13,22],[1,6],[16,19],[6,11],[17,20],[21,28],[15,16],[8,9],[8,13],[1,3],[14,18],[18,24],[25,29],[17,23],[3,6],[25,31]]

console.log(mergeOverlappingIntervals(taskArray))
console.log(mergeOverlappingIntervals(taskArray2))
console.log(mergeOverlappingIntervals(taskArray3))
