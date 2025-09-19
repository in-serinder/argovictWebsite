<template>
    <div class="blogDetail" id="blogContainer">
        <div class="blogDetail-content-container">
            <!-- 标题 -->
            <div class="blogDetail_title">
                <h1>Post Title</h1>
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
                    <li><img src="@/assets/svg/word.svg" alt="user">Words: {{ blogAttribut?.description?.length }}</li>
                    <!-- 阅读量 -->
                    <li><img src="@/assets/svg/view.svg" alt="user">Views: {{ blogAttribut?.View }}</li>
                    <!-- 文章ID -->
                    <li><img src="@/assets/svg/id.svg" alt="user">:{{ blogAttribut?.ID }}</li>
                </ul>
            </div>
            <div class="divider_x"></div>
            <!-- 文章内容 -->
            <div class="blogDetail_content" id="blogcontent">
                <BlogMarkdown />
            </div>
            <!-- 标签 -->
            <div class="blogDetail_tags">
                <div class="tagFilter_content_item">
                    <!-- <BlogOnTags v-for="tag in blogAttribut?.tags" :key="tag" :tag="tag" /> -->
                </div>



            </div>
            <div class="divider_x"></div>
            <!-- 评论 -->
            <div class="blogDetail_comments">
                <h4>{{ $t('message.blog_comments') }}</h4>
                <div class="commit_continer">
                    <PageBuilding />
                </div>
            </div>
            <!-- 占位 -->
            <div class="placeholder"> 占位</div>
        </div>
        <!-- 文章移动辅助 -->
        <BlogMoveAss />
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogDetial.css'
import BlogMarkdown from '@/components/BlogMarkdown.vue'
import BlogMoveAss from '@/components/BlogMoveAss.vue'
import BlogOnTags from '@/components/BlogOnTags.vue'
import PageBuilding from '@/components/PageBuilding.vue'
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import type { BlogItem, RawBlogItem } from '@/interfance'






const Loading: Ref<boolean> = ref(true);
const blogAttribut: Ref<BlogItem | null> = ref(null);
const blogID: Ref<string> = ref('')
const route = useRoute()


const blogAttribut_requestURL: Ref<string> = ref(`http://8.130.191.142:6324/blog/info/`);




const getBlogDetail = async () => {
    try {
        const res = await axios.get(blogAttribut_requestURL.value + route.params.id)
        // console.log(res.data)
        // console.log("huoq", res)
        blogID.value = res.data.ID
        blogAttribut.value = res.data as BlogItem
        addViewCount(blogID.value)

    } catch (err) {
        console.log(err)
    }
}



const addViewCount = async (id: string) => {
    if (!id) return
    try {
        console.log('addViewCount', id)
        await axios.get(`http://8.130.191.142:6324/blog/count/view/${id}`)
    } catch (error) {
        console.error('Failed to add view count', error)
    }
}




onMounted(() => {
    getBlogDetail()
    //    viewCountStore.addViewCount



})


</script>
