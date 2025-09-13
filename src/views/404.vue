<template>
    <div class="board">
        <div class="title">
            <h3>
                <!-- Title -->
                <span style="font-size: 1.75em;">
                    {{ $t('message.welcome') }}
                </span>
                <br>
                <!-- Content -->
                <span>
                    {{ $t('message.building') }}
                </span>
                <br>
                <span>
                    {{ $t('message.come_back') }}
                </span>
            </h3>

        </div>
        <!-- img -->
        <div class="image">
            <img :src="image" alt="" id="image" @click="SelectImage()">

        </div>
        <div class="other">
            <div>404</div>
            <span>{{ $t('message.404') }}</span>
            <a href="/">{{ $t('message.404_per') }}</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/404.css'

import ump45 from '@/assets/picture/404/124907858_p0.jpg'
import ump9 from '@/assets/picture/404/124907858_p1.jpg'
import hk416 from '@/assets/picture/404/124907858_p2.jpg'
import g11 from '@/assets/picture/404/124907858_p3.jpg'

import { ref, onMounted } from 'vue'

const images = [
    ump45,
    ump9,
    hk416,
    g11,
]

const image = ref<string>('');





function SelectImage() {
    const random = Math.floor(Math.random() * images.length);
    image.value = images[random];

}

onMounted(() => {
    SelectImage();
})






</script>
