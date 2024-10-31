/**
 * 生成离线文档
 * @author L
 * @since 2024-10-26 21:02:58
 */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import { get } from "./ajax.js";
import { getScript, cleanStyle, minifyText } from "./md.js";

// 获取
const getData = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: { width: 1600, height: 900 },
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const page = await browser.newPage();

  // 打开页面
  await page.goto(url, {
    waitUntil: ["domcontentloaded", "networkidle0"],
  });

  const link = await page.$eval("link[rel~=stylesheet]", (e) => e.href);

  const body = await page.$eval("#VPContent", (e) => e.innerHTML);

  const css = await get(link);

  const style = cleanStyle(css, body);

  const title = await page.title();

  await browser.close();

  return {
    body,
    style,
    title: title.split("|")[0]?.trim() || title,
  };
};

// 保存
export const createMarkdown = async (url, dist) => {
  try {
    // console.log("开始获取数据...");

    // const startTime = Date.now();

    const { body, style, title } = await getData(url);

    // console.log("获取数据成功！");

    const content = `<html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>${title}</title>
        <style>${style}</style>
        <script>${getScript()}</script>
      </head>
      <body>${body}</body>
    </html>`;

    // 文件路径
    const filePath = path.resolve(dist, `./${title}.html`);
    // 压缩
    const text = minifyText(content);

    fs.writeFileSync(filePath, text);

    // console.log(
    //   `文件生成成功，耗时${getDurTime(startTime)}，文件保存路径：\n${filePath}`
    // );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
