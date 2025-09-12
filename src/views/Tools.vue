<template>
    <div class="toolsPage">
        <!-- 多个工具置于容器中进行排列 -->
        <div class="toolsContainer">
            <!-- 容器限制于One中 -->
            <div class="toolOfOne">
                <ToolOne />
            </div>
            <!-- 测试 -->
            <div class="toolOfOne">
                <ToolOne />
            </div>
            <div class="toolOfOne">
                <ToolOne />
            </div>
            <div class="toolOfOne">
                <ToolOne />
            </div>
            <div class="toolOfOne">
                <ToolOne />
            </div>
            <!-- 测试 -->
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/toolsPage.css'
import ToolOne from '@/components/ToolOne.vue'
</script>
