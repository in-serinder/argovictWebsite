import { defineStore } from 'pinia'
import type { detailWindowItem } from '@/interfance'

// 图片资源
import matrixIcon from '@/assets/svg/matrix.svg'
import gmailIcon from '@/assets/svg/gmail.svg'
import tutaIcon from '@/assets/svg/tuta.svg'

export const useBriefSelfStore = defineStore('briefSelf', {
  state: () => ({
    DetailWindowTitle: 'Contact',
    detialwindowItemList: [] as detailWindowItem[],
    showDetailWindow: false,
  }),
  actions: {
    // 只是展示固定消息，无法作为通用方法
    closeDetailWindow() {
      this.showDetailWindow = false
    },
    openDetailWindow() {
      this.showDetailWindow = true
    },

    showMatrixContent() {
      this.DetailWindowTitle = 'Matrix'

      this.openDetailWindow()
      this.detialwindowItemList = [
        {
          title: 'Matrix.org',
          titleIcon: matrixIcon,
          content: 'matrix.org Contact',
          link: '@serinder_aden:matrix.org',
        },
        {
          title: 'argoland.matrix',
          titleIcon: matrixIcon,
          content: 'argoland.matrix Contact',
          link: '@argovict:argoland.matrix',
        },
      ]
    },
    showEmailContent() {
      this.DetailWindowTitle = 'Email'
      this.openDetailWindow()
      this.detialwindowItemList = [
        {
          title: 'Email',
          titleIcon: gmailIcon,
          content: 'Email Contact',
          link: 'xxxx@gmail.com',
        },
        {
          title: 'Tuta',
          titleIcon: tutaIcon,
          content: 'Tuta Contact',
          link: 'fentanlyum@tuta.com',
        },
      ]
    },
  },
})
