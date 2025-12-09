<template>
    <div class="blogOne">

        <!-- 内容区 -->
        <div class="blogOne_content">
            <!-- 博客标题 -->
            <div class="blogOne_content_title">
                {{ blog.title }}
            </div>
            <!-- 博客内容 -->
            <div class="blogOne_content_abstract">
                {{ miscStore.adjustBlogTitleLength(blog.description, 200) }}
            </div>
            <!-- 发布时间 -->
            <div class="blogOne_content_time"><img src="@/assets/svg/time.svg" alt="">{{ blog.date }}</div>
            <!-- 标签 -->
            <div class="blogOne_content_tag">
                <BlogOnTags v-for="tag in blog.tags" :key="tag" :tag="tag" :bgColor="miscStore.getRandomColor()" />
            </div>
        </div>
        <!-- 头图 -->
        <div class="blogOne_header">
            <img :src="blog.image ? blog.image : '@/assets/picture/Tired.jpg'" alt="">
            <!-- <img v-lazy="blog.image ? blog.image : '@/assets/picture/Tired.jpg'" alt=""> -->
        </div>
    </div>

</template>


<script setup lang="ts">
import '@/style/Blog/blogOne.css'
import BlogOnTags from '@/components/Blog/BlogOnTags.vue'
import type { BlogItem } from '@/interface'
import { defineProps } from 'vue'
import { useMiscStore } from '@/stores/misc'
// import { useTagStore } from '@/stores/tag'


// const tagStore = useTagStore()
const miscStore = useMiscStore()
const { blog } = defineProps<{
    blog: BlogItem
}>()

// tag需要解析
// const parseTags = computed(() => {
//     try {
//         const tags = JSON.parse(blog.tags);
//         return Array.isArray(tags) ? tags : [];
//     } catch (error) {
//         console.log(error)
//         return [];
//     }
// })





</script>
