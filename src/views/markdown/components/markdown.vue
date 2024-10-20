<template>
  <div :class="$style.markdown">
    <div v-if="html" class="markdown">
      <div v-html="html" class="markdown-body" />
    </div>
    <Empty v-else />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Empty } from "ant-design-vue";
import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/github.css";

hljs.highlightAll();

const props = withDefaults(defineProps<{ text: string | null }>(), {
  text: "",
});

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";

      return hljs.highlight(code, { language }).value;
    },
  })
);

const html = computed(() => props.text && marked.parse(props.text));
</script>
<style module lang="scss">
@use "@/styles/mixin.scss";

.markdown {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  :global {
    .ant-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      height: 100%;
    }
    .markdown {
      height: 100%;
      padding: 20px;
      background: #fff;
      @include mixin.scrollbar;
    }
  }
}
</style>
