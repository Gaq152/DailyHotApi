import type { RouterData } from "../types.d.ts";
import { get } from "../utils/getData.ts";
import { getTime } from "../utils/getTime.ts";
import { parseRSS } from "../utils/parseRSS.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "nodeseek",
    title: "NodeSeek",
    type: "最新",
    params: {
      type: {
        name: "分类",
        type: {
          all: "所有",
        },
      },
    },
    link: "https://www.nodeseek.com/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://rss.nodeseek.com/`;
  const result = await get({ url, noCache });
  const list = await parseRSS(result.data);
  return {
    ...result,
    data: list.map((v, i) => ({
      id: v.guid || i,
      title: v.title || "",
      desc: v.content?.trim() || "",
      author: v.author,
      timestamp: getTime(v.pubDate || 0),
      hot: undefined,
      url: v.link || "",
      mobileUrl: v.link || "",
    })),
  };
};
