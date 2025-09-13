<template>
    <div class="blogMarkdown">
        <div v-html="currentHTML"></div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogMarkdown.css'
import hljs from 'highlight.js';
// import '@/style/github-markdown.min.css'
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import mdHighlight from 'markdown-it-highlightjs';
import { ref, onMounted, computed, watch } from 'vue';


const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
}).use(mdHighlight, {
    hljs: hljs
});  //解析器


const md = ref(`# 123 `);

const markdown = ref('');


const currentHTML = computed(() => {
    return mdParser.render(md.value);
});


watch(
    () => md.value,
    (newValue) => {
        markdown.value = mdParser.render(newValue);
    },
    { immediate: true } // 初始化时立即执行一次
);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/', {
            responseType: 'text'
        });
        md.value = response.data;
        console.log('获取到的内容:', md.value);
    } catch (error) {
        console.error('请求失败:', error);
        md.value = '# 加载失败\n\n无法获取内容';
    }
});
</script>


<style></style>