<template>
    <div class="blogMoveAss">
        <ul>
            <!-- 顶部 -->
            <li @click="scrollToTop">
                <img src="@/assets/svg/top.svg" alt="top">
            </li>
            <!-- 刷新 -->
            <li @click="refresh">
                <img src="@/assets/svg/refresh.svg" alt="refresh">
            </li>
            <!-- 博客页 -->
            <li @click="goToBlog">
                <img src="@/assets/svg/home2.svg" alt="blog">
            </li>
            <!-- 底部 -->
            <li @click="scrollToBottom">
                <img src="@/assets/svg/bottom.svg" alt="bottom">
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogMoveass.css'
import { ref, onMounted } from 'vue'

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {

    container.value = document.getElementById('blogContainer') as HTMLDivElement | null;

    if (!container.value) {
        console.error('未找到id为blogContainer的元素，请检查选择器是否正确');

        console.log('当前页面中所有id元素:', document.querySelectorAll('[id]'));
    }
});


// const container = document.getElementById('blogContainer');

const scrollToTop = () => {
    container.value?.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // console.log(document.getElementById('blogContainer').clientHeight)
};

const scrollToBottom = () => {
    container.value?.scrollTo({
        top: container.value.scrollHeight,
        behavior: 'smooth'
    });
};
const refresh = () => {
    window.location.reload();
};

const goToBlog = () => {
    window.location.href = '/blog';
};

</script>
