import { defineStore } from 'pinia'
import { computed } from 'vue'

const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g
const englishRegex = /-([a-z])/g

export const useScrollStore = defineStore('scroll', {
  state() {
    return {
      scrollTop: 0,
      targetID: '',
    }
  },
  actions: {
    /*描点相关start*/

    // 滚动到指定锚点
    handleAnchorClick(e: MouseEvent) {
      const targetElement = e.target as Element | null

      const target = targetElement?.closest('a[href^="#"]') // 匹配以#开头的链接
      if (target) {
        e.preventDefault() // 阻止默认跳转（避免路由刷新）

        const hash = target.getAttribute('href')
        // 更新URL的hash（会触发上面的watch）
        window.location.hash = String(hash)
      }
    },

    scrollToAnchor(hash: string) {
      const container = document.getElementById('blogContainer')

      if (!hash) {
        return
      }

      // const targetID = hash
      //   .replace('#', '')
      //   .replace(chineseRegex, '')
      //   // .replace(englishRegex, (match, p1) => '-' + p1.toUpperCase())
      //   .replace(englishRegex, (match, p1) => '-' + p1.toLowerCase())

      // 如果全中文

      // console.log(targetID);
      this.buildTargetID(hash)
      // console.log('hash', hash)
      // console.log('hashtoID', this.targetID)

      // 目标id为描点终点，
      const targetElement = document.getElementById(this.targetID)
      if (targetElement) {
        // targetElement.scrollIntoView({
        //     block: 'start',
        //     behavior: 'smooth'
        // });
        container?.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        })
      }
    },

    buildTargetID(hash: string) {
      this.targetID = hash
      // .replace('#', '') //大标题标签
      // .replace(chineseRegex, '') //去中文
      // .replace(englishRegex, (match, p1) => '-' + p1.toUpperCase())
      // .replace(englishRegex, (match, p1) => '-' + p1.toLowerCase())

      // 第二部
      this.targetID = hash
        .replace(/^#+\s*/, '')
        .replace(chineseRegex, '')
        .split('-')
        .map((word) => {
          if (/^\d+$/.test(word)) {
            return word
          }
          return word.toLocaleLowerCase()
        })
        .join('-')
        .replace(/(?<=\d)-(?=\s*$)/, '')
      // .replace(englishRegex, (match, p1) => {
      //   return match.charAt(0) + p1.toUpperCase()
      // })
      // .replace('-', '')
    },
  },
})
