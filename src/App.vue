<template>
  <x6 v-if="edit" />
  <x6-view v-else />
</template>
<script setup>
import { ref } from "vue";
import X6 from "./components/x6.vue";
import X6View from "./components/x6-view.vue";

const edit = ref(true);
</script>
