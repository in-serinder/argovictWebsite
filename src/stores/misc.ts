import { defineStore } from 'pinia'

export const useMiscStore = defineStore('misc', {
  state() {
    return {
      isMobile: false,
    }
  },

  actions: {
    printWindow() {
      window.print()
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
