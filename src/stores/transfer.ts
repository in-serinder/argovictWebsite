import { defineStore ,mapActions} from 'pinia'
import { ref } from 'vue'

// 用于对.vue内setup函数中转对全局的组件调用 解决父子链式传参

export const useTransfer = defineStore('transfer', {
  state() {
    return {
      
    }
  },
  actions: {

  },
})
