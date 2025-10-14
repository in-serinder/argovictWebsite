<template>
    <div class="toolsPage">
        <!-- 多个工具置于容器中进行排列 -->
        <div class="toolsContainer">
            <!-- 容器限制于One中 -->
            <div class="toolOfOne" v-for="item in ToolList" :key="item.name">
                <ToolOne :tool="item" />
            </div>

            <!-- 测试 -->
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/toolsPage.css'
import ToolOne from '@/components/ToolOne.vue'
import { ref, onMounted } from 'vue'
import type { ToolItem } from '@/interface';
import { useGetContentFromServerStore } from '@/stores/getContentFromServer';

const getContentFromServerStore = useGetContentFromServerStore()

document.title = 'Argovict - Tools'

const ToolList = ref<ToolItem[]>([]);



onMounted(() => {
    // getToolList();
    getContentFromServerStore.getToolList().then((res) => {
        ToolList.value = res as ToolItem[]
    })

})


</script>
