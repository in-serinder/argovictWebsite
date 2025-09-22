<template>
    <div class="noSearchResult">
        <img :src="darkModeStore.isDarkMode ? '/src/assets/picture/111474344_p0_Light.png' : '/src/assets/picture/111474344_p0.png'"
            alt="">
        <p>{{ $t('message.no_search_result') }}</p>
    </div>
</template>


<script setup lang="ts">
import '@/style/Componets/noSearchResult.css'
import { useDarkModeStore } from '@/stores/darkmode';

const darkModeStore = useDarkModeStore();
</script>