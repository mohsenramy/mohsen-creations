import { describe, it, expect, beforeEach } from 'vitest';
import { LRUCacheWithLinkedList } from './LRUCacheWithLinkedList';

describe('LRUCache', () => {
  let cache: LRUCacheWithLinkedList;

  beforeEach(() => {
    cache = new LRUCacheWithLinkedList(2); // Initialize cache with capacity of 2
  });

  describe('get', () => {
    it('should return -1 for a non-existent key', () => {
      expect(cache.get(1)).toBe(-1);
    });

    it('should return the value for an existing key and update usage', () => {
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
    });

    it('should return -1 after eviction of the least recently used key', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3); // Evicts key 1
      expect(cache.get(1)).toBe(-1);
    });
  });

  describe('put', () => {
    it('should insert a new key-value pair', () => {
      cache.put(1, 1);
      expect(cache.get(1)).toBe(1);
    });

    it('should update the value of an existing key', () => {
      cache.put(1, 1);
      cache.put(1, 2);
      expect(cache.get(1)).toBe(2);
    });

    it('should evict the least recently used key when capacity is exceeded', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3); // Evicts key 1
      expect(cache.get(1)).toBe(-1);
      expect(cache.get(2)).toBe(2);
    });
  });

  describe('has', () => {
    it('should return false for a non-existent key', () => {
      expect(cache.has(1)).toBe(false);
    });

    it('should return true for an existing key', () => {
      cache.put(1, 1);
      expect(cache.has(1)).toBe(true);
    });

    it('should return false after eviction of the least recently used key', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.put(3, 3); // Evicts key 1
      expect(cache.has(1)).toBe(false);
      expect(cache.has(2)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle a cache of size 1', () => {
      const smallCache = new LRUCacheWithLinkedList(1);
      smallCache.put(1, 1);
      expect(smallCache.get(1)).toBe(1);
      smallCache.put(2, 2); // Evicts key 1
      expect(smallCache.get(1)).toBe(-1);
      expect(smallCache.get(2)).toBe(2);
    });

    it('should handle a cache of size 3', () => {
      const mediumCache = new LRUCacheWithLinkedList(3);
      mediumCache.put(1, 1);
      mediumCache.put(2, 2);
      mediumCache.put(3, 3);
      expect(mediumCache.get(1)).toBe(1);
      mediumCache.put(4, 4); // Evicts key 2
      expect(mediumCache.get(2)).toBe(-1);
      expect(mediumCache.get(3)).toBe(3);
      expect(mediumCache.get(4)).toBe(4);
    });

    it('should maintain the order of usage correctly', () => {
      const mediumCache = new LRUCacheWithLinkedList(3);
      mediumCache.put(1, 1);
      mediumCache.put(2, 2);
      mediumCache.put(3, 3);
      mediumCache.get(1); // Access key 1
      mediumCache.put(4, 4); // Evicts key 2
      expect(mediumCache.get(2)).toBe(-1);
      expect(mediumCache.get(3)).toBe(3);
      expect(mediumCache.get(4)).toBe(4);
    });

    it('should handle multiple accesses and evictions correctly', () => {
      const mediumCache = new LRUCacheWithLinkedList(3);
      mediumCache.put(1, 1);
      mediumCache.put(2, 2);
      mediumCache.put(3, 3);
      mediumCache.put(4, 4); // Evicts key 1
      expect(mediumCache.get(1)).toBe(-1);
      mediumCache.get(2); // Access key 2
      mediumCache.put(5, 5); // Evicts key 3
      expect(mediumCache.get(3)).toBe(-1);
      expect(mediumCache.get(2)).toBe(2);
      expect(mediumCache.get(4)).toBe(4);
      expect(mediumCache.get(5)).toBe(5);
    });
  });

  describe('Integration Tests', () => {
    it('should maintain the order of usage correctly', () => {
      cache.put(1, 1);
      cache.put(2, 2);
      cache.get(1); // Access key 1
      cache.put(3, 3); // Evicts key 2
      expect(cache.get(2)).toBe(-1);
    });
  });
});
