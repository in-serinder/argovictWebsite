<template>
    <div class="projectOne">
        <!-- 项目标题 -->
        <div class="projectOneTitle">
            <p>{{ project.title }}</p>
        </div>
        <!-- 项目名-发布平台 -->
        <div class="projectOneName">
            <ul>
                <li>{{ project.name }}({{ project.version }})</li>
                <li> - </li>
                <!-- <li>Platform</li> -->
                <li>
                    <span v-for="item in parsePlatform" :key="item">
                        {{ item }}
                        <!-- <img src='@/assets/svg/github.svg' alt=""> -->
                    </span>
                </li>
            </ul>
        </div>
        <!-- 项目地址 -->
        <div class="projectOneUrl">
            <a :href="project.url" target="_blank">{{ project.url }}</a>
        </div>
        <!-- 描述 -->
        <div class="projectOneDesc">
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/MyProject/ProjectOne.css'
import { ref, defineProps, onMounted, computed } from 'vue'
import type { ProjectItem } from '@/interface';

const { project } = defineProps<{
    project: ProjectItem;
}>();


const parsePlatform = computed(() => {
    try {
        const platform = JSON.parse(project.platform);
        return Array.isArray(platform) ? platform : [];
    } catch (error) {
        console.log(error)
        return [];
    }
})




</script>
