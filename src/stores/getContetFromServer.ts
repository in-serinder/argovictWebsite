import { defineStore } from 'pinia'

import type { BlogItem } from '@/interfance'
import { useViewCountStore } from './viewCount'
import axios from 'axios'

// 集中获取服务端api内容
export const useGetContetFromServerStore = defineStore('getContetFromServer', {
  state: () => ({
    blogList: [] as BlogItem[],
    blogAttribut: null as BlogItem | null,
    asPostExist: false,
  }),
  actions: {
    /*
    获取单篇博客详情
    @param id 博客ID
    @returns 博客详情
    */
    async getBlogDetail(id: string) {
      const viewCountStore = useViewCountStore()
      try {
        const res = await axios.get(`http://8.130.191.142:6324/blog/info/${id}`)
        // console.log(res.data)
        // console.log("huoq", res)
        // blogID.value = res.data.ID
        this.blogAttribut = res.data as BlogItem
        viewCountStore.addViewCount(this.blogAttribut.ID)
        this.asPostExist = true
        // console.log(this.blogAttribut)
        return this.blogAttribut
      } catch (err) {
        console.log(err)
        this.asPostExist = false
      }
    },
  },
})
