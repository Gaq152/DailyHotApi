import type { Get, Post } from "../types.d.ts";
import { config } from "../config.ts";
import { getCache, setCache, delCache } from "./cache.ts";
import logger from "./logger.ts";

// 构建带参数的 URL
const buildUrl = (url: string, params?: Record<string, string | number>): string => {
  if (!params || Object.keys(params).length === 0) return url;
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value));
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${searchParams.toString()}`;
};

// 带超时的 fetch
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

// GET
export const get = async (options: Get) => {
  const {
    url,
    headers,
    params,
    noCache,
    ttl = config.CACHE_TTL,
    originaInfo = false,
    responseType = "json",
  } = options;
  const fullUrl = buildUrl(url, params);
  logger.info(`🌐 [GET] ${fullUrl}`);
  try {
    // 检查缓存
    if (noCache) await delCache(fullUrl);
    else {
      const cachedData = await getCache(fullUrl);
      if (cachedData) {
        logger.info("💾 [CACHE] The request is cached");
        return {
          fromCache: true,
          updateTime: cachedData.updateTime,
          data: cachedData.data,
        };
      }
    }
    // 缓存不存在时请求接口
    const response = await fetchWithTimeout(
      fullUrl,
      {
        method: "GET",
        headers: headers as HeadersInit,
      },
      config.REQUEST_TIMEOUT
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 根据 responseType 解析响应
    let responseData: unknown;
    if (responseType === "arraybuffer") {
      responseData = await response.arrayBuffer();
    } else if (responseType === "text") {
      responseData = await response.text();
    } else {
      // 默认 json
      responseData = await response.json();
    }

    // 存储新获取的数据到缓存
    const updateTime = new Date().toISOString();
    const data = originaInfo
      ? { status: response.status, headers: Object.fromEntries(response.headers), data: responseData }
      : responseData;
    await setCache(fullUrl, { data, updateTime }, ttl);
    // 返回数据
    logger.info(`✅ [${response.status}] request was successful`);
    return { fromCache: false, updateTime, data };
  } catch (error) {
    logger.error("❌ [ERROR] request failed");
    throw error;
  }
};

// POST
export const post = async (options: Post) => {
  const { url, headers, body, noCache, ttl = config.CACHE_TTL, originaInfo = false } = options;
  logger.info(`🌐 [POST] ${url}`);
  try {
    // 检查缓存
    if (noCache) await delCache(url);
    else {
      const cachedData = await getCache(url);
      if (cachedData) {
        logger.info("💾 [CACHE] The request is cached");
        return { fromCache: true, updateTime: cachedData.updateTime, data: cachedData.data };
      }
    }
    // 缓存不存在时请求接口
    const requestBody = typeof body === "object" && !(body instanceof Buffer)
      ? JSON.stringify(body)
      : body;

    const requestHeaders: Record<string, string> = { ...(headers as Record<string, string>) };
    if (typeof body === "object" && !(body instanceof Buffer) && !requestHeaders["Content-Type"]) {
      requestHeaders["Content-Type"] = "application/json";
    }

    const response = await fetchWithTimeout(
      url,
      {
        method: "POST",
        headers: requestHeaders,
        body: requestBody as BodyInit,
      },
      config.REQUEST_TIMEOUT
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    // 存储新获取的数据到缓存
    const updateTime = new Date().toISOString();
    const data = originaInfo
      ? { status: response.status, headers: Object.fromEntries(response.headers), data: responseData }
      : responseData;
    if (!noCache) {
      await setCache(url, { data, updateTime }, ttl);
    }
    // 返回数据
    logger.info(`✅ [${response.status}] request was successful`);
    return { fromCache: false, updateTime, data };
  } catch (error) {
    logger.error("❌ [ERROR] request failed");
    throw error;
  }
};
