/**
 *
 * @author L
 * @since 2024-10-26 21:09:48
 */
import http from "http";
import { URL } from "node:url";

export const get = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        res.setEncoding("utf8");

        let raw = "";

        res.on("data", (chunk) => {
          raw += chunk;
        });

        res.on("end", () => {
          resolve(raw);
        });
      })
      .on("error", reject);
  });
};

// 检查服务器
export const check = (url) => {
  const { hostname, port } = new URL(url);

  return new Promise((resolve, reject) => {
    const req = http
      .request(
        {
          hostname,
          port,
          method: "HEAD",
        },
        resolve
      )
      .on("error", reject);

    req.end();
  });
};
