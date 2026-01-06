import { serve } from "@hono/node-server";
import { config } from "./config.ts";
import logger from "./utils/logger.ts";
import app from "./app.ts";

// 启动服务器
const serveHotApi: (port?: number) => void = (port: number = config.PORT) => {
  try {
    const apiServer = serve({
      fetch: app.fetch,
      port,
    });
    logger.info(`🔥 DailyHot API successfully runs on port ${port}`);
    logger.info(`🔗 Local: 👉 http://localhost:${port}`);
    return apiServer;
  } catch (error) {
    logger.error(error);
  }
};

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "docker") {
  serveHotApi(config.PORT);
}

export default serveHotApi;
