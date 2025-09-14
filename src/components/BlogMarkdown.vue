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
import anchor from 'markdown-it-anchor';
import { ref, onMounted, computed, watch } from 'vue';
import Renderer from 'markdown-it/lib/renderer.mjs';


const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
}).use(mdHighlight, {
    hljs: hljs
}).use(anchor, {
    slugify: (str) => {
        return str
            .replace(/[^\w\s-]/g, '') //连字符
            .replace(/\s+/g, '-'); //语法字符
    }
});


const md = ref(`# test `);

const markdown = ref('');
/*
渲染器修改
*/
const originalFence = mdParser.renderer.rules.fence as (...args: any[]) => string;

const imageRender = mdParser.renderer.rules.image; //图片
const codeline = mdParser.renderer.rules.code_inline;
const codeblock = mdParser.renderer.rules.fence;







// 图片
mdParser.renderer.rules.image = (tokens, idx, options, env, self) => {
    const image_ele = imageRender(tokens, idx, options, env, self);

    const altText = tokens[idx].content || 'image';
    // return `<img src="${src}" alt="${alt}" />`;
    return `<div class = "markdown-image-container" data-alt="${altText}">${image_ele}<span>${altText}<span></div>` //还得自己包裹，真傻逼
};

// 行内代码
mdParser.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const code_ele = codeline(tokens, idx, options, env, self);

    return `<span class="inline-code">${code_ele}</span>`;
};


// 代码块
mdParser.renderer.rules.code_block = (tokens, idx, options, env, self) => {
    const codeblock_ele = codeblock(tokens, idx, options, env, self);

    return `<div class="code-block"><div class="code-block-title"></div> ${codeblock_ele} </div>`;
};
// 表格 拼装

mdParser.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    token.attrJoin('class', 'custom-table');

    const tableOpenTag = `<table${self.renderAttrs(token)}>`;

    return `<div class="table-container">${tableOpenTag}`;
};


mdParser.renderer.rules.table_close = function (tokens, idx, options, env, self) {

    return `</table></div>`;
};


mdParser.renderer.rules.th_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    token.attrJoin('class', 'table-header-cell');

    return `<th${self.renderAttrs(token)}>`;
};

//添加类名 + 对齐处理（逻辑不变）
mdParser.renderer.rules.td_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    token.attrJoin('class', 'table-data-cell');

    const align = token.attrGet('align');
    if (align) {
        token.attrJoin('class', `align-${align}`);
    }

    return `<td${self.renderAttrs(token)}>`;
};




const tokens = mdParser.parse('| Header |\n| ------ |\n| Cell   |', {});
console.log(tokens.map(t => ({ type: t.type, tag: t.tag, attrs: t.attrs })));

const currentHTML = computed(() => {
    return mdParser.render(md.value);
});


// 启用监听
watch(
    () => md.value,
    (newValue) => {
        markdown.value = mdParser.render(newValue);
    },
    { immediate: true }
);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/', {
            responseType: 'text'
        });
        md.value = response.data;
        // console.log('获取到的内容:', md.value);
    } catch (error) {
        console.error('请求失败:', error);
        md.value = '# 加载失败\n\n无法获取内容';
    }
});
</script>


<style></style>