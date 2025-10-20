<template>
    <div class="search">

        <span class="searchInput">
            <input id="search-input" type="text" v-model="searchContent" :placeholder="$t('message.search')">
            <img src="@/assets/svg/search.svg" alt="">
        </span>



        <button @click="searchAssociate">{{ $t('message.search') }}</button>

    </div>
</template>

<script setup lang="ts">
import '@/style/Componets/search.css'
import { ref, defineProps, onMounted } from 'vue'
import { useGetDataByServerStore } from '@/stores/getdatabyserver'
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'
import router from '@/router'
import { useRoute } from 'vue-router'


const getdatabyserverStore = useGetDataByServerStore()
const getContentFromServerStore = useGetContentFromServerStore()
const route = useRoute()


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


// 搜索关联及样式
const searchAssociate = (() => {
    if (searchContent.value) {
        // console.log(searchContent.value)
        // getBlogBySearch(searchContent.value);
        // 调用store中的方法搜索
        getdatabyserverStore.getBlogBySearch(searchContent.value).then((res) => {
            // console.log(res)
            searchBlog(res)
            // 搜索组件本地用传到上层显示搜索结果
            getSearchResult(res)
        })
        // 跳转搜索结果页
        router.push({
            name: 'blog',
            query: {
                search: searchContent.value
            }
        })


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

onMounted(() => {

    if (route.query.search) {
        // 标记为搜索入口
        getContentFromServerStore.asSearchEntrance = true
        searchContent.value = route.query.search as string
        // 调用搜索关联
        searchAssociate()
    } else {
        getContentFromServerStore.asSearchEntrance = false
    }
})

// watch(searchContent, (newVal, oldVal) => {
//     console.log('searchContent', newVal, oldVal);
// })

</script>