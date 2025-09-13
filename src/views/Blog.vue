<template>
    <div class="blogPage">
        <!-- 博客栏 -->
        <div class="blogBar">
            <div class="BlogOfOne">
                <BlogOne />
            </div>
        </div>
        <!-- 博客筛选栏 -->
        <div class="blogFilter">
            <BlogFilter />
        </div>
        <!-- 博客详情 -->
        <div class="blogContainer">
            <router-view></router-view>
        </div>

    </div>
</template>

<script setup lang="ts">
import '@/style/blogPage.css'
import BlogOne from '@/components/BlogOne.vue'
import BlogFilter from '@/components/BlogFilter.vue'
</script>