/*
nectar-net
Find Largest Prime Factor
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


A prime factor is a factor that is a prime number. What is the largest prime factor of 705067794?

////////
Explanation https://de.serlo.org/mathe/1779/primfaktorzerlegung

Get the prime factor of 76

=> if it is an even number, start with 2

76: 2 = 38
==>
38: 2 = 19
==>
19 is a prime! ==>

So the result is 2 * 2 * 19

 */

/**
 * Checks if given num is a prime
 * @param num 
 * @returns bool
 */
function isPrime(num:number) {
    for (let i = 2; i * i <= num; i++)
        if (num % i === 0)
          return false; 
    return true;
}

/**
 * Checks the max prime factor of a given num
 * @param num 
 * @returns max prime factor
 */
function primeFactor (num:number) {
    let prime = 1;
    let largestFactor = 2; // 2 is a minimum
    let restNum = num;

    while(restNum > 1) {
        prime++; // original state of let prime = 2
        
        if(!isPrime(prime)) { // skip non-primes
            continue;
        }

        if(restNum % prime === 0 ){ // can you divide the num without a rest? => then it is a factor
            restNum = restNum / prime; // divide the rest through prime
            largestFactor = prime; // you just found a larger factor
            if (restNum === 1) { // there is nothing to split down anymore => you found the largest factor
                return largestFactor
            } else { // you found a prime factor; do the same with the rest again to find the largest
                prime = 1;
            }
            
        }
    }
    //return largestFactor
    return "ERROR";
}

//console.log(isPrime(28))
//console.log(isPrime(19))
//console.log(isPrime(7))

let examplePrimeFactor1 = 76 // = 2 * 2 * 19 = 2^2 * 19
let examplePrimeFactor2 = 21 // = 3 * 7
let taskPrimeFactorA = 705067794
let taskPrimeFactorB = 529099074


//console.log(`The largest prime factor for ${21} is ${primeFactor(21)}`)
//console.log(`The largest prime factor for ${76} is ${primeFactor(76)}`)
console.log(`A: The largest prime factor for ${taskPrimeFactorA} is ${primeFactor(taskPrimeFactorA)}`)
console.log(`B: The largest prime factor for ${taskPrimeFactorB} is ${primeFactor(taskPrimeFactorB)}`)



