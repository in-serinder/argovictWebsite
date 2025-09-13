<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import RootView from './views/Root.vue';
import { onMounted } from 'vue';
import { createI18n } from 'vue-i18n';
/*语言设置*/
// import en from '@/locales/en.json'
// import zh from '@/locales/zh.json'
// // import du from '@/locales/du.json'

// const LocalesList = ['en', 'zh', 'du'] as const;
// type LocalesListType = (typeof LocalesList)[number];

// // 语言获取
// const getBrowserLanguage = () => {
//   console.log(navigator.language);
//   return navigator.language.slice(0, 2); //[en]-CN只保留语言不保留地区
// };

// //创建I8n实例和语言设置
// const setBrowserLanguage = (lang: string) => {

//   const i18n = createI18n({
//     legacy: false,
//     locale: lang, //默认语言
//     fallbackLocale: 'en', //备用语言
//     messages: {
//       en,
//       zh,
//       // du,
//     } as Record<string, any>,
//   })



//   if (LocalesList.includes(lang as LocalesListType)) {
//     i18n.global.locale.value = lang;
//   }
// };



// onMounted(() => {
//   // 初始化语言
//   const lang = getBrowserLanguage();

//   if (LocalesList.includes(lang as LocalesListType)) {
//     // i18n.global.locale.value=lang;
//     setBrowserLanguage(lang);
//     console.log(lang);
//   }
// });


</script>

<template>
  <!-- 将span改为div，div是块级元素 -->
  <div class="app-container">
    <RootView />
  </div>
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
