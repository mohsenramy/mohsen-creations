// Reverse a String:
// Create a function to take a string as input and return the string reversed.
const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

const reverseStringOptimized = (str: string): string => {
  // Reduced memory usage, especially for large strings
  // Potentially faster execution for very long strings
  // Demonstrates a more algorithmic approach, which can be valuable in certain coding contexts

  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    const temp = chars[left];

    chars[left] = chars[right] ?? '';
    chars[right] = temp ?? '';
    left++;
    right--;
  }

  return chars.join('');
};

// Check if a String is a Palindrome:
// Develop a function to check whether a given string reads the same backward as forward.
// Palindrome checks are great for understanding string manipulation and condition checking.
const isPalindrome = (str: string): boolean => {
  if (typeof str !== 'string' || str.length === 0) {
    return false;
  }

  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (let i = 0, j = cleanStr.length - 1; i < j; i++, j--) {
    if (cleanStr[i] !== cleanStr[j]) {
      return false;
    }
  }

  return true;
};

// Check if Two Strings are Anagrams:
// Write a function that determines if two strings are anagrams (contain the same characters in a different order).
// This tests the ability to manipulate and compare strings.

const isAnagram = (str1: string, str2: string): boolean => {
  if (
    str1.length === 0 ||
    str2.length === 0 ||
    typeof str1 !== 'string' ||
    typeof str2 !== 'string'
  ) {
    return false;
  }
  //simple solution ....
  // return (
  //   str1.toLowerCase().split('').sort().join('') ===
  //   str2.toLowerCase().split('').sort().join('')
  // );
  const str1Clean = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const str2Clean = str2.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (str1.length !== str2.length) {
    return false;
  }
  const charsMap = new Map<string, number>();
  for (let i = 0; i < str1.length; i++) {
    charsMap.set(str1Clean[i]!, (charsMap.get(str1Clean[i]!) ?? 0) + 1);
    charsMap.set(str2Clean[i]!, (charsMap.get(str2Clean[i]!) ?? 0) - 1);
  }

  for (let c of charsMap.values()) {
    if (c !== 0) {
      return false;
    }
  }
  return true;
};

// Find the Longest Common Prefix:
// Create a function to find the longest common prefix among an array of strings.
// This is a good exercise for string manipulation and comparison.

const longestCommonPrefix = (strs: string[]): string => {
  if (strs.length === 0) {
    return '';
  }
  if (strs.some((str) => str.length === 0 || typeof str !== 'string')) {
    return '';
  }
  //get shorted word
  let commonPrefix = strs.reduce(
    (shortest, current) =>
      current.length < shortest.length ? current : shortest,
    strs[0]!
  );
  // let lcp = strs[0];
  // for (let i = 1; i < strs.length; i++) {
  //   if (strs[i]!.length < lcp!.length) {
  //     lcp = strs[i]!;
  //   }
  // }

  // while (lcp!.length > 0) {
  for (let i = commonPrefix.length; i > 0; i--) {
    const currPrefix = commonPrefix.slice(0, i);
    if (strs.every((str) => str.startsWith(currPrefix))) {
      return currPrefix;
    }
  }
  return '';
};

const firstNonRepetitive = (str: string): string => {
  // Find the First Non-Repeating Character:
  // Develop a function to find the first non-repeating character in a string.
  // This tests the ability to use data structures to track character counts.
  if (typeof str !== 'string' || str.length === 0) {
    throw new Error('Invalid input');
  }
  const strClean = str.toLowerCase();
  const chars = new Map<string, number>();
  for (let char of strClean) {
    chars.set(char, (chars.get(char) ?? 0) + 1);
  }

  for (let char of strClean) {
    if (chars.get(char) === 1) {
      return char;
    }
  }
  return '';
};

