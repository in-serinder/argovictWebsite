// import { Token, Renderer } from 'markdown-it'
import Artalk from 'artalk'

// export interface Post {
//   id: number
//   title: string
//   content: string
//   date: string
//   tags: string[]
// }

// export interface Project {
//   id: number
//   title: string
//   content: string
//   projectLink: string
//   platform: string[]
//   projectName: string
// }

export interface RawBlogItem {
  title: string
  date: string
  author: string
  ID: string
  description: string
  heardImageURL: string
  View: number
  wordCount: number
  tags: string
}

export interface BlogItem {
  ID: string
  title: string
  description: string
  author: string
  image: string
  View: number
  date: string
  wordCount: number
  tags: string[]
}

export interface ProjectItem {
  name: string
  title: string
  description: string
  author: string
  url: string
  version: string
  platform: string
  license: string
}

export interface ToolItem {
  name: string
  description: string
  url: string
  version: string
  imageurl: string
}

export interface TagItem {
  name: string
  count: number
}

export interface SearchResult {
  keyword: string
  results: BlogItem[]
  total: number
  success: boolean
}

export interface asset {
  tagsIcon?: string
  link?: string
  description: string
}

export interface detailWindowItem {
  title: string
  titleIcon: string
  content?: string
  link?: string
  linkcontent?: string
}

export interface ArtalkConfig {
  plugins?: Array<(artalk: Artalk) => void>
}

// 委托页面类型控件
export interface CheckBox {
  item: string
  description?: string
  subitems: string[]
  checked: boolean[]
}

export interface Radio {
  item: string
  description?: string
  subitems: string[]
  checked: number
}

export interface SingleRadio {
  item: string
  description?: string
  selected: string
}

export interface TypeArea {
  item: string
  itemType: 'number' | 'content'
  description?: string
  number: number
  content?: string
}

export interface Table {
  tablename: string
  tableheader: string[]
  tablecontent: string[][]
}

export interface ImageRadio {
  item: string
  description?: string
  subitems: {
    item: string
    imageurl: string
  }[]
  checked: number
}
