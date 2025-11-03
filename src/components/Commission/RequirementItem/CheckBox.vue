<template>
    <div class="commission-checkbox">
        <!-- 项目 -->
        <div>
            <p>CheckBox</p>
        </div>
        <!-- 描述 -->
        <img src="@/assets/svg/unkonw.svg" alt="">
        <!-- 复选框 -->
        <div class="commission-checkbox-box">
            <div class="commission-checkbox-item">
                <span>项目1</span>
            </div>
            <div class="commission-checkbox-item checked">
                <span>项目2</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionCheckBox.css'
</script>
