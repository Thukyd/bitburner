/*
nectar-net
Generate IP Addresses
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following string containing only digits, return an array with all possible valid IP address combinations that can be created from the string:

58249192124

Note that an octet cannot begin with a '0' unless the number itself is actually 0. For example, '192.168.010.1' is not a valid IP.

Examples:

25525511135 -> [255.255.11.135, 255.255.111.35]
1938718066 -> [193.87.180.66]
*/

/*
 Possible solution for 58249192124

    58.249.192.124
    582.49.192.124
    582.491.92.124
    582.491.921.24


Conditions
    a) check number of digits => they define how many switches are possible
    b) check 0s which prevents switches 
    c) if it's only 0 it is allowed again


*/