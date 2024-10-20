<template>
  <Layout :class="$style.layout">
    <SiderMenu />
    <HeaderBar />
    <Content>
      <router-view />
    </Content>
  </Layout>
</template>
<script setup>
import { Layout } from "ant-design-vue";
import HeaderBar from "./header-bar.vue";
import SiderMenu from "./sider-menu.vue";

const { Content } = Layout;
</script>
<style module lang="scss">
@use "@/styles/mixin.scss";

$headerHeight: 50px;

$offset: 15px;

:global(.ant-layout) {
  &:local(.layout) {
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: min-content 1fr;
    height: 100%;
    :global {
      .ant-layout-header {
        position: relative;
        z-index: 9;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $headerHeight;
        padding: 0 15px;
        background: #fff;
        box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
      }

      .ant-layout-sider {
        grid-row: 1 / 3;
        height: 100%;
        padding-bottom: 0;
        overflow-x: hidden;
        @include mixin.scrollbar;
      }

      .ant-layout-content {
        width: auto !important;
        padding: 15px;
        overflow-x: hidden;
        @include mixin.scrollbar;

        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }
      }

      .ant-menu:focus-visible {
        outline: none;
      }

      .ant-menu-item,
      .ant-menu-submenu-title {
        width: 100%;
        margin: 4px 0;
        border-radius: 0;
      }
      .ant-menu-item {
        outline: none !important;
      }
    }
  }
}
</style>
