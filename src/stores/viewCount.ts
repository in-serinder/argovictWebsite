import { defineStore } from 'pinia'
import axios from 'axios'

export const useViewCountStore = defineStore('viewCount', {
  state() {
    return {
        baseURL:'https://argovict.asia/blog-api',
      viewCount: 0,
    }
  },
  actions: {
    async addViewCount(id: string) {
      if (!id) return
      try {
        // console.log('addViewCount', id)
        await axios.get(`${this.baseURL}/blog/count/view/${id}`)
      } catch (error) {
        console.error('Failed to add view count', error)
      }
    },
  },
})
