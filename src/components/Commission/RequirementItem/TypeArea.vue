<!-- 对数量相关的适配 -->
<template>
    <div class="commission-type-area">
        <div class="commission-type-area-item">
            <!-- 标题 -->
            <p>TypeArea</p>
            <!-- 描述 -->
            <img src="@/assets/svg/unkonw.svg" alt="">
            <!-- 带有按键 -->
            <div class="commission-type-area-as" v-show="isAs">
                <div><img src="@/assets/svg/sub.svg" alt=""> <input type="text"><img src="@/assets/svg/add.svg" alt="">
                </div>

            </div>
            <!-- 直接键入 -->
            <div class="commission-type-area-direct" v-show="!isAs">

                <input type="text">
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionTypeArea.css'
import { ref } from 'vue'

const isAs = ref<boolean>(true)


</script>