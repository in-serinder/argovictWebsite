<template>
    <div class="blogMarkdown" id="blogMarkdown">
        <div v-html="currentHTML" class="blogMarkdown_content"></div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogMarkdown.css'
import axios from 'axios';
import { ref, onMounted, computed, watch, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

import { useScrollStore } from '@/stores/scroll';
import { userMarkDownFucker } from '@/stores/markdown-it_fucker';



const scrollStore = useScrollStore();
const mdFucker = userMarkDownFucker();








const md = ref(`# Page Loading `);

const markdown = ref('');

const route = useRoute();









const currentHTML = computed(() => {
    return mdFucker.mdParser.render(md.value);
});




/*监听相关start*/

watch(() => route.hash, (newHash) => {
    scrollStore.scrollToAnchor(newHash);
    // mdFucker.scrollToHash(newHash);
    // console.log('hash', newHash);

}, {
    immediate: true
});




watch(
    () => md.value,
    (newValue) => {
        markdown.value = mdFucker.mdParser.render(newValue);

    },
    { immediate: true }
);



watch(
    () => currentHTML.value,
    (newValue) => {
        // markdown.value = mdParser.render(newValue);
        // scrollToAnchor(route.hash);
        nextTick(() => {
            scrollStore.scrollToAnchor(route.hash); // shabi

            nextTick(() => {
                console.log('加载md');

            })
        });
    },
    { immediate: true }
);

/*监听相关end*/


onMounted(async () => {
    // containerRef.value = document.getElementById('blogContainer');
    mdFucker.reParseMarkDown()
    mdFucker.rebuildMarkdownTitleToID()

    // 测试
    try {
        const response = await axios.get('http://8.130.191.142:6324/blog/markdown/' + route.params.id, {
            responseType: 'text'
        });

        md.value = response.data;
        // console.log('获取到的内容:', md.value);
        // 载入界面

        // 添加锚点点击事件监听
        document.addEventListener('click', scrollStore.handleAnchorClick);

    } catch (error) {
        console.error('请求失败:', error);
        md.value = '# 加载失败\n\n无法获取内容';
    }
});

onUnmounted(() => {
    // 移除事件监听
    document.removeEventListener('click', scrollStore.handleAnchorClick);
});

</script>


<style></style>