import { defineStore } from 'pinia'
import axios from 'axios'

export const useViewCountStore = defineStore('viewCount', {
  state() {
    return {
      viewCount: 0,
    }
  },
  actions: {
    async addViewCount(id: string) {
      if (!id) return
      try {
        // console.log('addViewCount', id)
        await axios.get(`http://8.130.191.142:6324/blog/count/view/${id}`)
      } catch (error) {
        console.error('Failed to add view count', error)
      }
    },
  },
})
