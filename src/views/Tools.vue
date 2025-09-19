<template>
    <div class="toolsPage">
        <!-- 多个工具置于容器中进行排列 -->
        <div class="toolsContainer" v-for="item in ToolList" :key="item.name">
            <!-- 容器限制于One中 -->
            <div class="toolOfOne">
                <ToolOne :tool="item" />
            </div>

            <!-- 测试 -->
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/toolsPage.css'
import ToolOne from '@/components/ToolOne.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { ToolItem } from '@/interfance';
import { on } from 'events';


const ToolList = ref<ToolItem[]>([]);

const getToolList = async () => {
    try {
        const response = await axios.get('http://8.130.191.142:6324/master/info/tables/tools');
        ToolList.value = response.data.map((item) => ({
            name: item.name,
            description: item.description,
            url: item.url,
            version: item.version,
            image: item.imageurl,
        }));
        console.log('ToolList', ToolList.value);
    } catch (error) {
        console.error('获取工具列表失败:', error);
    }
}

onMounted(() => {
    getToolList();
})


</script>
