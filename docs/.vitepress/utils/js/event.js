/**
 * js点击事件
 * @author L
 * @since 2024-10-31 07:39:23
 */
function copyCode() {
  const e = new WeakMap();

  // 复制代码
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
}

// 代码组
function changeGroupTab() {
  window.addEventListener("click", (e) => {
    var n;
    const t = e.target;
    if (t.matches(".vp-code-group input")) {
      const s = (n = t.parentElement) == null ? void 0 : n.parentElement;
      if (!s) return;
      const r = Array.from(s.querySelectorAll("input")).indexOf(t);
      if (r < 0) return;
      const i = s.querySelector(".blocks");
      if (!i) return;
      const o = Array.from(i.children).find((u) =>
        u.classList.contains("active")
      );
      if (!o) return;
      const l = i.children[r];
      if (!l || o === l) return;
      o.classList.remove("active"), l.classList.add("active");
      const c = s == null ? void 0 : s.querySelector(`label[for="${t.id}"]`);
      c == null || c.scrollIntoView({ block: "nearest" });
    }
  });
}

copyCode();
changeGroupTab();
