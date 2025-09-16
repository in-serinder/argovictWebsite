<template>
    <div class="assetUse-page">
        <div class="assetUse-container">
            <h1>{{ $t('message.asset_use_list') }}</h1>
            <!-- 资产类型 -->
            <!-- asset start -->
            <h2><img src="@/assets/svg/image.svg" alt="">{{ $t('message.image') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 图片 -->
                <li>
                    <a href="https://www.pixiv.net/artworks/124907858" target="_blank">404 Page - 404四人组</a>
                    <a href="https://www.pixiv.net/artworks/91174244" target="_blank">PlaceHolder Page - 8pin-DIP
                        (2016/12/11)</a>
                    <a href="https://www.pixiv.net/artworks/98216966" target="_blank">Home Page avatar -nsrad jsndsh</a>
                </li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img src="@/assets/svg/video.svg" alt="">{{ $t('message.media') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 视频 -->
                <li>None</li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img src="@/assets/svg/audio.svg" alt="">{{ $t('message.audio') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 音频 -->
                <li>None</li>
            </ul>
            <!-- asset end-->
            <!-- asset start -->
            <h2><img src="@/assets/svg/misc.svg" alt="">{{ $t('message.other') }}</h2>
            <div class="divider_x"></div>
            <ul>
                <!-- 其他 -->
                <li>None</li>
            </ul>
            <!-- asset end-->

        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/assestusePage.css'

</script>