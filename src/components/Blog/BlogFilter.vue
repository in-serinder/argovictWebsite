<template>
    <div class="blogFilterBar">
        <!-- 搜索 -->
        <div class="searchBar">
            <Search :searchBlog="searchBlog" :getSearchResult="getSerchResult" />
        </div>
        <!-- 搜索结果 -->
        <div class="search-result">
            <div v-if="searchResult">
                <p>{{ $t('message.search_result') }}:</p>
                <span>{{ $t('message.based_on') }}"{{
                    searchResult.keyword }} " {{ $t('message.have') }} {{ searchResult.total }} {{ $t('message.result')
                    }}
                </span>
            </div>
        </div>
        <div class="divider_x"></div>
        <!-- 日期筛选 -->
        <div class="dateFilter">
            <div class="dateFilter_title"> <img src="@/assets/svg/date.svg" alt="date">
                <span>{{ $t('message.date') }} - ({{ datePick.getFullYear() }}-{{ datePick.getMonth() + 1
                }}-{{ datePick.getDate() }})</span>
            </div>
            <div class="dateFilter_calendar">
                <Calendar :receivedDate="receivedDate" />
            </div>


        </div>

        <div class="divider_x"></div>
        <!-- 标签筛选 -->
        <div class="tagFilter">
            <div class="tagFilter_title">
                <img :src="darkMode.isDarkMode ? tagsIconLight : tagsIcon" alt="tag">
                <span>{{ $t('message.tag') }}</span>
            </div>
            <div class="tagFilter_content">
                <!-- 标签存放 -->
                <div class="tagFilter_content_item" v-for="tag in tagList" :key="tag.name">
                    <BlogOnTags :tag="tag.count > 1 ? `${tag.name}(${tag.count})` : tag.name" />
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import '@/style/blogPage.css'
import '@/style/Blog/blogFilter.css'
import Search from '@/components/Search.vue'
import Calendar from '@/components/Calendar.vue'
import BlogOnTags from '@/components/Blog/BlogOnTags.vue'
import { ref, watch, onMounted, defineProps } from 'vue'
import type { TagItem, SearchResult, BlogItem } from '@/interface';
import { useGetDataByServerStore } from '@/stores/getdatabyserver'
import { useDarkModeStore } from '@/stores/darkmode'
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'

const getContentFromServerStore = useGetContentFromServerStore()
const getdatabyserver = useGetDataByServerStore()
const darkMode = useDarkModeStore()

const datePick = ref(new Date());
const tagList = ref<TagItem[]>([]);

const searchResult = ref<SearchResult | null>(null);

const { searchBlog } = defineProps({
    searchBlog: {
        type: Function,
        default: () => { }
    }
})

const receivedDate = ((date: Date) => {
    datePick.value = date;
})





// 搜索结果 手动搜索和日期搜索复用
const getSerchResult = (SearchResult: SearchResult) => {
    searchResult.value = SearchResult;
    // console.log(searchResult.value)
    // 数据向父控件传递，收到后修改展示
    searchBlog(searchResult.value.results)
}


onMounted(() => {
    getContentFromServerStore.getBlogTagList().then((res) => {
        tagList.value = res as TagItem[]
    })
})



watch(datePick, (newVal, oldVal) => {
    // console.log(newVal, oldVal)
    // console.log(`${newVal.getFullYear()}-${datePick.value.getMonth() + 1 > 9 ? datePick.value.getMonth() + 1 : ('0' + (newVal.getMonth() + 1))}-${newVal.getDate() > 9 ? newVal.getDate() : '0' + newVal.getDate()}`)
    // const currentDate: string = `${newVal.getFullYear()}-${datePick.value.getMonth() + 1 > 9 ? datePick.value.getMonth() + 1 : ('0' + (newVal.getMonth() + 1))}-${newVal.getDate() > 9 ? newVal.getDate() : '0' + newVal.getDate()}`
    const currentDate: string = `${newVal.getFullYear()}-${datePick.value.getMonth() + 1 > 9 ? datePick.value.getMonth() + 1 : ('0' + (newVal.getMonth() + 1))}`
    // console.log(getdatabyserver.getDataByDate(currentDate))
    // searchBlog(getdatabyserver.getDataByDate('2025-08-04'))

    // 直接共用搜索
    getdatabyserver.getBlogBySearch(currentDate).then((res) => {
        // 搜索组件本地用传到上层显示搜索结果
        getSerchResult(res as SearchResult)
    })

})


// 导入图片
import tagsIcon from '@/assets/svg/tags.svg'
import tagsIconLight from '@/assets/svg/light/tags_light.svg'


</script>
