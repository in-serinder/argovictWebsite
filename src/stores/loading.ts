// stores/loading.ts
import { defineStore } from 'pinia'

// 聘用vue3 @load函数，用于监听图片加载完成

export const useLoadingStore = defineStore('loading', {
  state() {
    return {
      totalImage: 0, // 初始化时设为0，后续动态更新
      totalImageList: [] as HTMLImageElement[],
      allLoaded: false,
      loaded: 0,
      observer: null as MutationObserver | null,
    }
  },

  /**
   * 统计图片资源
   * 完成加载叠加
   */
  actions: {
    initTotalImage(target: HTMLElement) {
      this.totalImage = 0
      this.loaded = 0
      this.allLoaded = false

      this.totalImageList = Array.from(target.querySelectorAll('img')) as HTMLImageElement[]
      this.totalImage = this.totalImageList.length

      this.totalImageList.forEach((img) => {
        img.removeEventListener('load', this.imageLoadCount)
        img.addEventListener('load', this.imageLoadCount.bind(this))

        if (img.complete) {
          // console.log(img.src)
          this.imageLoadCount()
        }
      })
    },
    imageLoadCount() {
      // 等待浏览器完成渲染后再计数
      requestAnimationFrame(() => {
        if (this.loaded >= this.totalImage) {
          this.loaded = this.totalImage
          return
        }
        this.loaded++
        if (this.loaded === this.totalImage) {
          this.allLoaded = true
          console.log('所有图片加载并渲染完成')
        }
      })
    },
  },
})
