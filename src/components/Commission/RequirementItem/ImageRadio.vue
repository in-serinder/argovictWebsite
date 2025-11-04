<template>
    <div class="commission-requirement-image-checkbox">
        <!-- 项目 -->
        <div>
            <p>ImageRadio</p>
        </div>
        <!-- 描述 -->
        <img src="@/assets/svg/unkonw.svg" alt="">
        <!-- 项目 -->
        <div class="commission-Imageradio-item" v-for="(item, index) in config.subitems" :key="index"
            :class="{ 'checked': index == config.checked }" @click="config.checked = index">
            <!-- 图片 -->

            <img :src="item.imageurl" alt="">

            <!-- 文本 -->
            <p>{{ item.item }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/Commission/Components/commissionRequirementImageRadio.css'
import type { ImageRadio } from '@/interface'
import { ref } from 'vue'
import tried from "@/assets/picture/Tired.jpg"

const config = ref<ImageRadio>({
    item: "ImageRadio",
    description: "ImageRadio Description",
    subitems: [
        {
            imageurl: tried,
            item: "项目1",
        },
        {
            imageurl: tried,
            item: "项目2",
        },
        {
            imageurl: tried,
            item: "项目3",
        },
    ],
    checked: 2,

})



</script>
