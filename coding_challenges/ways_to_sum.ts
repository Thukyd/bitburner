/**
 *      ROTHMAN UNIVERSITY
 Total Ways to Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


It is possible write four as a sum in exactly four different ways:

    3 + 1
    2 + 2
    2 + 1 + 1
    1 + 1 + 1 + 1

How many different ways can the number 80 be written as a sum of at least two positive integers?

 */
/////////// Thoughts
/*

    1. try to find the solution for 4
    2. then adapet it to 80
    3. 

    Example: 8
    1 + 1 + 1 + 1 + 1 + 1 + 1 + 1

    2 + 1 + 1 + 1 + 1 + 1 + 1
    2 + 2 + 1 + 1 + 1 + 1

    3 + 1 + 1 + 1 + 1 + 1
    3 + 2 + 1 + 1 + 1
    3 + 2 + 2 + 1
    3 + 3 + 1 + 1
    3 + 3 + 2

    4 + 1 + 1 + 1 + 1
    4 + 2 + 1 + 1
    4 + 2 + 1 + 1
    4 + 2 + 2
    4 + 3 + 1
    4 + 4

    5 + 1 + 1 + 1
    5 + 2 + 1
    5 + 3

    6 + 1 + 1
    6 + 2

    7 + 1

/////////
    Take a closer look!
    
    3 + 1 + 1 + 1 + 1 + 1
    3 + 2 + 1 + 1 + 1
    3 + 2 + 2 + 1
    3 + 3 + 1 + 1
    3 + 3 + 2

    You can always sum up from left to right; 
    The next right element can't ever be higher than the left element
    Then you should sum up the next right element
    If there is no right elements more to sum up you have to sum up the left edge element again starting with all +1 to the right
*/





const example = 4; // soution => 4 ways
const myExample = 8;
const task = 80;



/**
 * Converts an int into an array of 1s
 * e.g. 
 * num = 4 
 * return [1,1,1,1]
 * @param num 
 * @returns [number]
 */
function arrayOfOnes (num:number) {
    let arr = [];
    for (let i = num; i > 0; i--) {
        arr.push(1);
    }
    return arr
} 

/**
 * //TODO
 * @param num 
 */
function waysToSum (num:number) {
    let arr = arrayOfOnes(num);
    let countWays = 0;
    console.log(arr.length)

    // TODO

    for (let i = 0; i < arr.length; i++) {
        // sum up always from left to right
        // second loop which stops...
            // ...if the sum  of the two right elements is greater than the left element
                // 3 + 3 + 2  => has got to stop
                // 3 + 2 + 1  => still works
            // otherwise
                // ...
    

    }

} 



waysToSum(8)