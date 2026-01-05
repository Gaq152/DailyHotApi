import { config } from "../config.js";

interface CacheData {
  updateTime: string;
  data: unknown;
}

interface CacheEntry {
  value: CacheData;
  expireAt: number;
}

// 简单的内存缓存（兼容 Deno 和 Node）
const memoryCache = new Map<string, CacheEntry>();

// 定期清理过期缓存
const CLEANUP_INTERVAL = 60000; // 1 分钟
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

const startCleanup = () => {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryCache.entries()) {
      if (entry.expireAt < now) {
        memoryCache.delete(key);
        console.log(`⏳ [Cache] Key "${key}" has expired.`);
      }
    }
  }, CLEANUP_INTERVAL);
};

// 启动清理
startCleanup();

/**
 * 从缓存中获取数据
 * @param key 缓存键
 * @returns 缓存数据
 */
export const getCache = async (key: string): Promise<CacheData | undefined> => {
  const entry = memoryCache.get(key);
  if (!entry) return undefined;

  // 检查是否过期
  if (entry.expireAt < Date.now()) {
    memoryCache.delete(key);
    return undefined;
  }

  return entry.value;
};

/**
 * 将数据写入缓存
 * @param key 缓存键
 * @param value 缓存值
 * @param ttl 缓存过期时间（秒）
 * @returns 是否写入成功
 */
export const setCache = async (
  key: string,
  value: CacheData,
  ttl: number = config.CACHE_TTL,
): Promise<boolean> => {
  const expireAt = Date.now() + ttl * 1000;
  memoryCache.set(key, { value, expireAt });
  console.log(`💾 [Cache] ${key} has been cached`);
  return true;
};

/**
 * 从缓存中删除数据
 * @param key 缓存键
 * @returns 是否删除成功
 */
export const delCache = async (key: string): Promise<boolean> => {
  const existed = memoryCache.has(key);
  memoryCache.delete(key);
  if (existed) {
    console.log(`🗑️ [Cache] ${key} has been deleted`);
  }
  return existed;
};
