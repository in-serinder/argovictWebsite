<!-- 首页 -->
<!-- 首页直接采用个人介绍，个人介绍采用BriefSelf组件 -->
<!-- 日后使用入站动画 -->

<template>
  <!-- 详细框 -->
  <DetailWindow v-show="briefSelfStore.showDetailWindow" @click="briefSelfStore.closeDetailWindow"
    :title="detailWindowTitle">
  </DetailWindow>
  <!-- 根页面 -->
  <span class="rootPage">
    <div class="Router_title">
      <!-- 副标题 -->
      <div class="Router_title_subtitle ">
        <!-- <h1>ArgoVICT</h1> -->
        <a href="/"><img :src="darkModeStore.isDarkMode ? websiteIconLight : websiteIcon" alt=""></a>
      </div>
      <!-- 索引栏 -->
      <div class="Router_title_table">
        <ul>
          <li>
            <RouterLink to="/" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? homeIconLight : homeIcon" alt="">{{
                  $t('message.home') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/blog" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? blogIconLight : blogIcon" alt="">{{ $t('message.blog') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/project" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? projectIconLight : projectIcon" alt="">{{
                  $t('message.project') }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/tools" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? toolsIconLight : toolsIcon" alt="">{{ $t('message.tools')
                }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/commission" class="router_link" active-class="routered_link"><img
                :src="darkModeStore.isDarkMode ? commissionIconLight : commissionIcon" alt="">{{
                  $t('message.commission') }}</RouterLink>
          </li>
          <li>
            <div class="divider"></div>
          </li>
          <li @click="darkModeStore.switchMode()"><img :src="darkModeStore.isDarkMode ? darkIconLight : darkIcon"
              alt="">
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
import DetailWindow from '@/components/DetailWindow.vue'
import { useDarkModeStore } from '@/stores/darkmode'
import { onMounted, ref } from 'vue'

import { useBriefSelfStore } from '@/stores/briefSelf';








const detailWindowTitle = ref<string>('Detail Window');
const darkModeStore = useDarkModeStore()
const briefSelfStore = useBriefSelfStore();





// 图片引入
import homeIcon from '@/assets/svg/home.svg'
import homeIconLight from '@/assets/svg/light/home_light.svg'
import blogIcon from '@/assets/svg/blog.svg'
import blogIconLight from '@/assets/svg/light/blog_light.svg'
import projectIcon from '@/assets/svg/project.svg'
import projectIconLight from '@/assets/svg/light/code_light.svg'
import toolsIcon from '@/assets/svg/tools.svg'
import toolsIconLight from '@/assets/svg/light/tools_light.svg'
import commissionIcon from '@/assets/svg/workbench.svg'
import commissionIconLight from '@/assets/svg/light/workbench_light.svg'


import darkIcon from '@/assets/svg/dark.svg'
import darkIconLight from '@/assets/svg/light/dark.svg'

import websiteIcon from '@/assets/picture/ArgovictLogo.png'
import websiteIconLight from '@/assets/picture/ArgovictLogo_light.png'


onMounted(() => {
  //  this.isDarkMode = localStorage.getItem('isDark') ? true : false
  darkModeStore.isDarkMode = localStorage.getItem('isDark') === 'true';
  darkModeStore.setDarkMode()

})

</script>

<style></style>