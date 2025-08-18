// Find the Largest Number in an Array:
//Write a function that takes an array of numbers and returns the largest number.
const largestNumberInArrayStandard = (arr: number[]): number => {
  const max = Math.max(...arr);
  return max;
};

/**
 * Finds the largest number in an array of numbers.
 * @param {number[]} arr - The input array of numbers.
 * @returns {number} The largest number in the array.
 * @throws {Error} If the array is empty or contains non-number elements.
 */
const largestNumberInArray = (arr: number[]): number => {
  // Input validation: Add a check to ensure the input array is not empty. This would prevent potential errors when calling Math.max() on an empty array.
  // Type narrowing: Consider using a type guard to ensure the array contains only numbers. This can help catch potential type-related issues early.
  // Performance optimization: For very large arrays, consider using a loop-based approach instead of the spread operator, which could be more memory-efficient.
  // Error handling: Implement error handling to manage potential exceptions, such as when non-number elements are present in the array.
  // Documentation: Add JSDoc comments to describe the function's purpose, parameters, and return value, enhancing code readability and maintainability.

  if (arr.length === 0) {
    throw new Error('Array is empty');
  }

  if (!arr.every((num) => typeof num === 'number')) {
    throw new Error('Array contains non-number elements');
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! > max!) {
      max = arr[i];
    }
  }
  return max!;
};

// Merge Two Sorted Arrays:
// Write a function that takes two sorted arrays and merges them into one sorted array.
// This tests the ability to handle multiple arrays and maintain order.
const mergeSortedArrays = (arr1: number[], arr2: number[]): number[] => {
  // const mergedArray = [...arr1, ...arr2];
  // return mergedArray.sort((a, b) => a - b);
  if (arr1.length === 0 || arr2.length === 0) {
    throw new Error('Input arrays must not be empty');
  }

  if (
    !arr1.every((num) => typeof num === 'number') ||
    !arr2.every((num) => typeof num === 'number')
  ) {
    throw new Error('Arrays must contain only numbers');
  }

  const result: number[] = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i]! <= arr2[j]!) {
      result.push(arr1[i]!);
      i++;
    } else {
      result.push(arr2[j]!);
      j++;
    }
  }

  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
};

// Find the Kth Largest Element in an Unsorted Array:
// Develop a function to find the kth largest element in an unsorted array.
// This requires sorting and array indexing skills.

const largestKth = (arr: number[], k: number): number => {
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    arr.some((x) => typeof x !== 'number')
  ) {
    throw new Error('Invalid input. Please provide a valid array.');
  }
  if (!Number.isInteger(k) || k < 0 || k > arr.length) {
    throw new Error(
      'Invalid input. Please provide a valid positive integer for k.'
    );
  }
  const sortedArr = [...arr].sort((a, b) => b - a);
  return sortedArr[k - 1]!;
};

const binarySearch = (arr: number[], target: number): number => {
  // Binary Search:
  // Implement a binary search function that takes a sorted array and a target value,
  // and returns the index of the target value.
  // This challenges understanding of search algorithms and efficient searching.
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    arr.some((x) => typeof x !== 'number')
  ) {
    throw new Error('Invalid input. Please provide a valid array.');
  }

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // const mid = left + Math.floor((right - left) / 2);
    // const mid = Math.floor((right + left) / 2);
    const mid = (left + right) >>> 1; // Using bitwise shift for performance
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid]! < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};
