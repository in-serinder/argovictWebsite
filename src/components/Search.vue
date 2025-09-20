<template>
    <div class="search">

        <span class="searchInput">
            <input id="search-input" type="text" v-model="searchContent" :placeholder="$t('message.search')">
            <img src="@/assets/svg/search.svg" alt="">
        </span>

        <!-- 搜索结果 -->
        <span>
            <!-- <span>依据{{}}</span> -->
        </span>

        <button @click="searchAssociate">{{ $t('message.search') }}</button>

    </div>
</template>

<script setup lang="ts">
import '@/style/Componets/search.css'
import { ref, defineProps, watch } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios';
import type { RawBlogItem, BlogItem, SearchResult } from '@/interfance';

const searchResult: Ref<SearchResult | null> = ref(null);

const searchContent = ref('');

const { searchBlog, getSearchResult } = defineProps({
    searchBlog: {
        type: Function,
        default: () => { }
    },
    getSearchResult: {
        type: Function,
        default: () => { }
    }
})

// 发送搜索请求
const getBlogBySearch = async (searchContent: string) => {
    try {
        const res = await axios.get(`http://8.130.191.142:6324/blog/search/${searchContent}`)
        console.log(res.data)
        searchResult.value = res.data;
        const resultData = res.data.results.map((item: RawBlogItem) => ({
            title: item.title,
            date: item.date,
            author: item.author,
            ID: item.ID,
            description: item.description,
            image: item.heardImageURL,
            View: item.View,
            tags: item.tags ? JSON.parse(item.tags) : []
        } as BlogItem));
        // 搜索结果后更改blogOne目标
        searchBlog(resultData);
        // console.log(resultData)
        // console.log(searchResult.value)
        // search组件本地用传到上层显示搜索结果
        getSearchResult(searchResult.value);

    } catch (err) {
        console.log(err)
    }
}


// 搜索关联及样式
const searchAssociate = (() => {
    if (searchContent.value) {
        // console.log(searchContent.value)
        getBlogBySearch(searchContent.value);
    } else {
        const searchInput: HTMLInputElement | null = document.getElementById('search-input') as HTMLInputElement
        if (searchInput) {
            // console.log('searchInput', searchInput)
            searchInput.style.animation = 'vibrateVertial 0.3s ease-in-out'
            setTimeout(() => {
                searchInput.style.animation = 'none'
            }, 500)
        }
    }
});


// watch(searchContent, (newVal, oldVal) => {
//     console.log('searchContent', newVal, oldVal);
// })

</script>