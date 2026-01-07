import Redis from "ioredis";

export const TTL = 60 * 60 * 24; // 24h

class MemoryCache {
  private store = new Map<string, { value: string; expires: number }>();

  async get(key: string) {
    const item = this.store.get(key);
    if (!item || Date.now() > item.expires) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, _mode: string, ttl: number) {
    this.store.set(key, {
      value,
      expires: Date.now() + ttl * 1000,
    });
  }
}

let cacheInstance: any = new MemoryCache();

const redisUrl = process.env.UPSTASH_REDIS_URL;

if (redisUrl?.startsWith("redis")) {
  try {
    const redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 0,
      enableOfflineQueue: false,
      lazyConnect: true,
      connectTimeout: 1000,
    });

    redis.on("error", (err) => {
      console.warn("[CACHE] Redis error, using memory cache:", err.message);
    });

    await redis.connect();

    console.log("[CACHE] Redis connected");
    cacheInstance = redis;
  } catch (err: any) {
    console.warn("[CACHE] Redis unavailable, fallback to memory:", err.message);
  }
} else {
  console.log("[CACHE] Redis not configured, using memory cache");
}

export const cache = {
  get: (key: string) => cacheInstance.get(key),
  set: (key: string, value: string, mode = "EX", ttl = TTL) =>
    cacheInstance.set(key, value, mode, ttl),
};
