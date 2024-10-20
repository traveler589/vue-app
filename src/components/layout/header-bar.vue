<template>
  <Header>
    <!-- <TransitionGroup name="breadcrumb" :class="$style.breadcrumb" tag="ul"> -->
    <ul :class="$style.breadcrumb">
      <li
        v-for="({ name, path, title }, index) of items"
        :key="name"
        class="breadcrumb-item"
      >
        <span v-if="index" class="breadcrumb-separator">/</span>
        <span class="breadcrumb-title">
          <router-link v-if="path" :to="path">
            {{ title }}
          </router-link>
          <span v-else>{{ title }}</span>
        </span>
      </li>
    </ul>
    <!-- </TransitionGroup> -->
  </Header>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Layout } from "ant-design-vue";

const route = useRoute();
const { Header } = Layout;

// 面包屑数据
const items = computed(() => {
  const matched = route.matched.slice(1);

  return matched.map(({ name, meta, path, children }, index) => ({
    name,
    title: meta.title,
    path: !children.length && index < matched.length - 1 ? path : null,
  }));
});
</script>
<style module lang="scss">
$offset: 10px;

.breadcrumb {
  display: flex;
  align-items: center;
  line-height: 24px;
  color: rgb(0 0 0 / 45%);
  cursor: default;

  a {
    display: inline-block;

    &:hover {
      color: #1677ff;
    }

    &:active {
      color: #0958d9;
    }
  }

  :global {
    .breadcrumb-title {
      transition: color 0.2s linear;
    }

    .breadcrumb-separator {
      margin: 0 $offset;
    }

    .breadcrumb-item:last-child {
      .breadcrumb-title {
        color: rgb(0 0 0 / 88%);
      }
    }

    // .breadcrumb-enter {
    //   opacity: 0;
    //   transform: translateX(-$offset);
    // }

    // .breadcrumb-leave,
    // .breadcrumb-enter-active {
    //   opacity: 1;
    //   transform: none;
    // }

    // .breadcrumb-leave-active {
    //   opacity: 0;
    //   transform: translateX($offset);
    // }

    // /* 离开不用动画 */

    // .breadcrumb-leave-active,
    // .breadcrumb-enter-active {
    //   transition: all 0.2s ease-out;
    // }
  }
}
</style>
