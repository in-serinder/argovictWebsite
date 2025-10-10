<template>
    <div class="blogPage">



        <!-- 博客栏 -->
        <div class="blogBar">
            <!-- 无搜索结果占位 -->
            <div v-if="search_flag">
                <!-- <p>{{ $t('message.no_search_result') }}</p> -->
                <NoSearchResult />
            </div>
            <div class="BlogOfOne" v-for="item in blogList" :key="item.date">
                <BlogOne :blog="item" @click="toPostDetail(item)" />
            </div>
        </div>
        <!-- 博客筛选栏 -->
        <div class="blogFilter">

            <BlogFilter :searchBlog="searchBlog" />
        </div>
        <!-- 博客详情 -->
        <!-- <div class="blogContainer"> -->
        <!-- <router-view></router-view> -->
        <!-- </div> -->


    </div>
</template>

<script setup lang="ts">
import '@/style/blogPage.css'
import BlogOne from '@/components/Blog/BlogOne.vue'
import BlogFilter from '@/components/Blog/BlogFilter.vue'
import NoSearchResult from '@/components/NoSearchResult.vue'
import type { BlogItem } from '@/interfance'
import { ref, onMounted, watch } from 'vue'

import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'

const router = useRouter()
const search_flag = ref(false)
const blogList: Ref<BlogItem[]> = ref([]);

const getContentFromServerStore = useGetContentFromServerStore()

// const blogID 


// 获取博客列表
// const getBlogList = async () => {
//     try {
//         const res = await axios.get(requestURL.value)
//         // console.log(res.data)
//         blogList.value = res.data.map((item: RawBlogItem) => ({
//             title: item.title,
//             date: item.date,
//             author: item.author,
//             ID: item.ID,
//             description: item.description,
//             image: item.heardImageURL,
//             View: item.View,
//             tags: item.tags ? JSON.parse(item.tags) : []
//         } as BlogItem));

//         blogList.value = blogList.value.sort((a, b) => {
//             return new Date(b.date).getTime() - new Date(a.date).getTime()
//         })

//         // console.log(blogList.value)
//     } catch (err) {
//         console.log(err)
//     }
// }






// 跳转详情页

const toPostDetail = (blog: BlogItem) => {
    // console.log(blog)
    router.push({
        name: 'blogDetail',
        params: {
            id: blog.ID
        }
    })
}

// 搜索结果后更改blogOne目标
const searchBlog = (Goalblog: BlogItem[]) => {

    blogList.value = Goalblog;

    if (Goalblog.length === 0) {
        search_flag.value = true;
    } else {
        search_flag.value = false;
    }
    // console.log(Goalblog)
}

onMounted(() => {
    getContentFromServerStore.getBlogList().then((res) => {
        blogList.value = res as BlogItem[]
    })
})



</script>