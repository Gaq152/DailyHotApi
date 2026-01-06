import type { RouterData } from "../types.d.ts";
import type { RouterType } from "../router.types.d.ts";
import { getTime } from "../utils/getTime.ts";
import { get } from "../utils/getData.ts";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "huxiu",
    title: "虎嗅",
    type: "24小时",
    link: "https://www.huxiu.com/moment/",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  // PC 端接口
  const url = `https://moment-api.huxiu.com/web-v3/moment/feed?platform=www`;
  const result = await get({
    url,
    noCache,
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.huxiu.com/moment/",
    },
  });

  const data = result.data as { data?: { moment_list?: { datalist?: RouterType["huxiu"][] } } };
  const list: RouterType["huxiu"][] = data?.data?.moment_list?.datalist || [];

  return {
    fromCache: result.fromCache,
    updateTime: result.updateTime,
    data: list.map((v: RouterType["huxiu"]) => {
      const content = (v.content || "").replace(/<br\s*\/?>/gi, "\n");
      const [titleLine, ...rest] = content
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const title = titleLine?.replace(/。$/, "") || "";
      const intro = rest.join("\n");
      const momentId = v.object_id;
      return {
        id: momentId,
        title,
        desc: intro,
        author: v.user_info?.username || "",
        timestamp: getTime(v.publish_time),
        hot: v.count_info?.agree_num,
        url: `https://www.huxiu.com/moment/${momentId}.html`,
        mobileUrl: `https://m.huxiu.com/moment/${momentId}.html`,
      };
    }),
  };
};
