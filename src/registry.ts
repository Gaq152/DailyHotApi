import { config } from "./config.js";
import { Hono } from "hono";
import getRSS from "./utils/getRSS.js";

// 静态导入所有路由
import * as route36kr from "./routes/36kr.js";
import * as route51cto from "./routes/51cto.js";
import * as route52pojie from "./routes/52pojie.js";
import * as routeAcfun from "./routes/acfun.js";
import * as routeBaidu from "./routes/baidu.js";
import * as routeBilibili from "./routes/bilibili.js";
import * as routeCoolapk from "./routes/coolapk.js";
import * as routeCsdn from "./routes/csdn.js";
import * as routeDgtle from "./routes/dgtle.js";
import * as routeDoubanGroup from "./routes/douban-group.js";
import * as routeDoubanMovie from "./routes/douban-movie.js";
import * as routeDouyin from "./routes/douyin.js";
import * as routeEarthquake from "./routes/earthquake.js";
import * as routeGameres from "./routes/gameres.js";
import * as routeGeekpark from "./routes/geekpark.js";
import * as routeGenshin from "./routes/genshin.js";
import * as routeGithub from "./routes/github.js";
import * as routeGuokr from "./routes/guokr.js";
import * as routeHackernews from "./routes/hackernews.js";
import * as routeHellogithub from "./routes/hellogithub.js";
import * as routeHistory from "./routes/history.js";
import * as routeHonkai from "./routes/honkai.js";
import * as routeHostloc from "./routes/hostloc.js";
import * as routeHupu from "./routes/hupu.js";
import * as routeHuxiu from "./routes/huxiu.js";
import * as routeIfanr from "./routes/ifanr.js";
import * as routeIthomeXijiayi from "./routes/ithome-xijiayi.js";
import * as routeIthome from "./routes/ithome.js";
import * as routeJianshu from "./routes/jianshu.js";
import * as routeJuejin from "./routes/juejin.js";
import * as routeKuaishou from "./routes/kuaishou.js";
import * as routeLinuxdo from "./routes/linuxdo.js";
import * as routeLol from "./routes/lol.js";
import * as routeMiyoushe from "./routes/miyoushe.js";
import * as routeNeteaseNews from "./routes/netease-news.js";
import * as routeNewsmth from "./routes/newsmth.js";
import * as routeNgabbs from "./routes/ngabbs.js";
import * as routeNodeseek from "./routes/nodeseek.js";
import * as routeNytimes from "./routes/nytimes.js";
import * as routeProducthunt from "./routes/producthunt.js";
import * as routeQqNews from "./routes/qq-news.js";
import * as routeSinaNews from "./routes/sina-news.js";
import * as routeSina from "./routes/sina.js";
import * as routeSmzdm from "./routes/smzdm.js";
import * as routeSspai from "./routes/sspai.js";
import * as routeStarrail from "./routes/starrail.js";
import * as routeThepaper from "./routes/thepaper.js";
import * as routeTieba from "./routes/tieba.js";
import * as routeToutiao from "./routes/toutiao.js";
import * as routeV2ex from "./routes/v2ex.js";
import * as routeWeatheralarm from "./routes/weatheralarm.js";
import * as routeWeibo from "./routes/weibo.js";
import * as routeWeread from "./routes/weread.js";
import * as routeYystv from "./routes/yystv.js";
import * as routeZhihuDaily from "./routes/zhihu-daily.js";
import * as routeZhihu from "./routes/zhihu.js";

const app = new Hono();

// 路由映射表
const routeMap: Record<string, { handleRoute: (c: unknown, noCache: boolean) => Promise<unknown> }> = {
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
    const listData = await handleRoute(c, noCache) as { data?: unknown[]; total?: number };
    // 是否限制条目
    if (limit && listData?.data?.length && listData.data.length > parseInt(limit)) {
      listData.total = parseInt(limit);
      listData.data = listData.data.slice(0, parseInt(limit));
    }
    // 是否输出 RSS
    if (rssEnabled || config.RSS_MODE) {
      const rss = getRSS(listData);
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
