<template>
    <div class="noSearchResult">
        <img :src="darkModeStore.isDarkMode ? noSearchResultLight : noSearchResult" alt="">
        <p>{{ $t('message.no_search_result') }}</p>
    </div>
</template>


<script setup lang="ts">
import '@/style/Componets/noSearchResult.css'
import { useDarkModeStore } from '@/stores/darkmode';

const darkModeStore = useDarkModeStore();

// 导入图片
import noSearchResultLight from '@/assets/picture/111474344_p0_Light.png'
import noSearchResult from '@/assets/picture/111474344_p0.png'
</script>