import { defineStore } from 'pinia'
import axios from 'axios'
import type { RawBlogItem, BlogItem } from '@/interfance'

export const useGetDataByServerStore = defineStore('getdatabyserver', {
  state() {
    return {
      isMobile: false,
      blogList: [] as BlogItem[],
    }
  },
  actions: {
    async getDataByDate(date: string) {
      const test: BlogItem[] = [
        {
          title: 'Docker WebTop 云linux桌面搭建',
          date: '2025-08-04',
          author: 'Argovict',
          ID: 'ea4200a3',
          wordCount: 100,
          description: '使用Docker容器快速搭建WebTop云Linux桌面的方法...',
          image:
            'https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAECOWdozk6zquxUWQ68rrzEDg7NTYz0_QACxyAAAtUHcVYRhwElyMl9JDYE.jpg',
          View: 62, // 注意首字母大写，与接口一致
          tags: ['docker', 'webtop', 'linux桌面'], // 字符串数组，与接口一致
        },
      ]

      try {
        const res = await axios.get(`http://8.130.191.142:6324/blog/search/${date}`)
        const resultData = res.data.results.map(
          (item: RawBlogItem) =>
            ({
              title: item.title,
              date: item.date,
              author: item.author,
              ID: item.ID,
              description: item.description,
              image: item.heardImageURL,
              View: item.View,
              tags: item.tags ? JSON.parse(item.tags) : [],
            }) as BlogItem,
        )
        this.blogList = resultData
        console.log(this.blogList)
        return resultData
      } catch (err) {
        console.log(err)
        return test
      }
    },
  },
})
