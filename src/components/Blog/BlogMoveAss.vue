<template>
    <div class="blogMoveAss">
        <ul>
            <!-- 顶部 -->
            <li @click="scrollToTop">
                <img :src="darkMode.isDarkMode? top_light:top"  alt="top">
            </li>
            <!-- 刷新 -->   
            <li @click="refresh">
                <img :src="darkMode.isDarkMode? refreshicon_light:refreshicon" alt="refresh">
            </li>
            <!-- 博客页 -->
            <li @click="goToBlog">
                <img :src="darkMode.isDarkMode? home_light:home" alt="blog">
            </li>
            <!-- 底部 -->
            <li @click="scrollToBottom">
                <img :src="darkMode.isDarkMode? bottom_light:bottom" alt="bottom">
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogMoveass.css'
import { ref, onMounted } from 'vue'
import { useDarkModeStore } from '@/stores/darkmode';

const container = ref<HTMLDivElement | null>(null);

const darkMode = useDarkModeStore();
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

import top from "@/assets/svg/top.svg";
import refreshicon from "@/assets/svg/refresh.svg";
import home from "@/assets/svg/home2.svg";
import bottom from "@/assets/svg/bottom.svg";

import top_light from "@/assets/svg/light/top_light.svg";
import refreshicon_light from "@/assets/svg/light/refresh_light.svg";
import home_light from "@/assets/svg/light/home_light.svg";
import bottom_light from "@/assets/svg/light/bottom_light.svg";

</script>
