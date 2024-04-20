const checkNumberPositivePrime = (number) => {
  if (number < 0) {
    return "Number must be positive";
  }
  if (number < 2) {
    return "Number must be greater than 1";
  }
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return "Number must be prime";
    }
  }
  return "Number is prime";
};

export { checkNumberPositivePrime };
