/// <reference path='utility-functions.ts' />

import util = Utility.Fees;

console.log(Utility.maxBooksAllowed(16));
console.log(Utility.maxBooksAllowed(11));

console.log(util.calculateLateFee(3));
