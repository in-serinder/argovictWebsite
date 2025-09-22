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
                <img :src="darkMode.isDarkMode ? '/src/assets/svg/light/tags_light.svg' : '/src/assets/svg/tags.svg'"
                    alt="tag">
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
import BlogOnTags from '@/components/BlogOnTags.vue'
import { ref, watch, onMounted, defineProps } from 'vue'
import type { TagItem, SearchResult } from '@/interfance';
import axios from 'axios'
import { useGetDataByServerStore } from '@/stores/getdatabyserver'
import { useDarkModeStore } from '@/stores/darkmode'

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


const getTagList = async () => {
    try {
        const res = await axios.get('http://8.130.191.142:6324/master/info/tables/tags');
        tagList.value = res.data as TagItem[];
        // console.log(tagList.value)
    } catch (err) {
        console.log(err)
    }
}


// 搜索结果 手动搜索和日期搜索复用
const getSerchResult = (SearchResult: SearchResult) => {
    searchResult.value = SearchResult;
}


onMounted(() => {
    getTagList();
})



watch(datePick, (newVal, oldVal) => {
    // console.log(newVal, oldVal)
    console.log(`${newVal.getFullYear()}-${datePick.value.getMonth() + 1 > 9 ? datePick.value.getMonth() + 1 : ('0' + (newVal.getMonth() + 1))}-${newVal.getDate() > 9 ? newVal.getDate() : '0' + newVal.getDate()}`)
    const currentDate: string = `${newVal.getFullYear()}-${datePick.value.getMonth() + 1 > 9 ? datePick.value.getMonth() + 1 : ('0' + (newVal.getMonth() + 1))}-${newVal.getDate() > 9 ? newVal.getDate() : '0' + newVal.getDate()}`
    // console.log(getdatabyserver.getDataByDate(currentDate))
    searchBlog(getdatabyserver.getDataByDate('2025-08-04'))
})

watch(searchResult, (newVal, oldVal) => {
    console.log(newVal, oldVal)

})


</script>
