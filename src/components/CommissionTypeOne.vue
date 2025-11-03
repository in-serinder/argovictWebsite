<template>
    <div class="commission-type-one">

        <!-- 略缩图 -->
        <div class="commission-type-one-thumbnail">
            <img src="@/assets/picture/test/coffee-777612_1920.jpg" alt="thumbnail">
            <!-- 按钮 -->
            <div class="commission-type-one-button">
                <!-- 预览 -->
                <button style="background-color: #fff;" @click="toPreview">{{ $t('message.preview') }}</button>
                <!-- 参看计费表 -->
                <button style="background-color: #3d85c4;color: #fff;" @click="toReferQuotation">{{
                    $t('message.refer_quotation') }}</button>
            </div>
        </div>
        <div class="commission-content">
            <!-- 标题 -->
            <div class="commission-type-one-title-text">
                Commission One
            </div>
            <hr>
            <!-- 描述 -->
            <div class="commission-type-one-description">
                <p>Commission One Description</p>
                <p>Commission One Description</p>
            </div>
            <!-- 定价 -->
            <div class="commission-type-one-price">
                <p>Price: $100</p>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/commissionTypeOne.css'
import { ref } from 'vue'
import router from '@/router'

const toPreview = () => {
    router.push({ name: 'commissionExample', params: { type: 'one' } })
}

const toReferQuotation = () => {
    router.push({ name: 'commissionRequirements', params: { type: 'one' } })
}

</script>
