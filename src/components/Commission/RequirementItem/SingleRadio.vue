<template>
    <div class="commission-single-radio">


        <div class="commission-single-radio-item">
            <!-- 单选框标题 -->
            <p>Single Radio</p>
            <!-- 描述 -->
            <img src="@/assets/svg/unkonw.svg" alt="">
            <!-- 单选框 -->
            <form action="">
                <input type="radio" value="yes" name="radio">
                <label for="">Yes</label>
                <input type="radio" value="no" name="radio" checked>
                <label for="">No</label>
            </form>
        </div>

    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionSingleRadio.css'
</script>