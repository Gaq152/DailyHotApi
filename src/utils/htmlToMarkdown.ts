import { load } from "cheerio";

/**
 * 将 HTML 转换为 Markdown 格式
 * 保留链接、图片、换行等格式信息
 * @param html HTML 内容
 * @returns Markdown 格式的文本
 */
export const htmlToMarkdown = (html: string): string => {
  if (!html) return "";

  const $ = load(html);

  // 处理图片：转换为 ![alt](src)
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") || "";
    const alt = $el.attr("alt") || "图片";
    $el.replaceWith(`![${alt}](${src})`);
  });

  // 处理链接：转换为 [text](href)
  $("a").each((_, el) => {
    const $el = $(el);
    const href = $el.attr("href") || "";
    const text = $el.text().trim() || href;
    // 避免空链接
    if (href) {
      $el.replaceWith(`[${text}](${href})`);
    } else {
      $el.replaceWith(text);
    }
  });

  // 处理换行标签
  $("br").replaceWith("\n");

  // 处理段落标签：添加换行
  $("p").each((_, el) => {
    const $el = $(el);
    $el.replaceWith($el.text() + "\n\n");
  });

  // 处理标题
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const $el = $(el);
    const level = parseInt(el.tagName.substring(1));
    const prefix = "#".repeat(level) + " ";
    $el.replaceWith(prefix + $el.text() + "\n\n");
  });

  // 处理列表
  $("li").each((_, el) => {
    const $el = $(el);
    $el.replaceWith("- " + $el.text().trim() + "\n");
  });

  // 处理代码块
  $("pre, code").each((_, el) => {
    const $el = $(el);
    const text = $el.text();
    if (el.tagName === "pre") {
      $el.replaceWith("\n```\n" + text + "\n```\n");
    } else {
      $el.replaceWith("`" + text + "`");
    }
  });

  // 处理粗体和斜体
  $("strong, b").each((_, el) => {
    const $el = $(el);
    $el.replaceWith("**" + $el.text() + "**");
  });

  $("em, i").each((_, el) => {
    const $el = $(el);
    $el.replaceWith("*" + $el.text() + "*");
  });

  // 处理引用块
  $("blockquote").each((_, el) => {
    const $el = $(el);
    const lines = $el.text().split("\n").map(line => "> " + line).join("\n");
    $el.replaceWith(lines + "\n\n");
  });

  // 处理 div 和其他块级元素：添加换行
  $("div, section, article").each((_, el) => {
    const $el = $(el);
    $el.replaceWith($el.text() + "\n");
  });

  // 获取纯文本并清理多余空白
  let text = $.text();

  // 清理多余的空行（超过2个连续换行变成2个）
  text = text.replace(/\n{3,}/g, "\n\n");

  // 清理行首行尾空白
  text = text.split("\n").map(line => line.trim()).join("\n");

  // 清理首尾空白
  text = text.trim();

  return text;
};
