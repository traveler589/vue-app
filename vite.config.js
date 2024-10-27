import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    proxy: {
      "/docs": {
        target: "http://localhost:4173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, ""),
      },
    },
  },
});
