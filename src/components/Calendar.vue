<!-- 日历组件 -->
<!-- 未完成 -->

<template>
    <div class="calendar"> <!-- 日期变换操作 -->
        <!-- <div class="calendar_operation">
            <p>&lt;&lt;</p>
            <p>&lt;</p>
            <p>2023-12-9</p>
            <p>&gt;</p>
            <p>&gt;&gt;</p>
        </div> -->
        <!-- 日历 -->
        <!-- <div class="calendar_content"></div> -->
        <!-- <date-picker></date-picker> -->
        <div class="calendar_content">
            <VueDatePicker :locale="getBrowserLanguage()" day-picker inline class="calendar_dp"></VueDatePicker>
        </div>

    </div>

</template>

<script setup lang="ts">
import '@/style/Componets/Calendar.css'
// import DatePicker from 'vue3-datepicker'
// import 'vue3-datepicker/dist/index.css';
// import '@vuepic/vue-datepicker/dist/main.css'

// import { ref } from 'vue'

function getBrowserLanguage() {
    // return navigator.language.slice(0, 2);
    return navigator.language;
}
</script>
