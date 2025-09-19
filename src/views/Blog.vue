<template>
    <div class="blogPage">
        <!-- 博客栏 -->
        <div class="blogBar">
            <div class="BlogOfOne" v-for="item in blogList" :key="item.ID">
                <BlogOne :blog="item" @click="toPostDetail(item)" />
            </div>
        </div>
        <!-- 博客筛选栏 -->
        <div class="blogFilter">
            <BlogFilter />
        </div>
        <!-- 博客详情 -->
        <!-- <div class="blogContainer"> -->
        <!-- <router-view></router-view> -->
        <!-- </div> -->


    </div>
</template>

<script setup lang="ts">
import '@/style/blogPage.css'
import BlogOne from '@/components/BlogOne.vue'
import BlogFilter from '@/components/BlogFilter.vue'
import type { BlogItem, RawBlogItem } from '@/interfance'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

const requestURL: Ref<string> = ref('http://8.130.191.142:6324/master/info/tables/post');
const blogList: Ref<BlogItem[]> = ref([]);
// const blogID 

const getBlogList = async () => {
    try {
        const res = await axios.get(requestURL.value)
        console.log(res.data)
        blogList.value = res.data.map((item: RawBlogItem) => ({
            title: item.title,
            date: item.date,
            author: item.author,
            ID: item.ID,
            description: item.description,
            image: item.heardImageURL,
            View: item.View,
            tags: item.tags ? JSON.parse(item.tags) : []
        } as BlogItem));

        console.log(blogList.value)
    } catch (err) {
        console.log(err)
    }
}




onMounted(() => {
    getBlogList()
})


// 跳转详情页
const router = useRouter()
const toPostDetail = (blog: BlogItem) => {
    console.log(blog)
    router.push({
        name: 'blogDetail',
        params: {
            id: blog.ID
        }
    })
}




</script>