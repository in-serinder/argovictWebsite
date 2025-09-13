<template>
    <div class="blogFilterBar">
        <!-- 搜索 -->
        <div class="searchBar">
            <Search />
        </div>
        <div class="divider_x"></div>
        <!-- 日期筛选 -->
        <div class="dateFilter">
            <div class="dateFilter_title"> <img src="@/assets/svg/date.svg" alt="date">
                <span>{{ $t('message.date') }} - (2025-9-13)</span>
            </div>
            <div class="dateFilter_calendar">
                <Calendar />
            </div>


        </div>

        <div class="divider_x"></div>
        <!-- 标签筛选 -->
        <div class="tagFilter">
            <div class="tagFilter_title">
                <img src="@/assets/svg/tags.svg" alt="tag">
                <span>{{ $t('message.tag') }}</span>
            </div>
            <div class="tagFilter_content">
                <!-- 标签存放 -->
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
                </div>
                <div class="tagFilter_content_item">
                    <BlogOnTags />
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
</script>
