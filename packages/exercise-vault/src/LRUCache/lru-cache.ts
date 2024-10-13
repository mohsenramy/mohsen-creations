/**
 * A Least Recently Used (LRU) cache with Time-to-Live (TTL) support. Items are kept in the cache until they either
 * reach their TTL or the cache reaches its size and/or item limit. When the limit is exceeded, the cache evicts the
 * item that was least recently accessed (based on the timestamp of access). Items are also automatically evicted if they
 * are expired, as determined by the TTL.
 * An item is considered accessed, and its last accessed timestamp is updated, whenever `has`, `get`, or `set` is called with its key.
 *
 * Implement the LRU cache provider here and use the lru-cache.test.ts to check your implementation.
 * You're encouraged to add additional functions that make working with the cache easier for consumers.
 */

type LRUCacheProviderOptions = {
  ttl: number; // Time to live in milliseconds
  itemLimit: number;
};
type LRUCacheProvider<T> = {
  has: (key: string) => boolean;
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
};

// TODO: Implement LRU cache provider
export function createLRUCacheProvider<T>({
  ttl,
  itemLimit,
}: LRUCacheProviderOptions): LRUCacheProvider<T> {
  type CacheItem = { value: T; timestamp: number };
  const cache = new Map<string, CacheItem>();

  const resetTimeStamp = (key: string, item: CacheItem) => {
    cache.delete(key);
    cache.set(key, { value: item.value, timestamp: Date.now() });
    // console.log(`-> [RESET_TIME_STAMP] ${key} ~ item: `, cache.get(key))
  };
  const getItem = (key: string) => {
    const item = cache.get(key);
    if (item) {
      if (Date.now() - item.timestamp > ttl) {
        // console.log(`-> [getItem] -> DELETE ITEM`, key)
        cache.delete(key);
        return undefined;
      }
      // console.log(`-> [getItem] -> [key: ${key}] BEFORE RETURN`, cache)
      return item;
    }
    return undefined;
  };

  const deleteOldestItem = () => {
    const oldestKey = cache.keys().next().value;
    if (oldestKey !== undefined) {
      cache.delete(oldestKey);
    }
  };
  return {
    has: (key: string) => {
      // console.log(`-> [HAS] -------> ${key} `)
      const item = getItem(key);
      // console.log(`-> [HAS] -> Cache:`, cache)
      // console.log(`-> [HAS] -> item:${item} => has:${key}`, cache.has(key))
      if (item) {
        resetTimeStamp(key, { value: item.value, timestamp: Date.now() });
        // console.log(`-> [HAS] -> Cache:`, cache)
        return true;
      }

      return false;
    },
    get: (key: string) => {
      // console.log(`-> [GET] -------> ${key}`)
      const item = getItem(key);
      // console.log(`-> [GET] -> cache.GET[${key}]`, item)

      if (item) {
        resetTimeStamp(key, { value: item.value, timestamp: Date.now() });
        return item.value;
      }
      return undefined;
    },
    set: (key: string, value: T) => {
      // console.log(`-> [SET] -------> ${key} : ${value}`)
      // console.log(`-> [SET] -> cache.has(${key})):`, cache.has(key))
      if (cache.size >= itemLimit && !cache.has(key)) {
        deleteOldestItem();
      }
      if (cache.has(key)) {
        cache.delete(key);
      }
      // console.log(`-> [SET] -> cache.SET[${key}:${value}]`, cache)
      cache.set(key, { value, timestamp: Date.now() });
      // console.log(`-> [SET] -> cache.SET[${key}:${value}]`, cache)
      // console.log('---------------------------------------------')
    },
  };
}
// const sleep = (timeoutInMS: number) => new Promise((resolve) => setTimeout(resolve, timeoutInMS))

// const lruCache = createLRUCacheProvider<string>({ itemLimit: 1, ttl: 500 })
// lruCache.set('foo', 'bar')
// await sleep(600)
// console.log(lruCache.get('foo'))
