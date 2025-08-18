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

// Reverse a Linked List:
// Implement a function that takes the head of a linked list and reverses it.
// This challenge covers understanding of linked list structures and pointer manipulation.

type Node = {
  value: number;
  next: Node | null;
  prev: Node | null;
};

const reverseLinkList = (head: Node): Node | null => {
  if (!head || !head.next) {
    return head;
  }
  let current: Node | null = head;
  let nextNode: Node | null = null;
  let prev: Node | null = null;

  while (current) {
    nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
};

const mergeTwoLists = (list1: Node | null, list2: Node | null): Node | null => {
  // Merge Two Sorted Linked Lists:
  // Create a function that merges two sorted linked lists into one sorted linked list.
  // This involves manipulating linked list nodes to maintain order.

  if (!list1) {
    return list2;
  }
  if (!list2) {
    return list1;
  }

  if (list1.value < list2.value) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

const hasCycle = (head: Node): boolean => {
  // Detect a Cycle in a Linked List:
  // Implement a function that detects whether a linked list contains a cycle (a node pointing back to a previous node).
  // This challenge requires understanding of linked lists and loop detection algorithms.
  if (!head || !head.next) {
    return false;
  }
  let slow: Node | null = head;
  let fast: Node | null = head.next;
  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow?.next || null;
    fast = fast.next.next;
  }
  return false;
};

type TNode = {
  value: number;
  left: TNode | null;
  right: TNode | null;
};
const maxDepth = (root: TNode | null): number => {
  // Tree Challenge:
  // Given a binary tree, find its maximum depth.
  // The depth of a binary tree is the number of nodes along the longest path from the root node down to the farthest leaf node.

  if (!root) {
    return 0;
  }
  // let depthLeft = 0;
  // let depthRight = 0;
  // depthLeft = maxDepth(root.left);
  // depthRight = maxDepth(root.right);
  // return Math.max(depthLeft, depthRight) + 1;
  const { left, right } = root;
  return Math.max(maxDepth(left), maxDepth(right)) + 1;
};

// GRAPH
class Graph {
  adjacencyList: Map<string, string[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: string, vertex2: string) {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1); // For undirected graphs
  }

  // ... other methods like removeVertex, removeEdge, etc.
}

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');
graph.addEdge('E', 'B'); // Create a cycle

interface Graph {
  [key: string]: string[];
}

function detectCycle(graph: Graph): string[] | null {
  const visited = new Set<string>();

  function dfs(vertex: string, parent: string | null): boolean {
    if (visited.has(vertex)) {
      return parent !== vertex; // Cycle found if parent is not the same as the current vertex
    }

    visited.add(vertex);

    for (const neighbor of graph[vertex]) {
      if (dfs(neighbor, vertex)) {
        return true; // Cycle found
      }
    }

    return false; // No cycle found
  }

  for (const vertex in graph) {
    if (!visited.has(vertex) && dfs(vertex, null)) {
      return findCycle(graph, vertex, visited);
    }
  }

  return null; // No cycle found
}

function findCycle(
  graph: Graph,
  start: string,
  visited: Set<string>
): string[] {
  const cycle: string[] = [];
  let current = start;

  while (!cycle.includes(current)) {
    cycle.push(current);
    current = graph[current][0]; // Assuming the first neighbor is part of the cycle
  }

  const cycleIndex = cycle.indexOf(current);
  return cycle.slice(cycleIndex);
}
