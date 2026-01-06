import type { RouterData, RouterResType } from "../types.ts";
import type { RouterType } from "../router.types.ts";
import { get } from "../utils/getData.ts";
import { getTime } from "../utils/getTime.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "csdn",
    title: "CSDN",
    type: "排行榜",
    description: "专业开发者社区",
    link: "https://www.csdn.net/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean): Promise<RouterResType> => {
  const url = "https://blog.csdn.net/phoenix/web/blog/hot-rank?page=0&pageSize=30";
  const result = await get({ url, noCache });
  const list = result.data.data;
  return {
    ...result,
    data: list.map((v: RouterType["csdn"]) => ({
      id: v.productId,
      title: v.articleTitle,
      cover: v.picList?.[0] || undefined,
      desc: undefined,
      author: v.nickName,
      timestamp: getTime(v.period),
      hot: Number(v.hotRankScore),
      url: v.articleDetailUrl,
      mobileUrl: v.articleDetailUrl,
    })),
  };
};
