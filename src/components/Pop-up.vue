<template>
    <div class="pop-up">
        <div class="pop-up-container">
            <h3>{{ content }}</h3>
            <span class="popout-progress-bar"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/pop-up.css'

import { defineProps } from 'vue';


const {content} = defineProps<{
    content: string
}>()
</script>