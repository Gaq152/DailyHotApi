import type { Get, Post } from "../types.ts";
import { Buffer } from "node:buffer";
import { config } from "../config.ts";
import { getCache, setCache, delCache } from "./cache.ts";
import logger from "./logger.ts";

// 返回类型定义
// deno-lint-ignore no-explicit-any
export interface GetResult<T = any> {
  fromCache: boolean;
  updateTime: string;
  data: T;
}

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
// deno-lint-ignore no-explicit-any
export const get = async <T = any>(options: Get): Promise<GetResult<T>> => {
  const {
    url,
    headers,
    params,
    noCache,
    ttl = config.CACHE_TTL,
    originaInfo = false,
    responseType,
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
          data: cachedData.data as T,
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

    // 根据 responseType 或 Content-Type 自动解析响应
    let responseData: unknown;
    if (responseType === "arraybuffer") {
      responseData = await response.arrayBuffer();
    } else if (responseType === "text") {
      responseData = await response.text();
    } else if (responseType === "json") {
      responseData = await response.json();
    } else {
      // 自动检测：根据 Content-Type 判断
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        // 默认返回文本（HTML、XML 等）
        responseData = await response.text();
      }
    }

    // 存储新获取的数据到缓存
    const updateTime = new Date().toISOString();
    const data = originaInfo
      ? { status: response.status, headers: Object.fromEntries(response.headers), data: responseData }
      : responseData;
    await setCache(fullUrl, { data, updateTime }, ttl);
    // 返回数据
    logger.info(`✅ [${response.status}] request was successful`);
    return { fromCache: false, updateTime, data: data as T };
  } catch (error) {
    logger.error("❌ [ERROR] request failed");
    throw error;
  }
};

// POST
// deno-lint-ignore no-explicit-any
export const post = async <T = any>(options: Post): Promise<GetResult<T>> => {
  const { url, headers, body, noCache, ttl = config.CACHE_TTL, originaInfo = false } = options;
  logger.info(`🌐 [POST] ${url}`);
  try {
    // 检查缓存
    if (noCache) await delCache(url);
    else {
      const cachedData = await getCache(url);
      if (cachedData) {
        logger.info("💾 [CACHE] The request is cached");
        return { fromCache: true, updateTime: cachedData.updateTime, data: cachedData.data as T };
      }
    }
    // 缓存不存在时请求接口
    const requestHeaders: Record<string, string> = { ...(headers as Record<string, string>) };
    let requestBody: BodyInit;

    if (typeof body === "object" && !(body instanceof Buffer)) {
      const contentType = requestHeaders["Content-Type"] || "";
      if (contentType.includes("application/x-www-form-urlencoded")) {
        // 表单格式
        requestBody = new URLSearchParams(body as Record<string, string>).toString();
      } else {
        // JSON 格式
        requestBody = JSON.stringify(body);
        if (!requestHeaders["Content-Type"]) {
          requestHeaders["Content-Type"] = "application/json";
        }
      }
    } else {
      requestBody = body as BodyInit;
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
    return { fromCache: false, updateTime, data: data as T };
  } catch (error) {
    logger.error("❌ [ERROR] request failed");
    throw error;
  }
};
