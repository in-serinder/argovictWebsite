<template>
    <div class="blogDetail" id="blogContainer">
        <div class="blogDetail-content-container">
            <!-- 标题 -->
            <div class="blogDetail_title">
                <h1>{{ blogAttribut?.title }}</h1>
            </div>
            <!-- 文章信息 -->
            <div class="blogDetail_info">
                <ul>
                    <!-- 作者 -->
                    <li><img src="@/assets/svg/user.svg" alt="user" v-if="blogAttribut?.author">Author: {{
                        blogAttribut?.author }}</li>
                    <!-- 发布时间 -->
                    <li><img src="@/assets/svg/time.svg" alt="user"> {{ blogAttribut?.date }}</li>
                    <!-- 字数 -->
                    <li><img src="@/assets/svg/word.svg" alt="user">Words: {{ blogAttribut?.wordCount }}</li>
                    <!-- 阅读量 -->
                    <li><img src="@/assets/svg/view.svg" alt="user">Views: {{ blogAttribut?.View }}</li>
                    <!-- 文章ID -->
                    <li><img src="@/assets/svg/id.svg" alt="user">:{{ blogAttribut?.ID }}</li>
                </ul>
            </div>
            <div class="divider_x"></div>
            <!-- 文章内容 -->
            <div class="blogDetail_content" id="blogcontent">
                <BlogMarkdown id="blogMarkdown" />
            </div>
            <!-- 标签 额外功能-->
            <div class="blogDetail_tags">
                <div class="blogDetail-tags-contrainer">
                    <div v-for="tag in tags" :key="tag">
                        <BlogOnTags :tag="tag" />
                    </div>
                </div>
                <div class="blogDetail-footer-f">
                    <img :src="darkModeStore.isDarkMode ? printLightIcon : printIcon" alt=""
                        @click="miscStore.printWindow('blogMarkdown')">
                    <span class="shareIcon" @click="miscStore.shareWebPage('shareIcon')"><img
                            :src="darkModeStore.isDarkMode ? shareLightIcon : shareIcon" alt=""></span>

                </div>
            </div>
            <!-- <div class="divider_x"></div> -->
            <!-- 评论 -->
            <div class="blogDetail_comments" id="commit">

                <!-- <h4>{{ $t('message.blog_comments') }}</h4>
                <div class="commit_continer">
                    <PageBuilding />
                </div> -->


            </div>
            <!-- 占位 -->
            <div class="placeholder"> </div>
        </div>
        <!-- 文章移动辅助 -->
        <BlogMoveAss />
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogDetial.css'
import 'artalk/Artalk.css'
import 'artalk/ArtalkLite.css'
import '@/style/Blog/blogCommit.css'

import 'katex/dist/katex.min.css'
import BlogMarkdown from '@/components/BlogMarkdown.vue'
import BlogMoveAss from '@/components/BlogMoveAss.vue'
import BlogOnTags from '@/components/BlogOnTags.vue'
// import PageBuilding from '@/components/PageBuilding.vue'
import { ref, onMounted, computed } from 'vue'

import { ArtalkKatexPlugin } from '@artalk/plugin-katex'
import { ArtalkAuthPlugin } from '@artalk/plugin-auth'
import axios from 'axios'
import Artalk, { type CommentData } from 'artalk'

import type { BlogItem } from '@/interfance'
import type { Ref } from 'vue'



import { useMiscStore } from '@/stores/misc'
import { useRoute } from 'vue-router'
import { useViewCountStore } from '@/stores/viewCount'
import { useDarkModeStore } from '@/stores/darkmode'


const viewCountStore = useViewCountStore()
const miscStore = useMiscStore()
const darkModeStore = useDarkModeStore()

// 单独转换tag
const tags: Ref<string[]> = computed(() => {
    if (Array.isArray(blogAttribut.value?.tags)) {
        return blogAttribut.value.tags as string[]
    }
    return blogAttribut.value ? JSON.parse(blogAttribut.value?.tags) : []
})





const blogAttribut: Ref<BlogItem | null> = ref(null);
const blogID: Ref<string> = ref('')
const route = useRoute()

declare module 'artalk' {
    export interface ArtalkConfig {
        plugins?: Array<(artalk: Artalk) => void>
    }
}

// declare module 'artalk' {
//     interface ArtalkConfig extends OriginalArtalkConfig {
//         plugins?: Plugin[];
//     }


const initArtalk = (() => {


    Artalk.init({
        el: document.getElementById('commit') as HTMLElement,
        // pageKey: `/blog/detail/${blogID.value}`,
        pageKey: window.location.pathname,
        pageTitle: blogAttribut.value?.title,
        // server: '/api',  //使用了vite代理 开发环境
        server: 'http://8.130.191.142', //生产环境
        site: 'blog',
        useBackendConf: true,
        plugins: [
            // @ts-ignore 
            ArtalkKatexPlugin,
            // @ts-ignore 
            ArtalkAuthPlugin
        ],
        avatarURLBuilder: (comment: CommentData) => {
            if (comment.email_encrypted) {
                return bfg;
            }
            // return comment.avatar;
        }

    })

    console.log("pa", window.location.pathname)



});




const getBlogDetail = async () => {
    try {
        const res = await axios.get(`http://8.130.191.142:6324/blog/info/${route.params.id}`)
        // console.log(res.data)
        // console.log("huoq", res)
        blogID.value = res.data.ID
        blogAttribut.value = res.data as BlogItem
        viewCountStore.addViewCount(blogID.value)
        // console.log('blogAttribut', blogAttribut.value)
        // console.log('tags', tags.value)

    } catch (err) {
        console.log(err)
    }
}





onMounted(() => {
    getBlogDetail()


    setTimeout(() => {
        initArtalk();
    }, 1500)




    //    viewCountStore.addViewCount



})


// 图片引入
import printIcon from '@/assets/svg/print.svg'
import printLightIcon from '@/assets/svg/light/print_light.svg'
import shareIcon from '@/assets/svg/share.svg'
import shareLightIcon from '@/assets/svg/light/share_light.svg'
import bfg from '@/assets/picture/default_avatar_alpha.jpg.png'



</script>
