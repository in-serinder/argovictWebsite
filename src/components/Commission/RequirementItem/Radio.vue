<template>
    <div class="commission-radio">
        <!-- 项目 -->
        <div>
            <p>Radio</p>
        </div>
        <!-- 描述 -->
        <img src="@/assets/svg/unkonw.svg" alt="">
        <!-- 单选框 由数据类型控制-->
        <div class="commission-radio-box">
            <div class="commission-radio-item">
                <span>项目1</span>
            </div>

            <div class="commission-radio-item checked">
                <span>项目1</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionRadio.css'
</script>
