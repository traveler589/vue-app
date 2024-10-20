<template>
  <div :class="$style.markdown">
    <div :class="$style.toolbar">
      <input
        hidden
        ref="input"
        type="file"
        accept=".md"
        @change="handleChange"
      />
      <Button type="primary" @click="handleClick">选择MD文件</Button>
      <Button type="primary" :disabled="!text" @click="handleExport"
        >导出HTML</Button
      >
    </div>

    <markdown ref="md" :text="text" />
  </div>
</template>
<script setup lang="js">
import { ref, useTemplateRef } from "vue";
import { Button } from 'ant-design-vue';
import Markdown from "./components/markdown.vue";

const text = ref();
const md = useTemplateRef('md');
const inputRef = useTemplateRef('input');

const handleClick = () => {
  inputRef.value.click()
}
const handleChange = (e) => {
  const file = e.target.files[0];

  e.target.value = null

  if (!file) {
    return
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    text.value = e.target.result
  }

  reader.readAsText(file)
}

const handleExport = () => {
  fetch('/markdown.css').then(x => x.text()).then(style => {
    const markdown = document.querySelector('.markdown');
    const title = markdown.querySelector('h1').innerText

    const html = `<html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>${title}</title>
        <style>${style}</style>
      </head>
      <body>
        <div id="markdown">${markdown.innerHTML}</div>
      </body>
    </html>`;

    const el = document.createElement('a');
    const blob = new Blob([html]);

    el.href = URL.createObjectURL(blob);
    el.download = `${title}.html`;
    el.click();

    window.URL.revokeObjectURL(el.href);
  })
}
</script>
<style lang="scss" module>
.markdown {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #fff;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #d0d7de;
}

@media print {
}
</style>
