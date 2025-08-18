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
