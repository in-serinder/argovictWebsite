<template>
    <div class="commission-radio">
        <!-- 项目 -->
        <div>
            <p>Radio</p>
        </div>
        <!-- 描述 -->
        <img src="@/assets/svg/unkonw.svg" alt="">
        <!-- 单选框 由数据类型控制-->
        <div class="commission-radio-box" v-for="(item, index) in Config.subitems" :key="index">
            <div class="commission-radio-item" :class="{ 'checked': Config.checked === index }"
                @click="Config.checked = index">
                <span>{{ item }}</span>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionRadio.css'
import type { Radio } from '@/interface'
import { ref, watch } from 'vue';


const Config = ref<Radio>(
    {
        item: 'Radio',
        description: '单选框',
        subitems: [
            "项目1",
            "项目2",
            "项目3",
        ],
        checked: 2, //默认选中第二个
    }
)

watch(() => Config.value.checked, (newVal, oldVal) => {
    console.log(newVal, oldVal);
}, {
    deep: true,
})



</script>
