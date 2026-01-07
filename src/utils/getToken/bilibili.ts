// 获取 Bilibili Web 端 WBI 签名鉴权
import { getCache, setCache } from "../cache.ts";
import { get } from "../getData.ts";
import md5 from "md5";

type EncodedKeys = {
  img_key: string;
  sub_key: string;
};

interface WbiParams {
  [key: string]: string | number;
}

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28,
  14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54,
  21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
];

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig: string): string =>
  mixinKeyEncTab
    .map((n) => orig[n])
    .join("")
    .slice(0, 32);

// 为请求参数进行 wbi 签名
const encWbi = (params: WbiParams, img_key: string, sub_key: string): string => {
  const mixin_key = getMixinKey(img_key + sub_key);
  const curr_time = Math.round(Date.now() / 1000);
  const chr_filter = /[!'()*]/g;
  // 添加 wts 字段
  Object.assign(params, { wts: curr_time });
  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chr_filter, "");
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
  // 计算 w_rid
  const wbi_sign = md5(query + mixin_key);
  return query + "&w_rid=" + wbi_sign;
};

// 获取最新的 img_key 和 sub_key
const getWbiKeys = async (): Promise<EncodedKeys> => {
  const result = await get({
    url: "https://api.bilibili.com/x/web-interface/nav",
    headers: {
      // SESSDATA 字段
      Cookie: "SESSDATA=xxxxxx",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Referer: "https://www.bilibili.com/",
    },
  });
  const img_url: string = result.data.wbi_img?.img_url ?? "";
  const sub_url: string = result.data.wbi_img?.sub_url ?? "";
  return {
    img_key: img_url.slice(img_url.lastIndexOf("/") + 1, img_url.lastIndexOf(".")),
    sub_key: sub_url.slice(sub_url.lastIndexOf("/") + 1, sub_url.lastIndexOf(".")),
  };
};

// 获取 WBI keys（带缓存，keys 变化不频繁）
const getCachedWbiKeys = async (): Promise<EncodedKeys> => {
  const cachedKeys = await getCache("bilibili-wbi-keys");
  if (cachedKeys?.data) {
    return cachedKeys.data as EncodedKeys;
  }
  const web_keys = await getWbiKeys();
  // 缓存 keys 1小时（keys 不常变化）
  await setCache("bilibili-wbi-keys", {
    data: web_keys,
    updateTime: new Date().toISOString(),
  });
  return web_keys;
};

// 生成带 WBI 签名的查询参数
const getBiliWbi = async (params: WbiParams = {}): Promise<string> => {
  const web_keys = await getCachedWbiKeys();
  // 每次调用都重新生成签名（因为包含时间戳 wts）
  const query = encWbi(params, web_keys.img_key, web_keys.sub_key);
  return query;
};

export default getBiliWbi;
