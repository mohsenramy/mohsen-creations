// Basic Calculator:
// Implement a simple calculator function that can perform basic operations like addition, subtraction, multiplication, and division.
//This challenge tests conditional logic and arithmetic operations.

const SimpleCalculator = () => {
  const validate = (numA: number, numB: number) => {
    if (typeof numA !== 'number' || typeof numB !== 'number') {
      throw new Error('Invalid input. Please provide valid numbers.');
    }
  };
  return {
    add: (numA: number, numB: number) => {
      validate(numA, numB);
      return numA + numB;
    },
    subtract: (numA: number, numB: number) => {
      validate(numA, numB);
      return numA - numB;
    },
    multiply: (numA: number, numB: number) => {
      validate(numA, numB);
      return numA * numB;
    },
    divide: (numA: number, numB: number) => {
      validate(numA, numB);
      if (numB === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return numA / numB;
    },
  };
};

const isPrime = (num: number): boolean => {
  if (!Number.isInteger(num) || num <= 1) {
    return false;
  }
  if (num <= 3) {
    return true;
  }
  if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
};

const toBinary = (num: number): string => {
  // Convert a Decimal Number to Binary:
  // Write a function that converts a decimal number to its binary representation.
  // This covers basic number conversion logic.

  if (!Number.isInteger(num) || num < 0) {
    throw new Error('Invalid input. Please provide a non-negative integer.');
  }
  // return num.toString(2);
  if (num === 0) {
    return '0';
  }
  let binary = '';
  while (num > 0) {
    // binary = (num % 2) + binary;
    // num = Math.floor(num / 2);
    binary = (num & 1) + binary;
    num = num >>> 1;
  }
  return binary;
};
