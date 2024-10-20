/**
 *
 * @author L
 * @since 2024-10-20 09:42:17
 */
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
