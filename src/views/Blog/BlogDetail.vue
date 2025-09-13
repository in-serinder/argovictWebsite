<template>
    <div class="blogDetail">
        <!-- 标题 -->
        <div class="blogDetail_title">
            <h1>Post Title</h1>
        </div>
        <!-- 文章信息 -->
        <div class="blogDetail_info">
            <ul>
                <!-- 作者 -->
                <li><img src="@/assets/svg/user.svg" alt="user">Author</li>
                <!-- 发布时间 -->
                <li><img src="@/assets/svg/time.svg" alt="user">2025-9-13</li>
                <!-- 字数 -->
                <li><img src="@/assets/svg/word.svg" alt="user">Words: 1000</li>
                <!-- 阅读量 -->
                <li><img src="@/assets/svg/view.svg" alt="user">Views: 1000</li>
                <!-- 文章ID -->
                <li><img src="@/assets/svg/id.svg" alt="user">:1000</li>
            </ul>
        </div>
        <div class="divider_x"></div>
        <!-- 文章内容 -->
        <div class="blogDetail_content">
            <BlogMarkdown />
        </div>
        <!-- 标签 -->
        <div class="blogDetail_tags">
        </div>
        <!-- 评论 -->
        <div class="blogDetail_comments">
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogDetial.css'
import BlogMarkdown from '@/components/BlogMarkdown.vue'


</script>
