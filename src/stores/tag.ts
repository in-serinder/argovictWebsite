import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BlogItem } from '@/interfance'

export const useTagStore = defineStore('tag', () => {
  const currentBlog = ref<BlogItem | null>(null)

  const parsedTags = computed(() => {
    if (!currentBlog.value) return []

    try {
      const tags = JSON.parse(currentBlog.value.tags)

      return Array.isArray(tags) ? tags : []
    } catch (error) {
      console.error('标签解析失败:', error)
      return []
    }
  })

  const setCurrentBlog = (blog: BlogItem) => {
    currentBlog.value = blog
  }

  const clearCurrentBlog = () => {
    currentBlog.value = null
  }

  return {
    currentBlog,
    parsedTags,
    setCurrentBlog,
    clearCurrentBlog,
  }
})
