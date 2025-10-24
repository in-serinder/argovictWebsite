<template>
    <div class="blogPage">

        <div class="blog-loading">
            <img src="@/assets/media/oiia.gif">
            <h2>{{ $t('message.loading') }}...</h2>
        </div>

        <!-- 博客栏 -->
        <div class="blogBar">
            <!-- 无搜索结果占位 -->
            <div v-if="noSearch_flag">
                <!-- <p>{{ $t('message.no_search_result') }}</p> -->
                <NoSearchResult />
            </div>
            <div class="BlogOfOne" v-for="item in blogList" :key="item.date">
                <BlogOne :blog="item" @click="toPostDetail(item)" />

            </div>



            <!-- <div class="BlogOfOne" v-for="item in blogList" :key="item.date">
                <BlogOne :blog="item" @click="toPostDetail(item)" />
            </div> -->
            <!-- 萌娘计数器 -->
            <div class="blog-view-moe-counter" v-show="!noSearch_flag"></div>
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
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { useMiscStore } from '@/stores/misc'
import { useRouter } from 'vue-router'
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'
import { useGetDataByServerStore } from '@/stores/getdatabyserver'
import { useMoeCounterGirlStore } from '@/stores/moeCounterGirl'
import { nextTick } from 'process'


const router = useRouter()
const noSearch_flag = ref(false)
const blogList: Ref<BlogItem[]> = ref([]);

const getDataByServerStore = useGetDataByServerStore()
const getContentFromServerStore = useGetContentFromServerStore()
const moeCounterGirlStore = useMoeCounterGirlStore()
const loadingStore = useLoadingStore()
const miscStore = useMiscStore()


document.title = 'Argovict - Blog'






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
        // 无搜索结果占位
        noSearch_flag.value = true;
    } else {
        noSearch_flag.value = false;
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

            // 初始化萌娘计数器
            // console.log(moeCounterGirlStore.getImageListByDigital(15232))
            let viewCount = 0;
            for (let i = 0; i < blogList.value.length; i++) {
                const element = blogList.value[i];
                viewCount += element.View;
            }
            moeCounterGirlStore.initMoeCounterGirl(document.querySelector('.blog-view-moe-counter') as HTMLElement)
            moeCounterGirlStore.getImageListByDigital(viewCount)
            moeCounterGirlStore.createCounterWidget()


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

// 通过标签搜索的另一种实现,另一种于getDataByServerStore数据同步，但可能出现冲突
watch(() => getDataByServerStore.blogList, (newVal) => {

    // 优先处理搜索结果
    if (getDataByServerStore.searchResult.total === 0) {
        noSearch_flag.value = true
        blogList.value = []
        return
    }


    if (newVal) {
        blogList.value = newVal
        // console.log('通过标签搜索的另一种实现', newVal)
        noSearch_flag.value = false
    }
})

</script>