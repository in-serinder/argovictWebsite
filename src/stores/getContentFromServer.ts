import { defineStore } from 'pinia'

import type { BlogItem, RawBlogItem, TagItem, ProjectItem, ToolItem } from '@/interface'
import { useViewCountStore } from './viewCount'
import axios from 'axios'

// 集中获取服务端api内容
export const useGetContentFromServerStore = defineStore('getContentFromServer', {
  state: () => ({
    blogList: [] as BlogItem[],
    blogAttribut: null as BlogItem | null,
    asPostExist: false,
    asSearchEntrance: false,
    tagList: [] as TagItem[],
    projectList: [] as ProjectItem[],
    toolList: [] as ToolItem[],
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
        document.title = `${this.blogAttribut.author} | ${this.blogAttribut.title}`
        return this.blogAttribut
      } catch (err) {
        console.error('获取博客详情失败:', err)
        this.asPostExist = false
      }
    },

    /*
    获取博客列表
    @returns 博客列表
    */

    async getBlogList() {
      if (this.asSearchEntrance) {
        return this.blogList
      }
      try {
        const res = await axios.get('http://8.130.191.142:6324/master/info/tables/post')
        // console.log(res.data)
        this.blogList = res.data.map(
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

        // 按日期排序
        this.blogList = this.blogList.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        // console.log(this.blogList)
        return this.blogList
      } catch (err) {
        console.error('获取博客列表失败:', err)
      }
    },

    /*
    获取博客标签列表
    @returns 博客标签列表
    */
    async getBlogTagList() {
      try {
        const res = await axios.get('http://8.130.191.142:6324/master/info/tables/tags')
        this.tagList = res.data as TagItem[]
        // console.log(tagList.value)
        return this.tagList
      } catch (err) {
        console.error('获取标签列表失败:', err)
      }
    },

    /*
    *获取项目列表
    @returns 项目列表
     */
    async getProjectList() {
      try {
        const response = await axios.get('http://8.130.191.142:6324/master/info/tables/project')
        this.projectList = response.data.map((item: ProjectItem) => ({
          name: item.name,
          title: item.title,
          description: item.description,
          author: item.author,
          url: item.url,
          version: item.version,
          platform: item.platform.split(','),
          license: item.license,
        }))
        // console.log('projectList', this.projectList);
        return this.projectList
      } catch (error) {
        console.error('获取项目列表失败:', error)
      }
    },

    /*
    获取工具列表
    @returns 工具列表
     */

    async getToolList() {
      try {
        const response = await axios.get('http://8.130.191.142:6324/master/info/tables/tools')
        this.toolList = response.data.map((item: ToolItem) => ({
          name: item.name,
          description: item.description,
          url: item.url,
          version: item.version,
          imageurl: item.imageurl,
        }))
        // console.log('toolList', this.toolList);
        return this.toolList
      } catch (error) {
        console.error('获取工具列表失败:', error)
      }
    },
  },
})
