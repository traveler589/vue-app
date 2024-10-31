/**
 * 业务方法
 * @author L
 * @since 2024-10-26 21:22:07
 */
import fs from "fs";
import path from "path";
import { minify } from "html-minifier";

// 移除样式字体
export const cleanStyle = (css, body) => {
  let appended = "";

  let attr = body
    .match(/<div[\s]+class="container"[\s\S]*?>/)?.[0]
    .match(/data-v-\w+/)?.[0];

  if (attr) {
    attr = `[${attr}]`;

    // 自定义添加的样式
    appended = `
        .content${attr} {
          padding-bottom: 48px;
        }
        .VPDocFooter${attr}:empty {
          display: none;
        }
      `;
  }

  return css.replace(/@font-face{[\s\S]*?}/g, "") + appended;
};

// 按钮点击操作
export const getScript = () => {
  const url = path.resolve(
    process.cwd(),
    "./docs/.vitepress/utils/js/event.js"
  );

  return fs.readFileSync(url, "utf-8");
};

// 压缩
export const minifyText = (text) => {
  if (!text) {
    return "";
  }

  return minify(text, {
    minifyJS: true,
    minifyCSS: true,
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeAttributeQuotes: true,
    collapseInlineTagWhitespace: true,
  });
};
