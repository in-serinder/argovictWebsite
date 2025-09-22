import { defineStore } from 'pinia'
import { ref } from 'vue'
import '@/style/darkMode.css'

export const useDarkModeStore = defineStore('darkmode', {
  state() {
    return {
      isDarkMode: false,
      before: false,
    }
  },
  actions: {
    setDarkMode() {
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('isDark', 'true')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('isDark', 'false')
      }
      console.log(this.isDarkMode)
    },
    switchMode() {
      //   this.isDarkMode = localStorage.getItem('isDark') ? true : false
      //   if (this.isDarkMode === this.before) return
      this.isDarkMode = !this.isDarkMode
      this.setDarkMode()
    },
  },
})
