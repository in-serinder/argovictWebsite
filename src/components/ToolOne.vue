<template>
    <div class="toolOne">
        <!-- 可用性 -->
        <div class="toolOne_available" v-show="false"><img src="@/assets/svg/disable.svg" alt=""></div>
        <!-- 工具图标和工具名 -->

        <div class="toolOneName"><img src="@/assets/svg/tools.svg" alt="">Tool Names</div>
        <!-- 工具描述 -->
        <span class="toolsDescr">Tool Description</span>
    </div>

</template>


<script setup lang="ts">
import '@/style/Tools/toolOne.css'
</script>
