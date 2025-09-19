import { defineStore } from 'pinia'
import axios from 'axios'

// 明确定义方法类型
interface ViewCountActions {
  addViewCount: (id: string) => Promise<void>
}

export const useViewCountStore = defineStore<'viewCount', {}, {}, ViewCountActions>('viewCount', {
  actions: {
    async addViewCount(id: string) {
      if (!id) return
      try {
        console.log('addViewCount', id)
        await axios.get(`http://8.130.191.142:6324/blog/count/view/${id}`)
      } catch (error) {
        console.error('Failed to add view count', error)
      }
    },
  },
})
