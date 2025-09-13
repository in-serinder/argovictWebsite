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
