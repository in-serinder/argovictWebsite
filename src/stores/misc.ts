import { defineStore } from 'pinia'

/**
 * 存放小控件Store
 */

export const useMiscStore = defineStore('misc', {
  state() {
    return {
      isMobile: false,
    }
  },

  actions: {
    printWindow(printPageId: string) {
      const targetElement = document.getElementById(printPageId)
      if (!targetElement) {
        console.error(`未找到 ID 为 ${printPageId} 的元素`)
        return
      }

      const originalContent = document.body.innerHTML

      const printContainer = document.createElement('div')
      printContainer.innerHTML = targetElement.outerHTML
      document.body.innerHTML = printContainer.innerHTML

      window.print()

      setTimeout(() => {
        document.body.innerHTML = originalContent
        window.dispatchEvent(new Event('load'))
      }, 0)
      //   window.print()
      //   console.log('打印')
    },
    async shareWebPage(className: string) {
      try {
        const URL = window.location.href
        console.log(className)
        const classObj = document.getElementsByClassName(className)
        await navigator.clipboard.writeText(URL)
        classObj[0].classList.add('shared')
        setTimeout(() => {
          classObj[0].classList.remove('shared')
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
