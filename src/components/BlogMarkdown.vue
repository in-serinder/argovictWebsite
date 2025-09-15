<template>
    <div class="blogMarkdown" id="blogMarkdown">
        <div v-html="currentHTML" class="blogMarkdown_content"></div>
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
import { ref, onMounted, computed, watch, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Renderer from 'markdown-it/lib/renderer.mjs';
import { has } from 'markdown-it/lib/common/utils.mjs';
// import router from '@/router';
// import { hash } from 'v-calendar/dist/types/src/utils/helpers.js';

const dynamicContent = ref<string[]>([]);



const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            return `<pre><code class="hljs language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        } else {
            return `<pre><code class="hljs">${str}</code></pre>`;
        }
    }
    // 其余配置
}).use(mdHighlight, {
    hljs: hljs
}).use(anchor, {
    slugify: (str) => {

        str = str.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        // console.log(str);
        return str;
    }
});


const md = ref(`# test `);

const markdown = ref('');

const route = useRoute();
/*
渲染器修改
*/
// const originalFence = mdParser.renderer.rules.fence as (...args: any[]) => string;

const imageRender = mdParser.renderer.rules.image; //图片
const codeline = mdParser.renderer.rules.code_inline;
const codeblock = mdParser.renderer.rules.fence;







// 图片
mdParser.renderer.rules.image = (tokens, idx, options, env, self) => {
    const image_ele = imageRender ? imageRender(tokens, idx, options, env, self) : '';

    const altText = tokens[idx].content || 'image';
    // return `<img src="${src}" alt="${alt}" />`;
    return `<div class = "markdown-image-container" data-alt="${altText}">${image_ele}<span>${altText}<span></div>` //还得自己包裹，真傻逼
};

// 行内代码
mdParser.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const code_ele = codeline ? codeline(tokens, idx, options, env, self) : '';

    return `<span class="inline-code">${code_ele}</span>`;
};


// 代码块
mdParser.renderer.rules.code_block = (tokens, idx, options, env, self) => {
    const codeblock_ele = codeblock ? codeblock(tokens, idx, options, env, self) : '';
    // const token = tokens[idx];
    // const lang = token.info ? token.info.trim() : 'plaintext';

    // token.attrJoin('class', 'code-block');

    // token.attrSet('data-lang', lang);

    // // 代码块html
    // console.log(lang)


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

/*描点相关start*/

// 滚动到指定锚点
const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g;
const englishRegex = /-([a-z])/g;
const scrollToAnchor = (hash: string) => {
    // 
    const container = document.getElementById('blogContainer');

    // container.value?.scrollTo({
    //     // top: 0,
    //     // behavior: 'smooth'
    // });

    if (!hash) {
        return;
    }

    const targetID = hash
        .replace('#', '')
        .replace(chineseRegex, '')
        .replace(englishRegex, (match, p1) => '-' + p1.toUpperCase());
    // console.log(targetID);

    // 目标id为描点终点，
    const targetElement = document.getElementById(targetID);
    if (targetElement) {
        // targetElement.scrollIntoView({
        //     block: 'start',
        //     behavior: 'smooth'
        // });
        container?.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        })
    }
}

const handleAnchorClick = (e: MouseEvent) => {
    const targetElement = e.target as Element | null;

    const target = targetElement?.closest('a[href^="#"]'); // 匹配以#开头的链接
    if (target) {
        e.preventDefault(); // 阻止默认跳转（避免路由刷新）
        const hash = target.getAttribute('href');
        // 更新URL的hash（会触发上面的watch）
        window.location.hash = String(hash);
    }
};


/*描点相关end*/

// const container = document.querySelector('.blogDetail_content');
// 高度修复
const fixHeight = () => {
    // const contentRef = document.getElementById('blogMarkdown')
    // const containerRef = document.getElementById('blogcontent')


    // console.log('markdown高度', contentRef.clientHeight);
    // console.log('content高度', containerRef.clientHeight);
    // // console.log('cha', containerRef?.clientHeight + contentRef?.clientHeight)
    // // containerRef.style.height = `${contentRef?.clientHeight + 500}px`;//预留1000

    // containerRef.style.height = '5000px';
    // console.log('调整高度', containerRef.clientHeight);
}



/*监听相关start*/

watch(() => route.hash, (newHash) => {
    scrollToAnchor(newHash);

}, {
    immediate: true
});




watch(
    () => md.value,
    (newValue) => {
        markdown.value = mdParser.render(newValue);

    },
    { immediate: true }
);



watch(
    () => currentHTML.value,
    (newValue) => {
        // markdown.value = mdParser.render(newValue);
        // scrollToAnchor(route.hash);
        nextTick(() => {
            scrollToAnchor(route.hash); // shabi

            nextTick(() => {
                console.log('加载md');
                fixHeight();
            })
        });
    },
    { immediate: true }
);

/*监听相关end*/


onMounted(async () => {
    // containerRef.value = document.getElementById('blogContainer');


    // 测试
    try {
        const response = await axios.get('http://localhost:8000/', {
            responseType: 'text'
        });
        md.value = response.data;
        // console.log('获取到的内容:', md.value);
        // 载入界面

        // 添加锚点点击事件监听
        document.addEventListener('click', handleAnchorClick);

    } catch (error) {
        console.error('请求失败:', error);
        md.value = '# 加载失败\n\n无法获取内容';
    }
});

onUnmounted(() => {
    // 移除事件监听
    document.removeEventListener('click', handleAnchorClick);
});

</script>


<style></style>