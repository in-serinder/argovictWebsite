<template>
  <div class="BriefSelf" id="BriefSelf">
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
        <li><img :src="darkModeStore.isDarkMode ? githubIconLight : githubIcon" alt="github"
            @click="handleClick('github')">
          <p>Github</p>
        </li>
        <li><img :src="darkModeStore.isDarkMode ? matrixIconLight : matrixIcon" alt="matrix"
            @click="handleClick('matrix')">
          <p>Matrix</p>
        </li>
        <li><img :src="darkModeStore.isDarkMode ? discordIconLight : discordIcon" alt="discord"
            @click="handleClick('discord')">
          <p>Discord</p>
        </li>
        <li><img :src="darkModeStore.isDarkMode ? bilibiliIconLight : bilibiliIcon" alt="bilibili"
            @click="handleClick('bilibili')">
          <p>Bilibili</p>
        </li>
        <li><img :src="darkModeStore.isDarkMode ? twitterIconLight : twitterIcon" alt="twitter"
            @click="handleClick('twitter')">
          <p>Twitter</p>
        </li>
        <li><img :src="darkModeStore.isDarkMode ? emailIconLight : emailIcon" alt="email" @click="handleClick('email')">
          <p>Mail</p>
        </li>
      </ul>
    </div>

    <!-- 底部网站信息 -->
    <div class="brief_footer">
      <p>© 2025 ArgoVICT. All rights reserved.</p>
      <!-- <p>Powered by Vue 3</p> -->
      <p><a href="/asset">{{ $t('message.asset_use') }}</a></p>


    </div>

  </div>
</template>

<script setup lang="ts">
import '@/style/briefselfPage.css'
import { onBeforeUnmount } from 'vue';
import { useDarkModeStore } from '@/stores/darkmode';
import { useBriefSelfStore } from '@/stores/briefSelf';


const darkModeStore = useDarkModeStore()
const briefSelfStore = useBriefSelfStore()

function handleClick(type: string) {
  switch (type) {
    case 'github':
      window.open('https://github.com/in-serinder', '_blank');
      break;
    case 'matrix':
      // window.open('https://matrix.to/#/@Aden:matrix.org', '_blank');
      briefSelfStore.showMatrixContent()
      break;
    case 'discord':
      window.open('https://discord.com/users/853245228442292224', '_blank');
      break;
    case 'bilibili':
      window.open('https://space.bilibili.com/569365028', '_blank');
      break;
    case 'twitter':
      window.open('https://x.com/DoubleHans45', '_blank');
      break;
    case 'email':
      // window.open('mailto:fentanlym@tutamail.com', '_blank');
      briefSelfStore.showEmailContent()
      break;
    default:
      break;
  }
}


onBeforeUnmount(() => {
  // styleStore.whenPageChange('BriefSelf')
})

// 导入图片
import githubIcon from '@/assets/svg/github.svg'
import githubIconLight from '@/assets/svg/light/github_light.svg'
import matrixIcon from '@/assets/svg/matrix.svg'
import matrixIconLight from '@/assets/svg/light/matrix_ligth.svg'
import discordIcon from '@/assets/svg/discord.svg'
import discordIconLight from '@/assets/svg/light/discord_ligth.svg'
import bilibiliIcon from '@/assets/svg/BILIBILI_LOGO.svg'
import bilibiliIconLight from '@/assets/svg/light/BILIBILI_LOGO_light.svg'
import twitterIcon from '@/assets/svg/twiter.svg'
import twitterIconLight from '@/assets/svg/light/twiter_ligth.svg'
import emailIcon from '@/assets/svg/email.svg'
import emailIconLight from '@/assets/svg/light/email_light.svg'

</script>