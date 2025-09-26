<template>
    <div class="detailWindow">
        <div class="detailWindow_window" @click.stop>
            <!-- 标题 -->
            <!-- 关闭按钮 -->
            <div class="detailWindow_window_title">
                <h1>{{ briefSelfStore.DetailWindowTitle }}</h1>
                <img src="@/assets/svg/close.svg" alt="close" @click="$emit('click')">

            </div>
            <!-- 内容列表 -->
            <div class="detailWindow_window_content">
                <ul v-for="item in briefSelfStore.detialwindowItemList" :key="item.title">
                    <!-- Wheel Start -->
                    <li>
                        <div class="Pbar"></div>
                        <!-- 小标题图标 -->
                        <img :src="item.titleIcon" alt="">
                        <!-- 小标题 -->
                        <h3>{{ item.title }}</h3>
                    </li>
                    <li>
                        <p>{{ item.content }}:</p>
                        <a :href="item.link">{{ item.linkcontent }}</a>

                    </li>
                    <!-- Wheel End -->
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Componets/DetailWindow.css'
import { useBriefSelfStore } from '@/stores/briefSelf';


const briefSelfStore = useBriefSelfStore()







</script>
