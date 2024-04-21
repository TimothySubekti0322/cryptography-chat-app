import primeNumbers from "./primeNumbers";

const checkNumberPositivePrime = (number) => {
  if (number < 0n) {
    return "Number must be positive";
  }
  if (number <= 10000n) {
    return "Number must be greater than 10000";
  } else if (number >= 100000000n) {
    return "Number must be smaller than 100000000";
  }
  
  let i = 0;
  // const sqrt = require('bigint-isqrt');
  // const sqrtNum = sqrt(num);

  // Check from 2 to sqrt of num
  while (BigInt(primeNumbers[i])**2n <= number) {
      if (num % BigInt(primeNumbers[i]) === 0n){
          return "Number must be prime";}
      i++;
  }
      
  return "Number is prime";
};

export { checkNumberPositivePrime };
