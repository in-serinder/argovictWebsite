<template>
    <div class="image-detail">
        <img :src="miscStore.imageDetailUrl ? miscStore.imageDetailUrl : bc" alt="Image Detail" @click.stop />
    </div>
</template>

<script setup lang="ts">
import '@/style/imagedetail.css'
// import { defineProps } from 'vue'
import { useMiscStore } from '@/stores/misc';

import bc from '@/assets/picture/default_avatar.jpg'

const miscStore = useMiscStore();


// const props = defineProps({
//     imageUrl: {
//         type: String,
//         default: ''
//     }
// })
</script>