<template>
    <div class="commission-single-radio">


        <div class="commission-single-radio-item">
            <!-- 单选框标题 -->
            <p>Single Radio</p>
            <!-- 描述 -->
            <img src="@/assets/svg/unkonw.svg" alt="">
            <!-- 单选框 -->
            <form action="">
                <input type="radio" value="yes" name="radio" v-model="config.selected">
                <label for="">Yes</label>
                <input type="radio" value="no" name="radio" v-model="config.selected">
                <label for="">No</label>
            </form>
        </div>

    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionSingleRadio.css'
import type { SingleRadio } from '@/interface'
import { ref } from 'vue'


const config = ref<SingleRadio>({
    item: 'Single Radio',
    description: 'Single Radio Description',
    selected: 'no',
})

</script>