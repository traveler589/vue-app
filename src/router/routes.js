/**
 *
 * @author L
 * @since 2024-10-20 09:42:31
 */
import { h } from "vue";
import Layout from "@/components/layout/index.vue";
import {
  // ForkOutlined,
  ToolOutlined,
  ExportOutlined,
  // ControlOutlined,
  // ApartmentOutlined,
  // NodeIndexOutlined,
  // DeploymentUnitOutlined,
} from "@ant-design/icons-vue";
import { PageEnum } from "./type";
import { getMenus } from "./helper";

// 侧边菜单路由
const menuRoutes = [
  {
    path: "x6",
    name: PageEnum.X6,
    icon: h(ExportOutlined),
    meta: {
      title: "流程",
    },
    component: () => import(`@/views/markdown/index.vue`),
  },
  {
    path: "md",
    name: PageEnum.Markdown,
    icon: h(ExportOutlined),
    meta: {
      title: "Markdown",
    },
    component: () => import(`@/views/markdown/index.vue`),
  },
  // {
  //   path: 'pack',
  //   name: PageEnum.Pack,
  //   icon: h(ExportOutlined),
  //   meta: {
  //     title: '出包',
  //   },
  //   children: [
  //     {
  //       path: 'full',
  //       name: PageEnum.PackFull,
  //       icon: h(DeploymentUnitOutlined),
  //       meta: {
  //         title: '全量出包',
  //       },
  //       component: () => import(`@/views/pack/full/index.vue`),
  //     },
  //     /* {
  //       path: 'demand',
  //       name: PageEnum.PackDemand,
  //       icon: h(ForkOutlined),
  //       meta: {
  //         title: '按需出包',
  //       },
  //       component: () => import(`@/views/pack/demand/index.vue`),
  //     }, */
  //     {
  //       path: 'activity',
  //       name: PageEnum.PackActivity,
  //       icon: h(NodeIndexOutlined),
  //       meta: {
  //         title: '单活动出包',
  //       },
  //       component: () => import(`@/views/pack/activity/index.vue`),
  //     },
  //   ],
  // },
  // {
  //   path: 'imple',
  //   name: PageEnum.Imple,
  //   icon: h(ControlOutlined),
  //   meta: {
  //     title: '实施',
  //   },
  //   children: [
  //     {
  //       path: 'env',
  //       name: PageEnum.ImpleEnv,
  //       icon: h(ToolOutlined),
  //       meta: {
  //         title: '环境检查',
  //       },
  //       component: () => import(`@/views/imple/env/index.vue`),
  //     },
  //     {
  //       path: 'deploy',
  //       name: PageEnum.ImpleDeploy,
  //       icon: h(ApartmentOutlined),
  //       meta: {
  //         title: '全量部署',
  //       },
  //       component: () => import(`@/views/imple/deploy/index.vue`),
  //     },
  //     /* {
  //       path: 'semiAuto',
  //       name: PageEnum.ImpleSemiAuto,
  //       meta: {
  //         title: '半自动',
  //       },
  //       component: () => import(`@/views/pack/full/index.vue`),
  //     },
  //     {
  //       path: 'manual',
  //       name: PageEnum.ImpleManual,
  //       meta: {
  //         title: '手动',
  //       },
  //       component: () => import(`@/views/pack/demand/index.vue`),
  //     }, */
  //   ],
  // },
];

export const menus = getMenus(menuRoutes);

export default [
  {
    path: "/",
    name: PageEnum.Layout,
    component: Layout,
    children: menuRoutes,
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: PageEnum.NotFound,
  //   meta: {
  //     title: "404",
  //     hidden: true,
  //   },
  //   component: () => import(`@/views/404/index.vue`),
  // },
];
