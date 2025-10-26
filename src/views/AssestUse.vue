<template>
    <div class="assetUse-page">
        <div class="assetUse-container">
            <h1>{{ $t('message.asset_use_list') }}</h1>
            <!-- 资产类型 -->
            <!-- asset start -->
            <h2><img :src="darkModeStore.isDarkMode ? imageIconLight : imageIcon" alt="">{{ $t('message.image') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 图片 -->
                <li v-for="asset in pictureAssetList" :key="asset.link">
                    <a :href="asset.link" target="_blank">{{ asset.description }}</a>
                    <!-- <a href="https://www.pixiv.net/artworks/124907858" target="_blank">404 Page - 404四人组</a>
                    <a href="https://www.pixiv.net/artworks/91174244" target="_blank">PlaceHolder Page - 8pin-DIP
                        (2016/12/11)</a>
                    <a href="https://www.pixiv.net/artworks/98216966" target="_blank">Home Page avatar -nsrad jsndsh</a>
                    <a href="https://www.pixiv.net/users/60562229" target="_blank">More About (Exmaple
                        avatar,article,backgroundImage and more) - Pixiv Ravimo</a>

                    <a href="https://www.pixiv.net/artworks/111474344" target="_blank">No Search Result - Void
                        Linux-chan</a> -->
                </li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img :src="darkModeStore.isDarkMode ? mediaIconLight : mediaIcon" alt="">{{ $t('message.media') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 视频 -->
                <li>None</li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img :src="darkModeStore.isDarkMode ? audioIconLight : audioIcon" alt="">{{ $t('message.audio') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 音频 -->
                <li>None</li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img :src="darkModeStore.isDarkMode ? miscIconLight : miscIcon" alt="">{{ $t('message.other') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 其他 -->
                <li v-for="asset in otherAssetList" :key="asset.link">
                    <a :href="asset.link" target="_blank">{{ asset.description }}</a>
                </li>
            </ul>
            <!-- asset end-->

        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/assestusePage.css'
import { useDarkModeStore } from '@/stores/darkmode';
import { ref } from 'vue';
import type { asset } from '@/interface';

const darkModeStore = useDarkModeStore();

document.title = 'Argovict - Asset Use'

const pictureAssetList = ref<asset[]>([
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/artworks/124907858',
        description: '404 Page - 404四人组',
    },
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/artworks/91174244',
        description: 'PlaceHolder Page - 8pin-DIP (2016/12/11)',
    },
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/artworks/98216966',
        description: 'Home Page avatar -nsrad jsndsh',
    },
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/users/60562229',
        description: 'More About (Exmaple avatar,article,backgroundImage and more) - Pixiv Ravimo',
    },
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/artworks/111474344',
        description: 'No Search Result - Void Linux-chan',
    },
    {
        tagsIcon: '',
        link: 'https://www.pixiv.net/artworks/130446730',
        description: 'Post Not Found - 🐱❓ 🌵❓',
    },
]);

const otherAssetList = ref<asset[]>([
    {
        tagsIcon: '',
        link: 'https://github.com/journey-ad/Moe-Counter',
        description: 'Moe Counter - 一个简单的萌萌计数器',
    },
]);







// 导入图片
import imageIcon from '@/assets/svg/image.svg'
import imageIconLight from '@/assets/svg/light/image_light.svg'
// 导入视频
import mediaIcon from '@/assets/svg/media.svg'
import mediaIconLight from '@/assets/svg/light/media_light.svg'
// 导入音频
import audioIcon from '@/assets/svg/audio.svg'
import audioIconLight from '@/assets/svg/light/audio_light.svg'
// 导入其他
import miscIcon from '@/assets/svg/misc.svg'
import miscIconLight from '@/assets/svg/light/misc_light.svg'

</script>