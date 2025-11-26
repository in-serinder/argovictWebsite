<template>
    <div class="examQPage">
        <div class="examQPage-container">
            <!-- 进度条 -->
            <div class="examQPage-progress">
                <!-- 进度条 -->
                <div class="examQPage-progress-bar"
                    :style="{ width: (currentQuestion?.questionnum ? currentQuestion?.questionnum : 0) / radioCount * 100 + '%' }">
                </div>
                <!-- 进度提示 -->
                <p>当前进度：{{ currentQuestion?.questionnum }}/{{ radioCount }}</p>
            </div>
            <!-- 题目 -->
            <div class="examQPage-question">
                <div class="examQPage-question-container">
                    <!-- 题目 -->
                    <h3>{{ currentQuestion?.questionnum }}. {{ currentQuestion?.question }}</h3>
                    <p>Archive - {{ currentQuestion?.standard }} - {{ currentQuestion?.answer.length ?
                        currentQuestion?.answer.length > 1 ? '多选题' : '单选题' :
                        '单选题' }}</p>
                    <br>
                    <!-- 选项 -->
                    <ul>
                        <li v-for="(option, index) in currentQuestion?.options" :key="index"
                            :id="'option-' + String.fromCharCode(65 + index)"
                            @click="verifyAnswer(String.fromCharCode(65 + index), 'option-' + String.fromCharCode(65 + index))">
                            {{ String.fromCharCode(65 + index) }}. {{ option }}
                        </li>
                    </ul>

                    <!-- 答案与解析 -->
                    <div class="examQPage-answer-container" v-if="getQuestionFromServerStore.showAnswer">
                        <!-- 答案 -->
                        <p>正确答案：{{ currentQuestion?.answer.join('') }}</p>
                        <p>您的选择：{{ getQuestionFromServerStore.selectedOptions.join('') }}</p>
                        <!-- 解析 -->
                        <p>{{ currentQuestion?.question }}:</p>
                        <p style="margin-left: 20px;" v-for="(item, index) in currentQuestion?.answer" :key="index">
                            {{ currentQuestion?.options?.at(item.charCodeAt(0) - 65) }}</p>
                    </div>
                    <!-- 选项 -->
                    <div class="examQPage-option-container">
                        <button @click="getQuestionFromServerStore.getPreviousQuestion">上一题</button>
                        <!-- 多选题提供提交按钮 -->
                        <button
                            v-show="currentQuestion?.answer.length && currentQuestion?.answer.length > 1 || !getQuestionFromServerStore.isSkipRight"
                            @click="getQuestionFromServerStore.verifySubmit">{{ $t('message.submit') }}</button>
                        <button @click="shuffleOptions"
                            :style="{ 'background-color': getQuestionFromServerStore.isShuffled ? '#721c24' : '#007bff' }">打乱选项</button>
                        <button @click="toggleSkipRight"
                            :style="{ 'background-color': getQuestionFromServerStore.isSkipRight ? '#721c24' : '#007bff' }">单选答案正确自动跳过</button>
                        <button @click="getQuestionFromServerStore.getNextQuestion">下一题</button>
                        <!-- <p>选项A：这是一个关于业余无线电A的选项A，是正确的。</p> -->
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import '@/style/Tools/examQPage.css'
import { useGetQuestionFromServerStore } from '@/stores/examback'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { ExamQItem } from '@/stores/examback'
import { nextTick } from 'process'

const radioCount = ref(512)
const getQuestionFromServerStore = useGetQuestionFromServerStore()
const router = useRouter()
const route = useRoute()



const currentQuestion = ref<ExamQItem>()

window.document.title = `argovict - 考试 业余无线电A - ${currentQuestion.value?.questionnum}`

const verifyAnswer = (selectedAnswer: string, id: string) => {

    if (!getQuestionFromServerStore.isMultiChoice) {
        getQuestionFromServerStore.initQuestion()
        document.getElementById(id)?.classList.add('selected')
        getQuestionFromServerStore.selectedOptions = [selectedAnswer]
        autoSkip()
        return
    }


    // 多选题需要判断是否选择了所有选项
    if (currentQuestion.value?.options.length && currentQuestion.value?.options.length > 1) {

        // 如果取消选择
        if (getQuestionFromServerStore.selectedOptions.includes(selectedAnswer)) {
            getQuestionFromServerStore.selectedOptions = getQuestionFromServerStore.selectedOptions.filter((item) => item !== selectedAnswer)
            document.getElementById(id)?.classList.remove('selected')
            return
        }


        // 推入选中的选项id
        getQuestionFromServerStore.selectedOptions.push(selectedAnswer)
        // 选项添加选中类
        // console.log(selectedAnswer, id)
        document.getElementById(id)?.classList.add('selected')



        if (selectedAnswer.length !== currentQuestion.value?.answer.length) {
            getQuestionFromServerStore.showAnswer = false
            return
        }
    }

}

const toggleSkipRight = () => {
    getQuestionFromServerStore.isSkipRight = !getQuestionFromServerStore.isSkipRight

}

const shuffleOptions = () => {
    getQuestionFromServerStore.isShuffled = !getQuestionFromServerStore.isShuffled

}

const autoSkip = () => {
    if (getQuestionFromServerStore.isSkipRight && !getQuestionFromServerStore.isMultiChoice) {


        // 答案正确
        if (getQuestionFromServerStore.selectedOptions[0] === getQuestionFromServerStore.correctAnswer[0]) {
            getQuestionFromServerStore.showCorrectAnswer()
            getQuestionFromServerStore.getNextQuestion()
            return
        }

        // 答案不正确
        getQuestionFromServerStore.showCorrectAnswer()
        // 直接全错。后续自动纠正,后续有把结果中和正确答案匹配的移除
        getQuestionFromServerStore.incorrectOptions = ['A', 'B', 'C', 'D']

    }
}


onMounted(() => {

    // 当挂载就查看是什么类型的考试
    switch (true) {
        case route.query.type === 'radioA':
            getQuestionFromServerStore.examType = 'radioA'
            radioCount.value = 512
            break
        case route.query.type === 'iotchoice':
            getQuestionFromServerStore.examType = 'IOTRadio'
            radioCount.value = 620
            break
        case route.query.type === 'iotradio':
            getQuestionFromServerStore.examType = 'IOTJudge'
            break
    }







    setTimeout(() => {


        // 从url获取题目编号
        if (route.query.question) {
            // getQuestionFromServerStore.currentQuestionNum = Number(route.query.question)
            getQuestionFromServerStore.currentQuestionNum = Number(route.query.question)
            getQuestionFromServerStore.getExamQList(route.query.question as string)
            // 读取配置，当有query参数时，从query中获取题目编号
            getQuestionFromServerStore.readExamConfig(true)
            return
        }

        // 当没有query参数时，默认从1开始
        getQuestionFromServerStore.readExamConfig(false)

        // 配置
        // skipRight.value = getQuestionFromServerStore.isSkipRight
        // 从配置获取题目编号
        if (getQuestionFromServerStore.currentQuestionNum) {
            getQuestionFromServerStore.getExamQList(getQuestionFromServerStore.currentQuestionNum.toString())

            return
        }

        getQuestionFromServerStore.getExamQList('1')
        nextTick(() => {
            // correctAnswer.value = [...(currentQuestion.value?.answer ?? '').split('')].sort()
            //     console.log(correctAnswer.value)
        })
    }, 1000)

})







watch(() => getQuestionFromServerStore.examQList, (newVal) => {
    // if (newVal.length > 0) {


    currentQuestion.value = newVal[newVal.length - 1]

    nextTick(() => {

        // getQuestionFromServerStore.correctAnswer = [...(currentQuestion.value?.answer ?? '').split('')].sort()
        // getQuestionFromServerStore.correctAnswer =

        // console.log(correctAnswer.value)
    })

}, { immediate: true, deep: true })

watch(() => getQuestionFromServerStore.currentQuestionNum, (newVal) => {
    router.push({
        name: 'examQPage',
        query: {
            ...route.query,
            question: newVal,
        },
    })
    // console.log(newVal)
})

// watch(() => getQuestionFromServerStore.selectedOptions, (newVal) => {
//     if(getQuestionFromServerStore.isMultiChoice) {
//         return
//     }
// })

</script>
