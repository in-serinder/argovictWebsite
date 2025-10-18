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
import { ref, onMounted, watch } from 'vue'
import type { ToolItem } from '@/interface';
import { useGetContentFromServerStore } from '@/stores/getContentFromServer';
import { useLoadingStore } from '@/stores/loading'
import { nextTick } from 'process';



const loadingStore = useLoadingStore()
const getContentFromServerStore = useGetContentFromServerStore()

document.title = 'Argovict - Tools'

const ToolList = ref<ToolItem[]>([]);



onMounted(() => {
    // getToolList();
    getContentFromServerStore.getToolList().then((res) => {
        ToolList.value = res as ToolItem[]

        nextTick(() => {
            const toolsContainer = document.querySelector('.toolsContainer') as HTMLElement
            loadingStore.initTotalImage(toolsContainer)
            console.log(loadingStore.totalImage)
        })
    })

})


watch(() => loadingStore.loaded, (newVal, oldVal) => {
    console.log(newVal, oldVal)

})

</script>
