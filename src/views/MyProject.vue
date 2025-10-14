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
import type { ProjectItem } from '@/interface';
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'

const getContentFromServerStore = useGetContentFromServerStore()

const projectList = ref<ProjectItem[]>([]);

document.title = 'Argovict - My Project'



onMounted(() => {
    // getProjectList();
    getContentFromServerStore.getProjectList().then((res) => {
        projectList.value = res as ProjectItem[]
    })
});





</script>
