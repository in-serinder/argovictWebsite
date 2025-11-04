<template>
    <div class="commission-checkbox">
        <!-- 项目 -->
        <div>
            <p>CheckBox</p>
        </div>
        <!-- 描述 -->
        <img src="@/assets/svg/unkonw.svg" alt="">
        <!-- 复选框 -->
        <div class="commission-checkbox-box" v-for="(item, index) in Config.subitems" :key="index">
            <div class="commission-checkbox-item" :class="{ 'checked': Config.checked[index] }"
                @click="Config.checked[index] = !Config.checked[index]">
                <span>{{ item }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionCheckBox.css'
import type { CheckBox } from '@/interface'
import { ref, watch } from 'vue';

const Config = ref<CheckBox>(
    {
        item: 'CheckBox',
        description: '复选框',
        subitems: [
            "项目1",
            "项目2",
            "项目3",
        ],
        checked: [true, false, true],

    }
)

watch(() => Config.value.checked, (newVal, oldVal) => {
    console.log(newVal, oldVal);
}, {
    deep: true,
})
</script>
