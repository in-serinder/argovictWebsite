<!-- 对数量相关的适配 -->
<template>
    <div class="commission-type-area">
        <div class="commission-type-area-item">
            <!-- 标题 -->
            <p>TypeArea</p>
            <!-- 描述 -->
            <img src="@/assets/svg/unkonw.svg">
            <!-- 带有按键 -->
            <div class="commission-type-area-as" v-show="config.itemType === 'number'">
                <div><img src="@/assets/svg/sub.svg" alt="" v-on:click="config.number--"> <input type="text"
                        v-model="config.number"><img src="@/assets/svg/add.svg" alt="" v-on:click="config.number++">
                </div>

            </div>
            <!-- 直接键入 -->
            <div class="commission-type-area-direct" v-show="config.itemType === 'content'">
                <input type="text" v-model="config.content">
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionTypeArea.css'
import type { TypeArea } from '@/interface'
import { ref } from 'vue'


const config = ref<TypeArea>({
    item: "TypeArea",
    itemType: "number",
    description: "TypeArea Description",
    number: 0,
    content: "",
})

</script>