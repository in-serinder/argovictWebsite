<template>
    <div class="commission-requirement-table">
        <!-- 表单标题 -->
        <h3>{{ config.tablename }}</h3>
        <!-- 标题头 -->
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in config.tableheader" :key="index">{{ item }}</th>
                </tr>
            </thead>

            <!-- 内容 -->
            <tbody>
                <tr v-for="(item, index) in config.tablecontent" :key="index">
                    <td v-for="(value, index) in item" :key="index">{{ item[index] }}</td>
                </tr>


            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import '@/style/Commission/Components/commissionRequirementTable.css'
import type { Table } from '@/interface'
import { ref } from 'vue'

// const config = ref<Table>({
//     tablename: "Table",
//     tableheader: ["Requirement", "Description", "Example"],
//     tablecontent: [
//         ["Requirement 1", "Description 1", "Example 1"],
//         ["Requirement 2", "Description 2", "Example 2"],
//         ["Requirement 3", "Description 3", "Example 3"],
//         ["Requirement 4", "Description 4", "Example 4"],
//         ["Requirement 5", "Description 5", "Example 5"],
//     ],
// })

const config = ref<Table>({
    tablename: "软件定制需求清单",
    tableheader: ["需求项", "详细描述", "示例/备注"],
    tablecontent: [
        [
            "用户登录模块",
            "支持手机号验证码、微信扫码两种登录方式，需记住登录状态7天",
            "示例：点击「微信登录」弹出二维码，扫码后自动跳转首页"
        ],
        [
            "数据导出功能",
            "支持将表格数据导出为Excel格式，包含筛选后的当前页数据",
            "示例：点击「导出」按钮后，10秒内下载名为「2024-11-04数据.xlsx」的文件"
        ],
        [
            "权限管理",
            "区分管理员、普通用户、访客三种角色，限制不同角色操作权限",
            "示例：访客仅可查看数据，管理员可删除/编辑所有内容"
        ],
        [
            "图表展示",
            "将月度数据以折线图、饼图形式可视化，支持切换时间维度（周/月/年）",
            "示例：点击「饼图」按钮，自动切换展示各分类占比分布"
        ],
        [
            "消息通知",
            "当有新数据录入时，向指定用户推送站内消息+邮件提醒",
            "示例：新订单产生后，管理员收到「有新订单待处理」的通知"
        ]
    ]
});

</script>
