<template>
    <div class="blogPage">

        <div class="blog-loading">
            <img src="@/assets/media/oiia.gif"></img>
            <h2>{{ $t('message.loading') }}...</h2>
        </div>

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



            <!-- <div class="BlogOfOne" v-for="item in blogList" :key="item.date">
                <BlogOne :blog="item" @click="toPostDetail(item)" />
            </div> -->
            <div class="blog-holder "></div>
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
import type { BlogItem } from '@/interface'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { useMiscStore } from '@/stores/misc'
import { useRouter } from 'vue-router'
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'
import { nextTick } from 'process'

const router = useRouter()
const search_flag = ref(false)
const blogList: Ref<BlogItem[]> = ref([]);

const getContentFromServerStore = useGetContentFromServerStore()
const loadingStore = useLoadingStore()
const miscStore = useMiscStore()

document.title = 'Argovict - Blog'


// 初始化加载状态
// loadingStore.reset()
// loadingStore.initTotalImage()
// loadingStore.loadingListen()
// const blogID = ref('')


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

        nextTick(() => {
            const blogContainer = document.querySelector('.blogPage') as HTMLElement
            loadingStore.initTotalImage(blogContainer)
            console.log(loadingStore.totalImage)



        })
    })


})



// onUnmounted(() => {
//     loadingStore.reset()
// })

watch(() => loadingStore.loaded, (newVal) => {
    if (newVal) {

        console.log('图片加载', loadingStore.loaded)
    }
})

watch(() => loadingStore.allLoaded, (newVal) => {
    if (newVal) {
        // 动画加载内容
        setTimeout(() => {
            miscStore.blogListLoadAnimation()
        }, 500)
    }
})


</script>