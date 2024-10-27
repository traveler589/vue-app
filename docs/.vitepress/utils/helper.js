/**
 * 公共方法
 * @author L
 * @since 2024-10-26 21:22:07
 */
import { spawn } from "child_process";

export const controller = new AbortController();
const { signal } = controller;

const serveAt = "served at";

// 自定义命令执行
export function shell(command, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      cwd,
      signal,
      shell: true,
    });

    process.stdin.pipe(child.stdout);

    child.on("error", reject);

    child.on("exit", () => {
      console.log("操作结束，请按 ctrl+c 退出服务");
    });

    child.stdout.on("data", (x) => {
      const log = x.toString();

      console.log(log);

      if (log.includes(serveAt)) {
        console.log("服务启动成功！\n");

        resolve({
          url: log.split(serveAt).pop().trim().replace(/\/+$/, ""),
          exit() {
            child.stdout.destroy();

            child.kill();

            process.stdin.destroy();
          },
        });
      }
    });
  });
}

// 获取耗时
export const getDurTime = (start) => {
  const end = Date.now();

  if (!start || end < start) {
    return "小于1秒";
  }

  let sec = Math.round((end - start) / 1e3);

  if (sec < 60) {
    return `${sec}秒`;
  }

  let min = Math.floor(sec / 60);

  sec = sec % 60;

  if (min < 60) {
    return [`${min}分`, sec && `${sec}秒`].filter(Boolean).join("");
  }

  const hour = Math.floor(min / 60);

  min = min % 60;

  return [`${hour}时`, min && `${min}分`, sec && `${sec}秒`]
    .filter(Boolean)
    .join("");
};
