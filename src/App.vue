<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import RootView from './views/Root.vue';
import { useMiscStore } from '@/stores/misc'
import Loading from '@/components/Loading.vue'

// import { onMounted } from 'vue';
// import { createI18n } from 'vue-i18n';
/*语言设置*/
// import en from '@/locales/en.json'
// import zh from '@/locales/zh.json'
// // import du from '@/locales/du.json'

// const LocalesList = ['en', 'zh', 'du'] as const;
// type LocalesListType = (typeof LocalesList)[number];
const { printWordArt } = useMiscStore()
printWordArt()






</script>

<template>
  <!-- 将span改为div，div是块级元素 -->
  <div class="app-container">
    <RootView />
  </div>
  <!-- 加载动画 -->
  <!-- <Loading></Loading> -->
</template>

<style>
/* 移除scoped，让样式能作用到全局元素 */
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}

/* 确保html和body占据全屏 */
html,
body {
  min-width: 1024px;
  width: 100%;
  height: 100%;
  overflow: hidden;

}

#app {
  width: 100%;
  height: 100%;
}

.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;

}
</style>
