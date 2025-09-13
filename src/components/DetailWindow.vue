<template>
    <div class="detailWindow">
        <div class="detailWindow_window" @click.stop>
            <!-- 标题 -->
            <!-- 关闭按钮 -->
            <div class="detailWindow_window_title">
                <h1>Detail Window</h1>
                <img src="@/assets/svg/close.svg" alt="close" @click="$emit('click')">

            </div>
            <!-- 内容列表 -->
            <div class="detailWindow_window_content">
                <ul>
                    <!-- Wheel Start -->
                    <li>
                        <div class="Pbar"></div>
                        <!-- 小标题图标 -->
                        <img src="../assets//svg/github.svg" alt="">
                        <!-- 小标题 -->
                        <h3>Github</h3>
                    </li>
                    <li>
                        <p>Home Page:</p>

                    </li>
                    <!-- Wheel End -->
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Componets/DetailWindow.css'
// import { ref } from 'vue'
</script>
