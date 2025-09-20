import { defineStore } from 'pinia'
import { computed } from 'vue'

const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g
const englishRegex = /-([a-z])/g

export const useScrollStore = defineStore('scroll', {
  state() {
    return {
      scrollTop: 0,
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

      const targetID = hash
        .replace('#', '')
        .replace(chineseRegex, '')
        .replace(englishRegex, (match, p1) => '-' + p1.toUpperCase())
      // console.log(targetID);
      console.log('hash', hash)
      console.log('hashtoID', targetID)

      // 目标id为描点终点，
      const targetElement = document.getElementById(targetID)
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
  },
})
