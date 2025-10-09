<template>
    <div class="blogOne_content_tag">
        <img src="@/assets/svg/tag.svg" alt="tag">
        <span>{{ tag }}</span>
    </div>
</template>

<script setup lang="ts">
import '@/style/Blog/blogTags.css'
import { ref, defineProps } from 'vue'






const { tag } = defineProps<{
    tag: string
}>()











</script>