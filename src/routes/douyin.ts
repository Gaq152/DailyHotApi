import type { RouterData } from "../types.ts";
import type { RouterType } from "../router.types.ts";
import { get } from "../utils/getData.ts";
import { getTime } from "../utils/getTime.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "douyin",
    title: "抖音",
    type: "热榜",
    description: "实时上升热点",
    link: "https://www.douyin.com",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url =
    "https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1";
  const result = await get({
    url,
    noCache,
    responseType: "json",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Cookie: "passport_csrf_token=0",
      Referer: "https://www.douyin.com/",
    },
  });
  const list = result.data.data.word_list;
  return {
    ...result,
    data: list.map((v: RouterType["douyin"]) => ({
      id: v.sentence_id,
      title: v.word,
      timestamp: getTime(v.event_time),
      hot: v.hot_value,
      url: `https://www.douyin.com/hot/${v.sentence_id}`,
      mobileUrl: `https://www.douyin.com/hot/${v.sentence_id}`,
    })),
  };
};
