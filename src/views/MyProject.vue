<template>
    <div class="projectPage">
        <div class="projectOfOne " v-for="item in projectList" :key="item.name">
            <ProjectOne :project="item" />
        </div>

        <!-- 占位 -->
        <div class="placeholder-bottom"></div>
    </div>
</template>

<script setup lang="ts">
import '@/style/projectPage.css'
import ProjectOne from '@/components/ProjectOne.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios';
import type { ProjectItem } from '@/interfance';

const projectList = ref<ProjectItem[]>([]);

const getProjectList = async () => {
    try {
        const response = await axios.get('http://8.130.191.142:6324/master/info/tables/project');
        projectList.value = response.data.map((item: ProjectItem) => ({
            name: item.name,
            title: item.title,
            description: item.description,
            author: item.author,
            url: item.url,
            version: item.version,
            platform: item.platform.split(','),
            license: item.license,
        }));
        console.log('projectList', projectList.value);
    } catch (error) {
        console.error('获取项目列表失败:', error);
    }
}

onMounted(() => {
    getProjectList();
});



</script>
