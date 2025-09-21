import { defineStore } from 'pinia'
import { ref } from 'vue'

const left = ref(0)

export const useStyleStore = defineStore('style', {
  state() {
    return {
      isMobile: false,
    }
  },
  actions: {
    changeToLeft(val: number) {
      left.value += val

      const board = document.querySelector('.commission-board-scroll ul') as HTMLElement
      if (left.value > 300) {
        left.value = 0
      }
      board.style.transform = `translateX(${-left.value}%)`
    },
    whenPageChange(container: string) {
      const page = document.getElementById(container)
      if (page) {
        page.style.animation = 'heidinleft 0.5s ease-in-out'
      }
    },
  },
})
