import { defineStore } from 'pinia'

/**
 * 存放小控件Store
 */

export const useMiscStore = defineStore('misc', {
  state() {
    return {
      isMobile: false,
      blogListLoaded: false,
      isImageDetailShow: false,
      imageDetailUrl: '',
    }
  },

  actions: {
    printWindow(printPageId: string) {
      const targetElement = document.getElementById(printPageId)
      if (!targetElement) {
        console.error(`未找到 ID 为 ${printPageId} 的元素`)
        return
      }

      const originalContent = document.body.innerHTML

      const printContainer = document.createElement('div')
      printContainer.innerHTML = targetElement.outerHTML
      document.body.innerHTML = printContainer.innerHTML

      window.print()

      setTimeout(() => {
        document.body.innerHTML = originalContent
        window.dispatchEvent(new Event('load'))
      }, 0)
      //   window.print()
      //   console.log('打印')
    },
    async shareWebPage(className: string) {
      try {
        const URL = window.location.href
        // console.log(className)
        const classObj = document.getElementsByClassName(className)
        await navigator.clipboard.writeText(URL)
        classObj[0].classList.add('shared')
        setTimeout(() => {
          classObj[0].classList.remove('shared')
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    },
    printWordArt() {
      const asciiChar = `
   ###    ########   ######    #######  ##     ## ####  ######  ######## 
  ## ##   ##     ## ##    ##  ##     ## ##     ##  ##  ##    ##    ##    
 ##   ##  ##     ## ##        ##     ## ##     ##  ##  ##          ##    
##     ## ########  ##   #### ##     ## ##     ##  ##  ##          ##    
######### ##   ##   ##    ##  ##     ##  ##   ##   ##  ##          ##    
##     ## ##    ##  ##    ##  ##     ##   ## ##    ##  ##    ##    ##    
##     ## ##     ##  ######    #######     ###    ####  ######     ## 
      `
      console.log(asciiChar)
    },
    disableAutoPlay() {
      const videos = document.querySelectorAll('video')
      videos.forEach((video) => {
        video.autoplay = false
        video.removeAttribute('autoplay')

        // 确保视频加载完成后再暂停
        if (!video.paused) {
          video.pause()
        }
      })
    },
    /**
     * 博客列表载入动画
     */
    blogListLoadAnimation() {
      if (this.blogListLoaded) {
        return
      }
      document.body.classList.add('blogload-animation')
      this.blogListLoaded = true
      // console.log('sdsd')
    },
    /**
     * 图片详情显示添加click处理
     */
    addImageDetailClickHandler(target: HTMLElement) {
      const imageList = Array.from(target.querySelectorAll('img')) as HTMLImageElement[]
      imageList.forEach((img) => {
        img.addEventListener('click', () => {
          this.showImageDetail(img.src)
        })
      })
    },
    showImageDetail(url: string) {
      this.isImageDetailShow = true
      this.imageDetailUrl = url
      console.log(url)
    },
    hideImageDetail() {
      this.isImageDetailShow = false
    },
  },
})
