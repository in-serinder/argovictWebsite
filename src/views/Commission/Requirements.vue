<template>
    <div class="commission-requirements">
        <div class="commission-requirements-container">
            <!-- <h2>Requirements</h2> -->
            <!-- 需求列表 -->
            <div class="commission-requirements-list">

                <Exmaple></Exmaple>


            </div>
            <!-- 底部报价栏 -->
            <div class="commission-requirements-bottom">
                <!-- 此处为row-reverse -->
                <!-- 交互：生成报表，保存报表 -->
                <div class="commission-requirements-bottom-interaction">
                    <button style="background-color: #3673fe; color: #fff;">Generate Report</button>
                    <button>Save Report</button>
                </div>
                <!-- 报价 -->
                <span class="commission-requirements-bottom-price">
                    <em>Estimated Price:</em>
                    $1000 - $5000
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/commissionRequirements.css'
import Exmaple from './Type/Exmaple.vue';

</script>