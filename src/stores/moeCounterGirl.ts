import { defineStore } from 'pinia'

import digital0 from '@/assets/media/moe_count_girl/0.gif'
import digital1 from '@/assets/media/moe_count_girl/1.gif'
import digital2 from '@/assets/media/moe_count_girl/2.gif'
import digital3 from '@/assets/media/moe_count_girl/3.gif'
import digital4 from '@/assets/media/moe_count_girl/4.gif'
import digital5 from '@/assets/media/moe_count_girl/5.gif'
import digital6 from '@/assets/media/moe_count_girl/6.gif'
import digital7 from '@/assets/media/moe_count_girl/7.gif'
import digital8 from '@/assets/media/moe_count_girl/8.gif'
import digital9 from '@/assets/media/moe_count_girl/9.gif'

export const useMoeCounterGirlStore = defineStore('moeCounterGirl', {
  state() {
    return {
      imageList: [] as string[],
      targetElement: null as HTMLElement | null,
    }
  },
  actions: {
    getDigitalImage(digital: number) {
      switch (digital) {
        case 0:
          return digital0
        case 1:
          return digital1
        case 2:
          return digital2
        case 3:
          return digital3
        case 4:
          return digital4
        case 5:
          return digital5
        case 6:
          return digital6
        case 7:
          return digital7
        case 8:
          return digital8
        case 9:
          return digital9
        default:
          return digital0
      }
    },
    getImageListByDigital(digital: number) {
      let digitalStr = digital.toString()

      // 至少7位数字
      if (digitalStr.length < 7) {
        digitalStr = '0'.repeat(7 - digitalStr.length) + digitalStr
      }
      //   console.log(digitalStr)

      for (let i = 0; i < digitalStr.length; i++) {
        const char = digitalStr.charAt(i)
        this.imageList.push(this.getDigitalImage(parseInt(char)))
      }
      return this.imageList
    },
    createCounterWidget() {
      if (!this.targetElement) {
        console.error('目标元素未设置')
        return
      }
      this.targetElement.innerHTML = ''
      this.imageList.forEach((imgSrc) => {
        const img = document.createElement('img')
        img.src = imgSrc
        img.alt = 'Number'
        this.targetElement?.appendChild(img)
      })
      this.targetElement.classList.add('moe-counter')
    },
    initMoeCounterGirl(targetElement: HTMLElement) {
      this.imageList = []

      this.targetElement = targetElement
    },
  },
})
