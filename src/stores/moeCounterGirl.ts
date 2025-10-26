import { defineStore } from 'pinia'

import digital0_d from '@/assets/media/moe_count_girl/0.gif'
import digital1_d from '@/assets/media/moe_count_girl/1.gif'
import digital2_d from '@/assets/media/moe_count_girl/2.gif'
import digital3_d from '@/assets/media/moe_count_girl/3.gif'
import digital4_d from '@/assets/media/moe_count_girl/4.gif'
import digital5_d from '@/assets/media/moe_count_girl/5.gif'
import digital6_d from '@/assets/media/moe_count_girl/6.gif'
import digital7_d from '@/assets/media/moe_count_girl/7.gif'
import digital8_d from '@/assets/media/moe_count_girl/8.gif'
import digital9_d from '@/assets/media/moe_count_girl/9.gif'

import digital0 from '@/assets/media/moe_count_girl/MoeLoli/0.gif'
import digital1 from '@/assets/media/moe_count_girl/MoeLoli/1.gif'
import digital2 from '@/assets/media/moe_count_girl/MoeLoli/2.gif'
import digital3 from '@/assets/media/moe_count_girl/MoeLoli/3.gif'
import digital4 from '@/assets/media/moe_count_girl/MoeLoli/4.gif'
import digital5 from '@/assets/media/moe_count_girl/MoeLoli/5.gif'
import digital6 from '@/assets/media/moe_count_girl/MoeLoli/6.gif'
import digital7 from '@/assets/media/moe_count_girl/MoeLoli/7.gif'
import digital8 from '@/assets/media/moe_count_girl/MoeLoli/8.gif'
import digital9 from '@/assets/media/moe_count_girl/MoeLoli/9.gif'

export const useMoeCounterGirlStore = defineStore('moeCounterGirl', {
  state() {
    return {
      imageList: [] as string[],
      targetElement: null as HTMLElement | null,
      typeDynamic: false,
    }
  },
  actions: {
    getDigitalImage(digital: number) {
      switch (digital) {
        case 0:
          return this.typeDynamic ? digital0_d : digital0
        case 1:
          return this.typeDynamic ? digital1_d : digital1
        case 2:
          return this.typeDynamic ? digital2_d : digital2
        case 3:
          return this.typeDynamic ? digital3_d : digital3
        case 4:
          return this.typeDynamic ? digital4_d : digital4
        case 5:
          return this.typeDynamic ? digital5_d : digital5
        case 6:
          return this.typeDynamic ? digital6_d : digital6
        case 7:
          return this.typeDynamic ? digital7_d : digital7
        case 8:
          return this.typeDynamic ? digital8_d : digital8
        case 9:
          return this.typeDynamic ? digital9_d : digital9
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
    initMoeCounterGirl(targetElement: HTMLElement, type: 'default' | 'MoeLoli') {
      this.imageList = []

      this.typeDynamic = type === 'default' ? false : true
      this.targetElement = targetElement
    },
  },
})
