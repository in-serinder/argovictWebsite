<template>
    <div class="pageBuilding">
        <div class="pb-padding-area">
            <!-- 图片 -->
            <div class="pb-image">
                <img src="@/assets/picture/eg1.png" alt="">
            </div>
            <!-- 标语 -->
            <div class="pb-title">
                <h1>{{ $t('message.page_building_title') }}</h1>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import '@/style/Componets/pageBuilding.css'
import { ref } from "vue";
</script>