<template>
  <ConfigProvider :locale="zhCN">
    <router-view />
  </ConfigProvider>
</template>
<script setup>
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
