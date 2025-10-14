<template>
    <div class="commission-page">
        <div class="commission-container">
            <!-- 展示栏 -->
            <div class="commission-boards">
                <CommissionBoard />
            </div>
            <!-- 项目栏 -->
            <div class="commission-items-container">
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />
                <CommissionTypeOne />



            </div>
        </div>
        <!-- 占位 -->
        <div class="placeholder-bottom"></div>
    </div>
</template>

<script setup lang="ts">
import '@/style/commissionPage.css'
import CommissionBoard from '@/components/CommitssionBoard.vue'
import CommissionTypeOne from '@/components/CommissionTypeOne.vue'

document.title = 'Argovict - Commission'
</script>