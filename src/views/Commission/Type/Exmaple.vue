<template>
    <div class="commission-requirements-type-exmaple">
        <!-- <div class="commission-requirements-type-exmaple-container">
            <h2>Example</h2>
            <p>Web Design, Web Development, Graphic Design</p>
        </div> -->
        <CheckBox></CheckBox>
        <Radio></Radio>
        <SingleRadio></SingleRadio>
        <TypeArea></TypeArea>
        <Table></Table>
        <ImageRadio></ImageRadio>
        <Remarks></Remarks>
        <!-- 占位 -->
        <div style="height: 100px;"> </div>
    </div>
</template>

<script lang="ts" setup>
import CheckBox from '@/components/Commission/RequirementItem/CheckBox.vue';
import Radio from '@/components/Commission/RequirementItem/Radio.vue';
import SingleRadio from '@/components/Commission/RequirementItem/SingleRadio.vue';
import Remarks from '@/components/Commission/RequirementItem/Remarks.vue';
import TypeArea from '@/components/Commission/RequirementItem/TypeArea.vue';
import Table from '@/components/Commission/RequirementItem/Table.vue';
import ImageRadio from '@/components/Commission/RequirementItem/ImageRadio.vue';

</script>