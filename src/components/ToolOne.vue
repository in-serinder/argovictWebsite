<template>
    <div class="toolOne" @click="toToolLink">
        <!-- 可用性 -->
        <div class="toolOne_available" v-show="false"><img src="@/assets/svg/disable.svg" alt=""></div>
        <!-- 工具图标和工具名 -->

        <div class="toolOneName"><img :src="tool.imageurl" alt="">{{ tool.name }}</div>
        <!-- 工具描述 -->
        <span class="toolsDescr">{{ tool.description }}</span>
    </div>

</template>


<script setup lang="ts">
import '@/style/Tools/toolOne.css'
import { ref } from 'vue'
import type { ToolItem } from '@/interface';

const { tool } = defineProps<{
    tool: ToolItem;
}>();

const toToolLink = (() => {
    window.open(tool.url)
})

</script>
