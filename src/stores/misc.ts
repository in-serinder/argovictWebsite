import { defineStore } from 'pinia'
import { nextTick } from 'process'

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
      imageDetailTarget: null as HTMLElement | null,
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
     * 图片详情 显示添加click处理
     */
    addImageDetailClickHandler(target: HTMLElement) {
      const imageList = Array.from(target.querySelectorAll('img')) as HTMLImageElement[]
      imageList.forEach((img) => {
        img.addEventListener('click', () => {
          this.showImageDetail(img.src)
        })
      })
      this.setupImageDetailScrollZoom()
    },
    showImageDetail(url: string) {
      this.isImageDetailShow = true
      this.imageDetailUrl = url
      console.log(url)
    },
    hideImageDetail() {
      this.isImageDetailShow = false
      // 修复body滚动问题
      // document.body.classList.remove('image-detail-fix')
      // console.log('隐藏图片详情')
    },
    // 鼠标缩放
    setupImageDetailScrollZoom() {
      let scale = 1.05
      const imageElement = document.querySelector('.image-detail img') as HTMLImageElement
      const imageDetailContainer = document.querySelector('.image-detail') as HTMLElement
      imageElement.addEventListener('wheel', (e) => {
        // e.preventDefault()
        const delta = e.deltaY

        // const scale = delta > 0 ? 0.9 : 1.1
        if (delta > 0) {
          scale -= scale > 0.85 ? 0.21 : 0
        } else {
          scale += scale < 1.5 ? 0.21 : 0
        }

        if (scale > 1.05) {
          imageDetailContainer.style.overflow = 'auto'
          // 复原缩放
          // imageElement.style.width = `calc(90% *${scale})`
          // imageElement.style.height = `calc(90% *${scale})`
        } else {
          imageDetailContainer.style.overflow = 'hidden'
        }

        imageElement.style.transform = `scale(${scale})`
        console.log(scale)
      })
    },
    /**
     * 标题修改长度
     */
    adjustBlogTitleLength(title: string, maxLength: number): string {
      if (title.length <= maxLength) {
        return title
      }
      return title.substring(0, maxLength) + '...'
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  },
})
