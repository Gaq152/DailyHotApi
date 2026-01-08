import type { RouterData } from "../types.ts";
import { get } from "../utils/getData.ts";
import { load } from "cheerio";
import { parseRSS } from "../utils/parseRSS.ts";
import { getTime } from "../utils/getTime.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "producthunt",
    title: "Product Hunt",
    type: "Today",
    description: "The best new products, every day",
    link: "https://www.producthunt.com/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

// 主要方式：HTML 爬取
const getListFromHTML = async (noCache: boolean) => {
  const baseUrl = "https://www.producthunt.com";
  const result = await get({
    url: baseUrl,
    noCache,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const $ = load(result.data);
  const stories: {
    id: string;
    title: string;
    desc: string;
    hot: number | undefined;
    timestamp: number | undefined;
    url: string;
    mobileUrl: string;
  }[] = [];

  $("[data-test^=post-item]").each((_, el) => {
    const $el = $(el);
    // 标题在 span[data-test^=post-name] > a
    const nameSpan = $el.find("span[data-test^=post-name]");
    const titleLink = nameSpan.find("a");
    const title = titleLink.text().trim().replace(/^\d+\.\s*/, ""); // 去掉序号
    const path = titleLink.attr("href");
    const id = $el.attr("data-test")?.replace("post-item-", "") || "";
    // 描述
    const desc = $el.find("span.text-secondary").first().text().trim();
    // 投票按钮
    const vote = $el.find("[data-test=vote-button]").text().trim();

    if (path && id && title) {
      stories.push({
        id,
        title,
        desc,
        hot: parseInt(vote) || undefined,
        timestamp: undefined,
        url: `${baseUrl}${path}`,
        mobileUrl: `${baseUrl}${path}`,
      });
    }
  });

  if (stories.length === 0) {
    throw new Error("No stories found from HTML");
  }

  return {
    ...result,
    data: stories,
  };
};

// 备用方式：RSS
const getListFromRSS = async (noCache: boolean) => {
  const url = "https://www.producthunt.com/feed";
  const result = await get({
    url,
    noCache,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  const list = await parseRSS(result.data);
  return {
    ...result,
    data: list.map((v, i) => ({
      id: v.guid?.replace(/.*Post\//, "") || String(i),
      title: v.title || "",
      desc: v.contentSnippet?.trim() || "",
      author: v.author || "",
      timestamp: getTime(v.pubDate || 0),
      hot: undefined,
      url: v.link || "",
      mobileUrl: v.link || "",
    })),
  };
};

const getList = async (noCache: boolean) => {
  try {
    // 优先使用 HTML 爬取（有投票数）
    return await getListFromHTML(noCache);
  } catch {
    // 备用：RSS（无投票数，但更稳定）
    console.log("ProductHunt HTML 解析失败，使用 RSS 备用");
    return await getListFromRSS(noCache);
  }
};
