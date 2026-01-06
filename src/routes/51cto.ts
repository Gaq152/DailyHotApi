import type { RouterData, RouterResType } from "../types.d.ts";
import type { RouterType } from "../router.types.d.ts";
import { getToken, sign } from "../utils/getToken/51cto.ts";
import { get } from "../utils/getData.ts";
import { getTime } from "../utils/getTime.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "51cto",
    title: "51CTO",
    type: "推荐榜",
    link: "https://www.51cto.com/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean): Promise<RouterResType> => {
  const url = `https://api-media.51cto.com/index/index/recommend`;
  const params = {
    page: 1,
    page_size: 50,
    limit_time: 0,
    name_en: "",
  };
  const timestamp = Date.now();
  const token = (await getToken()) as string;
  const result = await get({
    url,
    params: {
      ...params,
      timestamp,
      token,
      sign: sign("index/index/recommend", params, timestamp, token),
    },
    noCache,
  });
  const list = result.data.data.data.list;
  return {
    ...result,
    data: list.map((v: RouterType["51cto"]) => ({
      id: v.source_id,
      title: v.title,
      cover: v.cover,
      desc: v.abstract,
      timestamp: getTime(v.pubdate),
      hot: undefined,
      url: v.url,
      mobileUrl: v.url,
    })),
  };
};
