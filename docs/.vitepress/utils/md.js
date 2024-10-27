/**
 * 业务方法
 * @author L
 * @since 2024-10-26 21:22:07
 */
import { minify } from "html-minifier";

// 移除样式字体
export const cleanStyle = (css) => {
  // 自定义添加的样式
  const appended = `
    .VPDocFooter:empty {
      display: none;
    }
  `;

  return css.replace(/@font-face{[\s\S]*?}/g, "") + appended;
};

// 按钮点击复制操作
export const getScript = () => {
  return `
    const e = new WeakMap();

    window.addEventListener("click", (t) => {
      var s;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i = (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
        if (!r || !i) return;
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className),
          l = [".vp-copy-ignore", ".diff.remove"],
          c = i.cloneNode(!0);
        c.querySelectorAll(l.join(",")).forEach((f) => f.remove());
        let u = c.textContent || "";
        o && (u = u.replace(/^ *(\$|>) /gm, "").trim()),
          navigator.clipboard.writeText(u).then(() => {
            n.classList.add("copied"), clearTimeout(e.get(n));
            const f = setTimeout(() => {
              n.classList.remove("copied"), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, f);
          });
      }
    });
  `;
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
