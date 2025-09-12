<template>
  <div class="BriefSelf">
    <div class="brief">
      <div style="height: 140px;"></div>
      <!-- 头像 -->
      <div class="brief_avatar">
        <img src="@/assets/picture/avatar.png" alt="">
      </div>
      <!-- 个人介绍 -->
      <div class="brief_introduce">
        <h1 class="brief_name">{{ $t('message.brief_name') }}</h1>

        <div class="brief_description">
          <span>{{ $t('message.brief_description') }}</span>
        </div>
      </div>


    </div>
    <!-- 联系方式 -->
    <div class="brief_contact">
      <!-- <h1>联系方式</h1> -->
      <ul>
        <li><img src="@/assets/svg/github.svg" alt="github" @click="handleClick('github')">
          <p>Github</p>
        </li>
        <li><img src="@/assets/svg/matrix.svg" alt="matrix" @click="handleClick('matrix')">
          <p>Matrix</p>
        </li>
        <li><img src="@/assets/svg/discord.svg" alt="discord" @click="handleClick('discord')">
          <p>Discord</p>
        </li>
        <li><img src="@/assets/svg/BILIBILI_LOGO.svg" alt="bilibili" @click="handleClick('bilibili')">
          <p>Bilibili</p>
        </li>
        <li><img src="@/assets/svg/twiter.svg" alt="twitter" @click="handleClick('twitter')">
          <p>Twitter</p>
        </li>
        <li><img src="@/assets/svg/email.svg" alt="email" @click="handleClick('email')">
          <p>Mail</p>
        </li>
      </ul>
    </div>

    <!-- 底部网站信息 -->
    <div class="brief_footer">
      <p>© 2025 ArgoVICT. All rights reserved.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import '@/style/briefselfPage.css'

function handleClick(type: string) {
  switch (type) {
    case 'github':
      window.open('https://github.com/ArgoVICT', '_blank');
      break;
    case 'matrix':
      window.open('https://matrix.to/#/@ArgoVICT:matrix.org', '_blank');
      break;
    case 'discord':
      window.open('https://discord.com/users/853245228442292224', '_blank');
      break;
    case 'bilibili':
      window.open('https://space.bilibili.com/123456', '_blank');
      break;
    case 'twitter':
      window.open('https://twitter.com/ArgoVICT', '_blank');
      break;
    case 'email':
      window.open('mailto:ArgoVICT@outlook.com', '_blank');
      break;
    default:
      break;
  }
}
</script>