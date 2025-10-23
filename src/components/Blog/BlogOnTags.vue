<template>
    <div class="blogOne_content_tag" @click="searchByTag(tag)">
        <img src="@/assets/svg/tag.svg" alt="tag">
        <span>{{ tag }}</span>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogTags.css'
import { defineProps } from 'vue'
import { useGetDataByServerStore } from '@/stores/getdatabyserver'

const getDataByServerStore = useGetDataByServerStore()

const searchByTag = (tag: string) => {
    // window.location.href = `/blog/tags/${tag}`
    getDataByServerStore.getBlogBySearch(tag.replace(/[(),0-9]/g, ''))
}







const { tag } = defineProps<{
    tag: string
}>()











</script>