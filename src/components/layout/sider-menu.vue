<template>
  <!-- collapsible
  :collapsedWidth="60"
  :collapsed="collapsed"
  @collapse="onCollapse" -->
  <Sider :width="220">
    <router-link to="/" :class="$style.logo">
      <!-- <img :src="logo" /> -->
      演示平台
    </router-link>
    <Menu
      theme="dark"
      mode="inline"
      :items="items"
      :openKeys="openKeys"
      :selectedKeys="menuKeys"
      @click="handleClick"
      @openChange="onOpenChange"
    />
  </Sider>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu, Layout } from "ant-design-vue";
import { menus } from "@/router/routes";

const route = useRoute();
const router = useRouter();
const { Sider } = Layout;

// 菜单选项
const items = ref(menus);

const getOpenKeys = () => {
  return route.matched
    .slice(1)
    .filter((item) => item.children.length)
    .map(({ name }) => name);
};

// 侧边栏是否收起
// const collapsed = ref(false);

// 展开的菜单
const openKeys = ref(getOpenKeys());

// 选中的菜单
const menuKeys = computed(() => {
  const key = route.meta?.active || route.name;

  return [key];
});

// 展开收起侧边栏
/* const onCollapse = (value: boolean) => {
  collapsed.value = value;
};
 */
// 菜单展开收起事件
const onOpenChange = (keys) => {
  openKeys.value = keys.slice(-1);
};

// 菜单点击跳转
const handleClick = ({ item: { path } }) => {
  router.push(path);
};

// 监听路由变化，更新展开的菜单
watch(
  () => route.matched,
  () => {
    openKeys.value = getOpenKeys();
  }
);
</script>
<style module lang="scss">
$headerHeight: 50px;

:global(.ant-layout-sider) {
  :local {
    .logo {
      display: flex;
      align-items: center;
      height: $headerHeight;
      padding: 12px 22px;
      font-size: 16px;
      color: #fff;
      &:hover {
        color: #eee;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        margin-right: 10px;
      }
    }
  }
}
</style>
