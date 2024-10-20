/**
 *
 * @author L
 * @since 2024-10-20 10:02:02
 */
import { createApp } from "vue";
// import { createPinia } from 'pinia';
import router from "@/router";
import App from "@/App.vue";
import "@/styles/index.scss";

window.addEventListener("unhandledrejection", (e) => {
  console.log(e.reason);
});

const app = createApp(App);

app.use(router);
// app.use(createPinia());

app.mount("#app");
