import { config } from "./config.ts";
import { Hono } from "hono";
import type { RouterData } from "./types.ts";
import getRSS from "./utils/getRSS.ts";

// 静态导入所有路由
import * as route36kr from "./routes/36kr.ts";
import * as route51cto from "./routes/51cto.ts";
import * as route52pojie from "./routes/52pojie.ts";
import * as routeAcfun from "./routes/acfun.ts";
import * as routeBaidu from "./routes/baidu.ts";
import * as routeBilibili from "./routes/bilibili.ts";
import * as routeCoolapk from "./routes/coolapk.ts";
import * as routeCsdn from "./routes/csdn.ts";
import * as routeDgtle from "./routes/dgtle.ts";
import * as routeDoubanGroup from "./routes/douban-group.ts";
import * as routeDoubanMovie from "./routes/douban-movie.ts";
import * as routeDouyin from "./routes/douyin.ts";
import * as routeEarthquake from "./routes/earthquake.ts";
import * as routeGameres from "./routes/gameres.ts";
import * as routeGeekpark from "./routes/geekpark.ts";
import * as routeGenshin from "./routes/genshin.ts";
import * as routeGithub from "./routes/github.ts";
import * as routeGuokr from "./routes/guokr.ts";
import * as routeHackernews from "./routes/hackernews.ts";
import * as routeHellogithub from "./routes/hellogithub.ts";
import * as routeHistory from "./routes/history.ts";
import * as routeHonkai from "./routes/honkai.ts";
import * as routeHostloc from "./routes/hostloc.ts";
import * as routeHupu from "./routes/hupu.ts";
import * as routeHuxiu from "./routes/huxiu.ts";
import * as routeIfanr from "./routes/ifanr.ts";
import * as routeIthomeXijiayi from "./routes/ithome-xijiayi.ts";
import * as routeIthome from "./routes/ithome.ts";
import * as routeJianshu from "./routes/jianshu.ts";
import * as routeJuejin from "./routes/juejin.ts";
import * as routeKuaishou from "./routes/kuaishou.ts";
import * as routeLinuxdo from "./routes/linuxdo.ts";
import * as routeLol from "./routes/lol.ts";
import * as routeMiyoushe from "./routes/miyoushe.ts";
import * as routeNeteaseNews from "./routes/netease-news.ts";
import * as routeNewsmth from "./routes/newsmth.ts";
import * as routeNgabbs from "./routes/ngabbs.ts";
import * as routeNodeseek from "./routes/nodeseek.ts";
import * as routeNytimes from "./routes/nytimes.ts";
import * as routeProducthunt from "./routes/producthunt.ts";
import * as routeQqNews from "./routes/qq-news.ts";
import * as routeSinaNews from "./routes/sina-news.ts";
import * as routeSina from "./routes/sina.ts";
import * as routeSmzdm from "./routes/smzdm.ts";
import * as routeSspai from "./routes/sspai.ts";
import * as routeStarrail from "./routes/starrail.ts";
import * as routeThepaper from "./routes/thepaper.ts";
import * as routeTieba from "./routes/tieba.ts";
import * as routeToutiao from "./routes/toutiao.ts";
import * as routeV2ex from "./routes/v2ex.ts";
import * as routeWeatheralarm from "./routes/weatheralarm.ts";
import * as routeWeibo from "./routes/weibo.ts";
import * as routeWeread from "./routes/weread.ts";
import * as routeYystv from "./routes/yystv.ts";
import * as routeZhihuDaily from "./routes/zhihu-daily.ts";
import * as routeZhihu from "./routes/zhihu.ts";

const app = new Hono();

// 路由模块类型
// deno-lint-ignore no-explicit-any
type RouteModule = { handleRoute: (c: any, noCache: boolean) => Promise<any> };

// 路由映射表
const routeMap: Record<string, RouteModule> = {
  "36kr": route36kr,
  "51cto": route51cto,
  "52pojie": route52pojie,
  "acfun": routeAcfun,
  "baidu": routeBaidu,
  "bilibili": routeBilibili,
  "coolapk": routeCoolapk,
  "csdn": routeCsdn,
  "dgtle": routeDgtle,
  "douban-group": routeDoubanGroup,
  "douban-movie": routeDoubanMovie,
  "douyin": routeDouyin,
  "earthquake": routeEarthquake,
  "gameres": routeGameres,
  "geekpark": routeGeekpark,
  "genshin": routeGenshin,
  "github": routeGithub,
  "guokr": routeGuokr,
  "hackernews": routeHackernews,
  "hellogithub": routeHellogithub,
  "history": routeHistory,
  "honkai": routeHonkai,
  "hostloc": routeHostloc,
  "hupu": routeHupu,
  "huxiu": routeHuxiu,
  "ifanr": routeIfanr,
  "ithome-xijiayi": routeIthomeXijiayi,
  "ithome": routeIthome,
  "jianshu": routeJianshu,
  "juejin": routeJuejin,
  "kuaishou": routeKuaishou,
  "linuxdo": routeLinuxdo,
  "lol": routeLol,
  "miyoushe": routeMiyoushe,
  "netease-news": routeNeteaseNews,
  "newsmth": routeNewsmth,
  "ngabbs": routeNgabbs,
  "nodeseek": routeNodeseek,
  "nytimes": routeNytimes,
  "producthunt": routeProducthunt,
  "qq-news": routeQqNews,
  "sina-news": routeSinaNews,
  "sina": routeSina,
  "smzdm": routeSmzdm,
  "sspai": routeSspai,
  "starrail": routeStarrail,
  "thepaper": routeThepaper,
  "tieba": routeTieba,
  "toutiao": routeToutiao,
  "v2ex": routeV2ex,
  "weatheralarm": routeWeatheralarm,
  "weibo": routeWeibo,
  "weread": routeWeread,
  "yystv": routeYystv,
  "zhihu-daily": routeZhihuDaily,
  "zhihu": routeZhihu,
};

// 路由名称列表
const allRoutePath = Object.keys(routeMap);

// 排除路由
const excludeRoutes: Array<string> = [];

// 注册全部路由
for (const routeName of allRoutePath) {
  // 是否处于排除名单
  if (excludeRoutes.includes(routeName)) {
    continue;
  }
  const listApp = app.basePath(`/${routeName}`);
  // 返回榜单
  listApp.get("/", async (c) => {
    // 是否采用缓存
    const noCache = c.req.query("cache") === "false";
    // 限制显示条目
    const limit = c.req.query("limit");
    // 是否输出 RSS
    const rssEnabled = c.req.query("rss") === "true";
    // 获取路由处理函数
    const { handleRoute } = routeMap[routeName];
    // deno-lint-ignore no-explicit-any
    const listData = await handleRoute(c, noCache) as any;
    // 是否限制条目
    if (limit && listData?.data?.length && listData.data.length > parseInt(limit)) {
      listData.total = parseInt(limit);
      listData.data = listData.data.slice(0, parseInt(limit));
    }
    // 是否输出 RSS
    if (rssEnabled || config.RSS_MODE) {
      const rss = getRSS(listData as RouterData);
      if (typeof rss === "string") {
        c.header("Content-Type", "application/xml; charset=utf-8");
        return c.body(rss);
      } else {
        return c.json({ code: 500, message: "RSS generation failed" }, 500);
      }
    }
    return c.json({ code: 200, ...listData });
  });
  // 请求方式错误
  listApp.all("*", (c) => c.json({ code: 405, message: "Method Not Allowed" }, 405));
}

// 获取全部路由
app.get("/all", (c) =>
  c.json(
    {
      code: 200,
      count: allRoutePath.length,
      routes: allRoutePath.map((path) => {
        // 是否处于排除名单
        if (excludeRoutes.includes(path)) {
          return {
            name: path,
            path: undefined,
            message: "This interface is temporarily offline",
          };
        }
        return { name: path, path: `/${path}` };
      }),
    },
    200,
  ),
);

export default app;
