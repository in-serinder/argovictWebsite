<!-- 首页 -->
<!-- 首页直接采用个人介绍，个人介绍采用BriefSelf组件 -->
<!-- 日后使用入站动画 -->

<template>
  <!-- 详细框 -->
  <DetailWindow v-show="detailWindow_Show" @click="closeDetailWindow"></DetailWindow>
  <!-- 根页面 -->
  <span class="rootPage">
    <div class="Router_title">
      <!-- 副标题 -->
      <div class="Router_title_subtitle ">
        <!-- <h1>ArgoVICT</h1> -->
        <a href="/"><img
            :src="darkModeStore.isDarkMode ? '/src/assets/picture/ArgovictLogo_light.png' : '/src/assets/picture/ArgovictLogo.png'"
            alt=""></a>
      </div>
      <!-- 索引栏 -->
      <div class="Router_title_table">
        <ul>
          <li>
            <RouterLink to="/" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/home_light.svg' : '/src/assets/svg/home.svg'"
                alt="">{{
                  $t('message.home') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/blog_light.svg' : '/src/assets/svg/blog.svg'"
                alt="">{{ $t('message.blog') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/project" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/code_light.svg' : '/src/assets/svg/project.svg'"
                alt="">{{
                  $t('message.project') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/tools" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/tools_light.svg' : '/src/assets/svg/tools.svg'"
                alt="">{{ $t('message.tools')
                }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/commission" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/workbench_light.svg' : '/src/assets/svg/workbench.svg'"
                alt="">{{
                  $t('message.commission') }}</RouterLink>
          </li>
          <li>
            <div class="divider"></div>
          </li>
          <li @click="darkModeStore.switchMode()"><img
              :src="darkModeStore.isDarkMode ? '/src/assets/svg/light/dark.svg' : '/src/assets/svg/light.svg'" alt="">
          </li>

        </ul>
      </div>
    </div>
    <!-- 路由页面 -->
    <div class="Router_view">
      <router-view></router-view>
    </div>
  </span>
</template>


<script setup lang="ts">
import '@/style/rootPage.css'
import '@/style/widget.css'
import BriefSelf from './BriefSelf.vue'
import DetailWindow from '@/components/DetailWindow.vue'
import { useDarkModeStore } from '@/stores/darkmode'
import { onMounted, ref } from 'vue'
import { on } from 'events'






const detailWindow_Show = ref<boolean>(false)
const darkModeStore = useDarkModeStore()



const closeDetailWindow = () => {
  detailWindow_Show.value = false;
  console.log(detailWindow_Show.value)
}


// 图片引入
// import homeIcon from '@/assets/svg/home.svg'
onMounted(() => {
  //  this.isDarkMode = localStorage.getItem('isDark') ? true : false
  darkModeStore.isDarkMode = localStorage.getItem('isDark') === 'true';
  darkModeStore.setDarkMode()

})

</script>

<style></style>