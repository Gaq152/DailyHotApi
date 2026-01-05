// Deno 兼容的简化日志模块
// 使用控制台输出替代 winston

// 获取当前时间戳
const getTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
};

// 日志级别颜色（使用 ANSI 转义码）
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[41m\x1b[37m",     // 红底白字
  yellow: "\x1b[43m\x1b[30m",  // 黄底黑字
  blue: "\x1b[44m\x1b[37m",    // 蓝底白字
  green: "\x1b[42m\x1b[30m",   // 绿底黑字
};

// 日志接口
interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

const logger: Logger = {
  info: (message: string) => {
    console.log(`${colors.blue} INFO ${colors.reset} [${getTimestamp()}] ${message}`);
  },
  warn: (message: string) => {
    console.warn(`${colors.yellow} WARN ${colors.reset} [${getTimestamp()}] ${message}`);
  },
  error: (message: string) => {
    console.error(`${colors.red} ERROR ${colors.reset} [${getTimestamp()}] ${message}`);
  },
  debug: (message: string) => {
    console.log(`${colors.green} DEBUG ${colors.reset} [${getTimestamp()}] ${message}`);
  },
};

export default logger;
