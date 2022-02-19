//import {sayHi, sayBye} from './source.js';

const { sayHi, sayBye } = require('./export tests/source.js');

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!