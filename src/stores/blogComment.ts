import { defineStore } from 'pinia'
import { ArtalkKatexPlugin } from '@artalk/plugin-katex'
import { ArtalkAuthPlugin } from '@artalk/plugin-auth'
import Artalk, { type CommentData } from 'artalk'

import bfg from '@/assets/picture/default_avatar_alpha.jpg.png'

declare module 'artalk' {
  export interface ArtalkConfig {
    plugins?: Array<(artalk: Artalk) => void>
  }
}

/**
 * 存放博客评论Store
 */

export const useBlogCommentStore = defineStore('blogComment', {
  state: () => ({}),
  actions: {
    /*
     *初始化第三方评论插件
     */
    initArtalk(postTitle: string) {
      Artalk.init({
        el: document.getElementById('commit') as HTMLElement,
        // pageKey: `/blog/detail/${blogID.value}`,
        pageKey: window.location.pathname,
        pageTitle: postTitle,
        // server: '/api',  //使用了vite代理 开发环境
        server: 'http://8.130.191.142', //生产环境
        site: 'blog',
        useBackendConf: true,
        plugins: [
          // @ts-ignore
          ArtalkKatexPlugin,
          // @ts-ignore
          ArtalkAuthPlugin,
        ],
        imgUpload: true,
        avatarURLBuilder: (comment: CommentData) => {
          if (comment.email_encrypted) {
            return bfg
          }
          return bfg
        },
        emoticons:
          'https://raw.githubusercontent.com/argovict/jsoncdn/refs/heads/main/default.json',
      })
    },
  },
})
