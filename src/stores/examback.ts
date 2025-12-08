import { defineStore } from 'pinia'

import axios from 'axios'

// 单独定义数据类型
export interface ExamQItem {
  id: string
  questionnum: number
  standard: string
  question: string
  options: string[]
  answer: string[]
}

export interface aiQExplainItem {
  questionnum: number
  question: string
  explanation: string
}

// 用布尔数组实现选项判断可能跟简单

// 集中获取服务端api内容
export const useGetQuestionFromServerStore = defineStore('getQuestionFromServer', {
  state: () => ({
    examQList: [] as ExamQItem[],
    selectedOptions: [] as string[],
    incorrectOptions: [] as string[],
    correctAnswer: [] as string[],
    shuffledIndex: [] as number[],
    currentOptions: [] as string[],
    aiQExplain: {} as aiQExplainItem,
    examType: 'radioA', //默认无线电考试
    currentQuestionNum: 0,
    showAnswer: false,
    isShuffled: false,
    isSkipRight: false,
    isMultiChoice: false,
  }),
  actions: {
    async getExamQList(questionnum: string) {
      try {
        const res = await axios.get(
          `http://8.130.191.142:6324/exam/${this.examType}/questionnum/${questionnum}`,
        )
        // console.log(res.data)
        console.log(this.examType)

        if (res.status === 200) {
          const examQList = {
            id: res.data.id,
            questionnum: res.data.questionnum,
            standard: res.data.standard,
            question: res.data.question,
            options: [res.data.A, res.data.B, res.data.C, res.data.D],
            answer: res.data.answer.split(''),
          }
          // 判断是否多选题和数组答案

          this.correctAnswer = examQList.answer
          this.currentOptions = examQList.options
          if (this.isShuffled) {
            this.shuffleOptions()
            examQList.options = this.currentOptions
            examQList.answer = this.correctAnswer
          }
          this.isMultiChoice = this.correctAnswer.length > 1 ? true : false
          this.examQList.push(examQList)
          // 参与ai解析
          this.getAIQExplain(examQList.questionnum)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getAIQExplain(questionnum: number) {
      try {
        const res = await axios.get(
          `http://8.130.191.142:6324/exam/ai/parse/${this.examType}/questionnum/${questionnum}`,
        )
        if (res.status === 200) {
          this.aiQExplain = {
            questionnum: res.data.questionnum,
            question: res.data.question,
            explanation: res.data.analysis,
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    showCorrectAnswer() {
      // console.log('正确答案:', this.correctAnswer)
      // console.log('选择答案:', this.selectedOptions)
      // console.log('错误选项:', this.incorrectOptions)

      this.showAnswer = true
      //   排序去重
      this.selectedOptions.sort()
      this.selectedOptions = [...new Set(this.selectedOptions)]

      // 标注错误选项
      this.incorrectOptions.forEach((item) => {
        document.getElementById('option-' + item)?.classList.add('incorrect')
      })
      // 标注选择选项
      this.selectedOptions.forEach((item) => {
        document.getElementById('option-' + item)?.classList.add('selected')
      })

      // 标注正确选项
      this.correctAnswer.forEach((item) => {
        document.getElementById('option-' + item)?.classList.add('right')
      })
    },
    verifySubmit() {
      //独立
      this.incorrectOptions = []

      const sortedCorrect = [...this.correctAnswer].sort()
      const sortedSelected = [...this.selectedOptions].sort()

      // 答案为空的处理
      if (sortedSelected.length === 0) {
        this.showAnswer = true
        this.showCorrectAnswer()
        return
      }

      // 准确性判断（用排序后的数组对比）
      const isCorrect =
        sortedCorrect.length === sortedSelected.length &&
        sortedCorrect.every((item, index) => item === sortedSelected[index])

      if (isCorrect) {
        this.showAnswer = true // 正确时也显示答案
        this.showCorrectAnswer()
        return
      }

      // 错误选项收集（用排序后的数组计算）
      const wrongSelected = sortedSelected.filter((item) => !sortedCorrect.includes(item))
      const missedCorrect = sortedCorrect.filter((item) => !sortedSelected.includes(item))
      this.incorrectOptions = [...wrongSelected, ...missedCorrect]

      this.incorrectOptions = this.incorrectOptions.filter((item) => !sortedCorrect.includes(item))

      this.showAnswer = true
      this.showCorrectAnswer()
    },
    initQuestion() {
      this.selectedOptions = []
      this.incorrectOptions = []
      this.showAnswer = false
      // 重置选项类
      document.querySelectorAll('.examQPage-question ul li').forEach((item) => {
        item.classList.remove('selected')
        item.classList.remove('incorrect')
        item.classList.remove('right')
        // item.classList.add('init')
      })
    },
    getNextQuestion() {
      this.currentQuestionNum++
      this.getExamQList(this.currentQuestionNum.toString())
      this.initQuestion()

      // 保存配置
      this.saveExamConfig()
    },
    getPreviousQuestion() {
      if (this.currentQuestionNum === 1) {
        return
      }
      this.currentQuestionNum--
      this.getExamQList(this.currentQuestionNum.toString())
      this.initQuestion()
      // 保存配置
      this.saveExamConfig()
    },
    /**
     * 混合选项
     */

    // 为原选项建立一个初始索引
    // 为正确答案建立一个索引映射
    shuffleOptions() {
      // 当前题目正确选项处于store内
      // 当前题目选项处于vue组件内

      if (!this.currentOptions || !Array.isArray(this.currentOptions)) {
        return this.currentOptions || []
      }

      const Index = Array.from({ length: this.currentOptions.length }, (v, i) => i) //自动生成索引数组[0,1,2,3]

      for (let i = Index.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[Index[i], Index[j]] = [Index[j], Index[i]]
      }
      this.shuffledIndex = Index
      // 选项
      const shuffledOptions = Index.map((index) => this.currentOptions[index])
      // 答案 ASCII码映射
      this.correctAnswer = this.correctAnswer
        .map((letter) => {
          const originalIndex = letter.toUpperCase().charCodeAt(0) - 65
          const newIndex = Index.indexOf(originalIndex)
          return String.fromCharCode(65 + newIndex)
        })
        .sort()

      // console.log('索引', Index)
      // console.log('正确答案', this.correctAnswer)
      // console.log('选项', shuffledOptions)

      // 用索引数组重新排序选项
      // options = Index.map((index) => options[index])
      // for (let i = 0; i < this.correctAnswer.length; i++) {
      // options[i] = options[Index[i]]
      //   const answerDiff = this.correctAnswer[i].toUpperCase().charCodeAt(0) - 65
      //   for (let j = 0; j < Index.length; j++) {
      //     if (Index[j] === answerDiff) {
      //       this.correctAnswer[i] = String.fromCharCode(65 + Index[i])
      //     }
      //   }
      // }

      this.currentOptions = shuffledOptions
    },

    /**
     * 报错配置
     */
    saveExamConfig() {
      localStorage.setItem(
        'examconfig',
        JSON.stringify({
          isShuffled: this.isShuffled,
          skipRight: this.isSkipRight,
          questionNum: this.currentQuestionNum,
        }),
      )
    },
    readExamConfig(asqurey: boolean) {
      const config = localStorage.getItem('examconfig')
      if (config) {
        const { isShuffled, skipRight, questionNum } = JSON.parse(config)
        this.isShuffled = isShuffled
        this.isSkipRight = skipRight
        if (!asqurey) {
          this.currentQuestionNum = questionNum
        }

        console.log(isShuffled, skipRight, questionNum)
        return
      }
      // 当没有配置时，默认从1开始
      this.currentQuestionNum = 1
    },
  },
})
