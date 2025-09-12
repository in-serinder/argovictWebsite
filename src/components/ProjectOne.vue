<template>
    <div class="projectOne">
        <!-- 项目标题 -->
        <div class="projectOneTitle">
            <p>ProjectOne</p>
        </div>
        <!-- 项目名-发布平台 -->
        <div class="projectOneName">
            <ul>
                <li>ProjectName</li>
                <li> - </li>
                <!-- <li>Platform</li> -->
                <li>Github<img src='@/assets/svg/github.svg' alt=""></img></li>
            </ul>
        </div>
        <!-- 项目地址 -->
        <div class="projectOneUrl">
            <a>https://github.com/argovict?tab=stars</a>
        </div>
        <!-- 描述 -->
        <div class="projectOneDesc">
            <p>this a project of vue3</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import '@/style/MyProject/ProjectOne.css'

</script>
