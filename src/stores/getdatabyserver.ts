import { defineStore } from 'pinia'
import axios from 'axios'
import type { RawBlogItem, BlogItem, SearchResult } from '@/interface'
import router from '@/router'

/**
 * 主要用于主动搜索
 */

export const useGetDataByServerStore = defineStore('getdatabyserver', {
  state() {
    return {
      isMobile: false,
      blogList: [] as BlogItem[],
      searchResult: {} as SearchResult,
      searchKeyword: '',
    }
  },
  actions: {
    /**
     * 主动搜索博客
     * @param keyword 搜索关键词
     */
    async getBlogBySearch(keyword: string) {
      try {
        const res = await axios.get(`http://8.130.191.142:6324/blog/search/${keyword}`)
        // console.log(res.data)
        // this.searchResult = res.data //原始数据
        // console.log('原始数据', this.searchResult)
        const resultData = res.data.results.map(
          //返回的是结果数组
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
        this.searchResult.keyword = res.data.keyword
        this.searchResult.results = resultData
        this.searchResult.total = resultData.length
        this.searchResult.success = resultData.length > 0 ? true : false
        this.blogList = resultData

        // 跳转搜索结果页
        router.push({
          name: 'blog',
          query: {
            search: keyword,
          },
        })

        return this.searchResult
        // return resultData
      } catch (err) {
        console.log(err)
      }
    },
  },
})
