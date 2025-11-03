<template>
    <div class="projectPage">
        <div class="projectOfOne " v-for="item in projectList" :key="item.name">
            <ProjectOne :project="item" />
        </div>
        <!-- Pacman Loading -->
        <!-- <PacmanLoading v-if="aspacmanLoading" /> -->

        <!-- 占位 -->
        <div class="placeholder-bottom"></div>
    </div>
</template>

<script setup lang="ts">
import '@/style/projectPage.css'
import ProjectOne from '@/components/ProjectOne.vue';
import PacmanLoading from '@/components/PacmanLoading.vue'
import { ref, onMounted } from 'vue'
import type { ProjectItem } from '@/interface';
import { useGetContentFromServerStore } from '@/stores/getContentFromServer'


const getContentFromServerStore = useGetContentFromServerStore()

const projectList = ref<ProjectItem[]>([]);
// const aspacmanLoading = ref<boolean>(true)


document.title = 'Argovict - My Project'

// const pacmanExit = () => {
//     console.log('pacmanExit')
//     // pacmanLoading.value = false
//     const pacmanLoading = document.querySelector('.pacman-loading') as HTMLElement
//     pacmanLoading.classList.add('pacman-loading-exit')
//     aspacmanLoading.value = false
// }


onMounted(() => {
    // getProjectList();
    getContentFromServerStore.getProjectList().then((res) => {
        projectList.value = res as ProjectItem[]
        // if (projectList.value.length === 0) {
        //     pacmanExit()
        // }
    })

    // setTimeout(() => {

    //     pacmanExit()

    // }, 3000);
});







</script>
