// import { Token, Renderer } from 'markdown-it'

export interface Post {
  id: number
  title: string
  content: string
  date: string
  tags: string[]
}

export interface Project {
  id: number
  title: string
  content: string
  projectLink: string
  platform: string[]
  projectName: string
}

// declare module 'markdown-it' {
//   interface Renderer {
//     renderChildren(tokens: Token[], idx: number, options: any, env: any): string
//   }
// }
