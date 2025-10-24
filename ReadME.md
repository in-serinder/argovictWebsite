# ArgovictWebsite

### My first blog website is built using Vue 3 + TypeScript + Pinia + axios

![](https://count.getloli.com/get/@:ArgovictWebsite)

### Features

- Concise personal introduction
- Assets details
- Blog showcase
- Project showcase
- Tools showcase

### If you modify the URL in the Pinia store and configure the backend service yourself

- `getdatabyserver.ts`
- `getContentFromServer.ts`

### You need to manually configure the JSON backend. The interface is defined in the configuration file `interface.ts`

```typescript
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
```
