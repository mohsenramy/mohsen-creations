/**
 * LRU Cache Implementation
 *
 * This file contains an implementation of a Least Recently Used (LRU) Cache.
 * The cache will store key-value pairs and have the capacity to evict the least recently used item
 * when the cache exceeds its defined capacity.
 *
 * The LRU Cache is implemented using a hash map for O(1) access time
 * and a doubly linked list to keep track of the usage order.
 *
 * Learn more:
 * - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)
 * - https://medium.com/swlh/implementing-lru-cache-in-javascript-8d6d8166ff70
 */

class Node {
  key: number;
  value: number;
  prev: Node | null;
  next: Node | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCacheWithLinkedList {
  private capacity: number;
  private map: Map<number, Node>;
  private head: Node;
  private tail: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(0, 0); // Dummy head
    this.tail = new Node(0, 0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    // Retrieve the value from the cache and update usage order
    // If the key does not exist, return -1
    const node = this.map.has(key) ? this.map.get(key) : null;
    console.log(`🔔 -> file: lruCache.ts:49 -> LRUCache -> get -> node:`, node);
    if (node) {
      this.moveToHead(node);
      return node.value;
    }
    return -1;
  }

  put(key: number, value: number): void {
    // Insert or update the value in the cache
    // If the key already exists, update it and move to the front
    // If the cache exceeds capacity, remove the least recently used item
    const nodeExist = this.map.has(key);
    if (this.map.size === this.capacity && !nodeExist) {
      this.removeTail();
    }

    let node: Node;
    if (nodeExist) {
      node = this.map.get(key)!;
      node.value = value;
      this.moveToHead(node);
    } else {
      node = new Node(key, value);
      this.addNode(node);
    }
  }
  has(key: number): boolean {
    // Check if the cache contains the specified key
    const node = this.map.has(key) ? this.map.get(key) : null;
    if (node) {
      this.moveToHead(node);
      return true;
    }
    return false;
  }

  private printList = (head: Node) => {
    let current: Node | null = head;
    while (current) {
      console.log(
        `-----\n[${current.key}]: ${current.value}\n [${current.prev?.key}]<- ->[${current.next?.key}]\n-----`
      );
      current = current.next;
    }
  };
  private addNode(node: Node): void {
    // Add a new node right after the head (most recently used)
    // this.printList(this.head);
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
    this.printList(this.head);
    this.map.set(node.key, node);
    // console.log(
    //   `🔔 -> file: lruCache.ts:102 -> LRUCache -> addNode ->  this.map:`,
    //   this.map
    // );
  }

  private removeNode(node: Node): void {
    // Remove an existing node from the linked list
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    this.map.delete(node.key);
    console.log(
      `🔔 -> file: lruCache.ts:103 -> LRUCache -> removeNode -> map:`,
      this.map
    );
  }

  private moveToHead(node: Node): void {
    // Move the specified node to the head (most recently used)
    this.removeNode(node);
    this.addNode(node);
  }

  private removeTail(): Node {
    // Remove the tail node (least recently used) and return it
    if (this.tail.prev === this.head) {
      return this.head;
    }
    const node = this.tail.prev;
    if (node) {
      this.removeNode(node);
      return node;
    }
    return this.head;
  }
}
