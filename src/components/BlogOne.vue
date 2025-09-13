<template>
    <div class="blogOne">

        <!-- 内容区 -->
        <div class="blogOne_content">
            <!-- 博客标题 -->
            <div class="blogOne_content_title">
                Blog One
            </div>
            <!-- 博客内容 -->
            <div class="blogOne_content_abstract">
                Blog One Content
            </div>
            <!-- 发布时间 -->
            <div class="blogOne_content_time"><img src="@/assets/svg/time.svg" alt="">2024-06-10</div>
            <!-- 标签 -->
            <div class="blogOne_content_tag">
                <BlogOnTags />
                <BlogOnTags />
            </div>
        </div>
        <!-- 头图 -->
        <div class="blogOne_header">
            <img src="@/assets/picture/Tired.jpg" alt="">
        </div>
    </div>

</template>


<script setup lang="ts">
import '@/style/Blog/blogOne.css'
import BlogOnTags from '@/components/BlogOnTags.vue'
</script>
