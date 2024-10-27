/**
 *
 * @author L
 * @since 2024-10-27 19:24:29
 */
import fs from "fs";
import path from "path";
import { shell, controller, getDurTime } from "./utils/helper.js";
import { createMarkdown } from "./utils/doc.js";

// 项目根目录
const root = process.cwd();
// html文件地址
const source = "./docs/.vitepress/dist";

// 排除不需转换的文件
const excluded = ["404", "index"];

// 目录文件夹
const dist = path.resolve(process.cwd(), "./docs/dist");

const getFiles = () => {
  return fs.readdirSync(source).filter((file) => {
    return (
      file.endsWith(".html") && !excluded.includes(file.replace(".html", ""))
    );
  });
};

const transform = async () => {
  try {
    const startTime = Date.now();

    console.log("启动服务...\n");

    const { url, exit } = await shell("pnpm dp", root);

    console.log("开始转换文件...\n");

    const files = getFiles();

    if (files.length) {
      for (const file of files) {
        await createMarkdown(`${url}/${file}`, dist);
      }

      console.log(
        `文件转换成功，耗时${getDurTime(startTime)}，文件保存路径：${dist}\n`
      );
    } else {
      console.log("无可操作文件！\n");
    }

    exit();
  } catch (e) {
    console.log("出错啦：");
    console.error(e);
    controller.abort();
  }
};

transform();
