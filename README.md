<div align="center">
<img alt="logo" height="120" src="./public/favicon.png" width="120"/>
<h2>今日热榜</h2>
<p>一个聚合热门数据的 API 接口</p>
<br />
<img src="https://img.shields.io/github/last-commit/Gaq152/DailyHotApi" alt="last commit"/>
<img src="https://img.shields.io/github/languages/code-size/Gaq152/DailyHotApi" alt="code size"/>
</div>

## 🚩 特性

- 极快响应，便于开发
- 支持 RSS 模式和 JSON 模式
- Deno Deploy 一键部署
- 简明的路由目录，便于新增

## 👀 示例

> 这里是使用该 API 的示例站点  
> 示例站点可能由于访问量或者长久未维护而访问异常  
> 若您也使用了本 API 搭建了网站，欢迎提交您的站点链接

- [今日热榜 - https://hot.imsyy.top/](https://hot.imsyy.top/)

## 📊 接口总览

<details>
<summary>查看全部接口</summary>

> 示例站点运行于海外服务器，部分国内站点可能存在访问异常，请以实际情况为准

| **站点**         | **类别**     | **调用名称**   | **状态**                                                                                                                                                            |
| ---------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 哔哩哔哩         | 热门榜       | bilibili       | ![https://dailyhotapi-deno.gaq152.deno.net/bilibili](https://img.shields.io/website.svg?label=bilibili&url=https://dailyhotapi-deno.gaq152.deno.net/bilibili&cacheSeconds=7200)                   |
| AcFun            | 排行榜       | acfun          | ![https://dailyhotapi-deno.gaq152.deno.net/acfun](https://img.shields.io/website.svg?label=acfun&url=https://dailyhotapi-deno.gaq152.deno.net/acfun&cacheSeconds=7200)                            |
| 微博             | 热搜榜       | weibo          | ![https://dailyhotapi-deno.gaq152.deno.net/weibo](https://img.shields.io/website.svg?label=weibo&url=https://dailyhotapi-deno.gaq152.deno.net/weibo&cacheSeconds=7200)                            |
| 知乎             | 热榜         | zhihu          | ![https://dailyhotapi-deno.gaq152.deno.net/zhihu](https://img.shields.io/website.svg?label=zhihu&url=https://dailyhotapi-deno.gaq152.deno.net/zhihu&cacheSeconds=7200)                            |
| 知乎日报         | 推荐榜       | zhihu-daily    | ![https://dailyhotapi-deno.gaq152.deno.net/zhihu-daily](https://img.shields.io/website.svg?label=zhihu-daily&url=https://dailyhotapi-deno.gaq152.deno.net/zhihu-daily&cacheSeconds=7200)          |
| 百度             | 热搜榜       | baidu          | ![https://dailyhotapi-deno.gaq152.deno.net/baidu](https://img.shields.io/website.svg?label=baidu&url=https://dailyhotapi-deno.gaq152.deno.net/baidu&cacheSeconds=7200)                            |
| 抖音             | 热点榜       | douyin         | ![https://dailyhotapi-deno.gaq152.deno.net/douyin](https://img.shields.io/website.svg?label=douyin&url=https://dailyhotapi-deno.gaq152.deno.net/douyin&cacheSeconds=7200)                         |
| 快手             | 热点榜       | kuaishou       | ![https://dailyhotapi-deno.gaq152.deno.net/kuaishou](https://img.shields.io/website.svg?label=kuaishou&url=https://dailyhotapi-deno.gaq152.deno.net/kuaishou&cacheSeconds=7200)                   |
| 豆瓣电影         | 新片榜       | douban-movie   | ![https://dailyhotapi-deno.gaq152.deno.net/douban-movie](https://img.shields.io/website.svg?label=douban-movie&url=https://dailyhotapi-deno.gaq152.deno.net/douban-movie&cacheSeconds=7200)       |
| 豆瓣讨论小组     | 讨论精选     | douban-group   | ![https://dailyhotapi-deno.gaq152.deno.net/douban-group](https://img.shields.io/website.svg?label=douban-group&url=https://dailyhotapi-deno.gaq152.deno.net/douban-group&cacheSeconds=7200)       |
| 百度贴吧         | 热议榜       | tieba          | ![https://dailyhotapi-deno.gaq152.deno.net/tieba](https://img.shields.io/website.svg?label=tieba&url=https://dailyhotapi-deno.gaq152.deno.net/tieba&cacheSeconds=7200)                            |
| 少数派           | 热榜         | sspai          | ![https://dailyhotapi-deno.gaq152.deno.net/sspai](https://img.shields.io/website.svg?label=sspai&url=https://dailyhotapi-deno.gaq152.deno.net/sspai&cacheSeconds=7200)                            |
| IT之家           | 热榜         | ithome         | ![https://dailyhotapi-deno.gaq152.deno.net/ithome](https://img.shields.io/website.svg?label=ithome&url=https://dailyhotapi-deno.gaq152.deno.net/ithome&cacheSeconds=7200)                         |
| IT之家「喜加一」 | 最新动态     | ithome-xijiayi | ![https://dailyhotapi-deno.gaq152.deno.net/ithome-xijiayi](https://img.shields.io/website.svg?label=ithome-xijiayi&url=https://dailyhotapi-deno.gaq152.deno.net/ithome-xijiayi&cacheSeconds=7200) |
| 简书             | 热门推荐     | jianshu        | ![https://dailyhotapi-deno.gaq152.deno.net/jianshu](https://img.shields.io/website.svg?label=jianshu&url=https://dailyhotapi-deno.gaq152.deno.net/jianshu&cacheSeconds=7200)                      |
| 果壳             | 热门文章     | guokr          | ![https://dailyhotapi-deno.gaq152.deno.net/guokr](https://img.shields.io/website.svg?label=guokr&url=https://dailyhotapi-deno.gaq152.deno.net/guokr&cacheSeconds=7200)                            |
| 澎湃新闻         | 热榜         | thepaper       | ![https://dailyhotapi-deno.gaq152.deno.net/thepaper](https://img.shields.io/website.svg?label=thepaper&url=https://dailyhotapi-deno.gaq152.deno.net/thepaper&cacheSeconds=7200)                   |
| 今日头条         | 热榜         | toutiao        | ![https://dailyhotapi-deno.gaq152.deno.net/toutiao](https://img.shields.io/website.svg?label=toutiao&url=https://dailyhotapi-deno.gaq152.deno.net/toutiao&cacheSeconds=7200)                      |
| 36 氪            | 热榜         | 36kr           | ![https://dailyhotapi-deno.gaq152.deno.net/36kr](https://img.shields.io/website.svg?label=36kr&url=https://dailyhotapi-deno.gaq152.deno.net/36kr&cacheSeconds=7200)                               |
| 51CTO            | 推荐榜       | 51cto          | ![https://dailyhotapi-deno.gaq152.deno.net/51cto](https://img.shields.io/website.svg?label=51cto&url=https://dailyhotapi-deno.gaq152.deno.net/51cto&cacheSeconds=7200)                            |
| CSDN             | 排行榜       | csdn           | ![https://dailyhotapi-deno.gaq152.deno.net/csdn](https://img.shields.io/website.svg?label=csdn&url=https://dailyhotapi-deno.gaq152.deno.net/csdn&cacheSeconds=7200)                               |
| NodeSeek         | 最新动态     | nodeseek       | ![https://dailyhotapi-deno.gaq152.deno.net/nodeseek](https://img.shields.io/website.svg?label=nodeseek&url=https://dailyhotapi-deno.gaq152.deno.net/nodeseek&cacheSeconds=7200)                   |
| 稀土掘金         | 热榜         | juejin         | ![https://dailyhotapi-deno.gaq152.deno.net/juejin](https://img.shields.io/website.svg?label=juejin&url=https://dailyhotapi-deno.gaq152.deno.net/juejin&cacheSeconds=7200)                         |
| 腾讯新闻         | 热点榜       | qq-news        | ![https://dailyhotapi-deno.gaq152.deno.net/qq-news](https://img.shields.io/website.svg?label=qq-news&url=https://dailyhotapi-deno.gaq152.deno.net/qq-news&cacheSeconds=7200)                      |
| 新浪网           | 热榜         | sina           | ![https://dailyhotapi-deno.gaq152.deno.net/sina](https://img.shields.io/website.svg?label=sina&url=https://dailyhotapi-deno.gaq152.deno.net/sina&cacheSeconds=7200)                               |
| 新浪新闻         | 热点榜       | sina-news      | ![https://dailyhotapi-deno.gaq152.deno.net/sina-news](https://img.shields.io/website.svg?label=sina-news&url=https://dailyhotapi-deno.gaq152.deno.net/sina-news&cacheSeconds=7200)                |
| 网易新闻         | 热点榜       | netease-news   | ![https://dailyhotapi-deno.gaq152.deno.net/netease-news](https://img.shields.io/website.svg?label=netease-news&url=https://dailyhotapi-deno.gaq152.deno.net/netease-news&cacheSeconds=7200)       |
| 吾爱破解         | 榜单         | 52pojie        | ![https://dailyhotapi-deno.gaq152.deno.net/52pojie](https://img.shields.io/website.svg?label=52pojie&url=https://dailyhotapi-deno.gaq152.deno.net/52pojie&cacheSeconds=7200)                      |
| 全球主机交流     | 榜单         | hostloc        | ![https://dailyhotapi-deno.gaq152.deno.net/hostloc](https://img.shields.io/website.svg?label=hostloc&url=https://dailyhotapi-deno.gaq152.deno.net/hostloc&cacheSeconds=7200)                      |
| 虎嗅             | 24小时       | huxiu          | ![https://dailyhotapi-deno.gaq152.deno.net/huxiu](https://img.shields.io/website.svg?label=huxiu&url=https://dailyhotapi-deno.gaq152.deno.net/huxiu&cacheSeconds=7200)                            |
| 酷安             | 热榜         | coolapk        | ![https://dailyhotapi-deno.gaq152.deno.net/coolapk](https://img.shields.io/website.svg?label=coolapk&url=https://dailyhotapi-deno.gaq152.deno.net/coolapk&cacheSeconds=7200)                      |
| 虎扑             | 步行街热帖   | hupu           | ![https://dailyhotapi-deno.gaq152.deno.net/hupu](https://img.shields.io/website.svg?label=hupu&url=https://dailyhotapi-deno.gaq152.deno.net/hupu&cacheSeconds=7200)                               |
| 爱范儿           | 快讯         | ifanr          | ![https://dailyhotapi-deno.gaq152.deno.net/ifanr](https://img.shields.io/website.svg?label=ifanr&url=https://dailyhotapi-deno.gaq152.deno.net/ifanr&cacheSeconds=7200)                            |
| 英雄联盟         | 更新公告     | lol            | ![https://dailyhotapi-deno.gaq152.deno.net/lol](https://img.shields.io/website.svg?label=lol&url=https://dailyhotapi-deno.gaq152.deno.net/lol&cacheSeconds=7200)                                  |
| 米游社           | 最新消息     | miyoushe       | ![https://dailyhotapi-deno.gaq152.deno.net/miyoushe](https://img.shields.io/website.svg?label=miyoushe&url=https://dailyhotapi-deno.gaq152.deno.net/miyoushe&cacheSeconds=7200)                   |
| 原神             | 最新消息     | genshin        | ![https://dailyhotapi-deno.gaq152.deno.net/genshin](https://img.shields.io/website.svg?label=genshin&url=https://dailyhotapi-deno.gaq152.deno.net/genshin&cacheSeconds=7200)                      |
| 崩坏3            | 最新动态     | honkai         | ![https://dailyhotapi-deno.gaq152.deno.net/honkai](https://img.shields.io/website.svg?label=honkai&url=https://dailyhotapi-deno.gaq152.deno.net/honkai&cacheSeconds=7200)                         |
| 崩坏：星穹铁道   | 最新动态     | starrail       | ![https://dailyhotapi-deno.gaq152.deno.net/starrail](https://img.shields.io/website.svg?label=starrail&url=https://dailyhotapi-deno.gaq152.deno.net/starrail&cacheSeconds=7200)                   |
| 微信读书         | 飙升榜       | weread         | ![https://dailyhotapi-deno.gaq152.deno.net/weread](https://img.shields.io/website.svg?label=weread&url=https://dailyhotapi-deno.gaq152.deno.net/weread&cacheSeconds=7200)                         |
| NGA              | 热帖         | ngabbs         | ![https://dailyhotapi-deno.gaq152.deno.net/ngabbs](https://img.shields.io/website.svg?label=ngabbs&url=https://dailyhotapi-deno.gaq152.deno.net/ngabbs&cacheSeconds=7200)                         |
| V2EX             | 主题榜       | v2ex           | ![https://dailyhotapi-deno.gaq152.deno.net/v2ex](https://img.shields.io/website.svg?label=v2ex&url=https://dailyhotapi-deno.gaq152.deno.net/v2ex&cacheSeconds=7200)                               |
| HelloGitHub      | Trending     | hellogithub    | ![https://dailyhotapi-deno.gaq152.deno.net/hellogithub](https://img.shields.io/website.svg?label=hellogithub&url=https://dailyhotapi-deno.gaq152.deno.net/hellogithub&cacheSeconds=7200)          |
| 中央气象台       | 全国气象预警 | weatheralarm   | ![https://dailyhotapi-deno.gaq152.deno.net/weatheralarm](https://img.shields.io/website.svg?label=weatheralarm&url=https://dailyhotapi-deno.gaq152.deno.net/weatheralarm&cacheSeconds=7200)       |
| 中国地震台       | 地震速报     | earthquake     | ![https://dailyhotapi-deno.gaq152.deno.net/earthquake](https://img.shields.io/website.svg?label=earthquake&url=https://dailyhotapi-deno.gaq152.deno.net/earthquake&cacheSeconds=7200)             |
| 历史上的今天     | 月-日        | history        | ![https://dailyhotapi-deno.gaq152.deno.net/history](https://img.shields.io/website.svg?label=history&url=https://dailyhotapi-deno.gaq152.deno.net/history&cacheSeconds=7200)                      |

</details>

## ⚙️ 部署

本项目支持使用 [Deno Deploy](https://deno.com/deploy) 一键部署，具有极快的冷启动速度，且国内可直接访问。

> 示例站点：https://dailyhotapi-deno.gaq152.deno.net/

[![Deploy on Deno Deploy](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/Gaq152/DailyHotApi)

部署步骤：
1. 点击上方按钮
2. 登录 GitHub 账号并授权
3. 选择入口文件为 `main.ts`
4. 点击部署即可

### 本地开发

```bash
# 安装 Deno
# Windows: irm https://deno.land/install.ps1 | iex
# macOS/Linux: curl -fsSL https://deno.land/install.sh | sh

# 克隆项目
git clone https://github.com/Gaq152/DailyHotApi.git
cd DailyHotApi

# 开发模式（热重载）
deno task dev

# 生产模式
deno task start
```

## ⚠️ 须知

- 本项目为了避免频繁请求官方数据，默认对数据做了缓存处理，默认为 `60` 分钟，如需更改，请自行修改配置
- 本项目部分接口使用了 **页面爬虫**，若违反对应页面的相关规则，请 **及时通知我去除该接口**

## 📢 免责声明

- 本项目提供的 `API` 仅供开发者进行技术研究和开发测试使用。使用该 `API` 获取的信息仅供参考，不代表本项目对信息的准确性、可靠性、合法性、完整性作出任何承诺或保证。本项目不对任何因使用该 `API` 获取信息而导致的任何直接或间接损失负责。本项目保留随时更改 `API` 接口地址、接口协议、接口参数及其他相关内容的权利。本项目对使用者使用 `API` 的行为不承担任何直接或间接的法律责任
- 本项目并未与相关信息提供方建立任何关联或合作关系，获取的信息均来自公开渠道，如因使用该 `API` 获取信息而产生的任何法律责任，由使用者自行承担
- 本项目对使用 `API` 获取的信息进行了最大限度的筛选和整理，但不保证信息的准确性和完整性。使用 `API` 获取信息时，请务必自行核实信息的真实性和可靠性，谨慎处理相关事项
- 本项目保留对 `API` 的随时更改、停用、限制使用等措施的权利。任何因使用本 `API` 产生的损失，本项目不负担任何赔偿和责任

## 😘 鸣谢

特此感谢为本项目提供支持与灵感的项目

- [RSSHub](https://github.com/DIYgod/RSSHub)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Gaq152/DailyHotApi&type=Date)](https://star-history.com/#Gaq152/DailyHotApi&Date)
