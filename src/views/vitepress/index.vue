<template>
  <div :class="$style.vitepress">
    <div :class="$style.toolbar">
      <input
        hidden
        ref="input"
        type="file"
        accept=".css,.html"
        @change="handleChange"
      />
      <div>
        <!-- <Button type="primary" @click="handleClick">选择html文件</Button> -->
        <Button type="primary" @click="handleClick">选择css文件</Button>
      </div>
      <Button type="primary" :disabled="!text" @click="handleExport"
        >导出HTML</Button
      >
    </div>

    <!-- <div :class="$style.preview">{{}}</div> -->
  </div>
</template>
<script setup lang="js">
import { ref, useTemplateRef } from "vue";
import { Button } from 'ant-design-vue';
// import Markdown from "./components/markdown.vue";

const text = ref({});
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
    if (file.name.endsWith('.css')) {
      text.value.style = e.target.result.replace(/@font-face{[\s\S]*?}/g, '');
    }
    /* else {
      const div = document.createElement('div');

      div.innerHTML = e.target.result;

      text.value.title = file.name.replace(/\.\w+$/, '');

      text.value.body = div.querySelector('#VPContent').innerHTML.replace(/<!--[\s\S]*?-->/g, '');
    } */
  }

  const url = '/docs/markdown-examples.html'

  fetch(url).then(r => r.text()).then(html => {
    const div = document.createElement('div');

    div.innerHTML = html;

    text.value.title = url.split('/').pop().replace(/\.\w+$/, '');

    text.value.body = div.querySelector('#VPContent').innerHTML.replace(/<!--[\s\S]*?-->/g, '');

    console.log(text.value)
  })

  reader.readAsText(file)
}

const handleExport = () => {
  const { body, style, title } = text.value;


  const html = `<html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>${title}</title>
        <style>${style}</style>
      </head>
      <body>${body}</body>
    </html>`;

    const el = document.createElement('a');
    const blob = new Blob([html]);

    el.href = URL.createObjectURL(blob);
    el.download = `${title}.html`;
    el.click();

    window.URL.revokeObjectURL(el.href);
}
</script>
<style lang="scss" module>
.vitepress {
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
  button + button {
    margin-left: 20px;
  }
}
</style>
