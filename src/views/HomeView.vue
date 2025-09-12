<!-- 首页 -->
<!-- 首页直接采用个人介绍，个人介绍采用BriefSelf组件 -->
<!-- 日后使用入站动画 -->

<template>
  <span class="homePage">
    <BriefSelf hidden="true" />
    <div class="Router_title">
      <!-- 副标题 -->
      <div class="Router_title_subtitle ">
        <!-- <h1>ArgoVICT</h1> -->
        <img src="@/assets/picture/ArgovictLogo.png" alt="">
      </div>
      <!-- 索引栏 -->
      <div class="Router_title_table">
        <ul>
          <li><img src="@/assets/svg/home.svg" alt="">{{ $t('message.home') }}</li>
          <li><img src="@/assets/svg/blog.svg" alt="">{{ $t('message.blog') }}</li>
          <li><img src="@/assets/svg/project.svg" alt="">{{ $t('message.project') }}</li>
          <li><img src="@/assets/svg/tools.svg" alt="">{{ $t('message.tools') }}</li>
          <li><img src="@/assets/svg/workbench.svg" alt="">{{ $t('message.commission') }}</li>
          <li>
            <div class="divider"></div>
          </li>
          <li><img src="@/assets/svg/light.svg" alt=""></li>

        </ul>
      </div>
    </div>
  </span>
</template>


<script setup lang="ts">
import '@/style/homePage.css'
import '@/style/widget.css'
import BriefSelf from './BriefSelf.vue'

</script>

<style></style>