import { defineStore } from 'pinia'
import { ref } from 'vue'

// 导入项目平台图标
import linux from '@/assets/svg/linux_rgb.svg'
import windows from '@/assets/svg/windows.svg'
import windows7 from '@/assets/svg/Windows7.svg'
import windowsxp from '@/assets/svg/Windows_XP.svg'
import mac from '@/assets/svg/apple.svg'
import android from '@/assets/svg/android.svg'
import freeBsd from '@/assets/svg/freebsd.svg'
import archlinux from '@/assets/svg/archlinux.svg'
import debian from '@/assets/svg/debian.svg'
import arm_8051 from '@/assets/svg/asm.svg'
import docker from '@/assets/svg/docker.svg'
import chrome from '@/assets/svg/chrome.svg'
import unknown from '@/assets/svg/unknow.svg'
import intel from '@/assets/svg/intel.svg'
import embedded from '@/assets/svg/embedded.svg'
import arduino from '@/assets/svg/arduino.svg'

const left = ref(0)

export const useStyleStore = defineStore('style', {
  state() {
    return {
      isMobile: false,
    }
  },
  actions: {
    /*
     * 委托页面顶部滚动
     */
    changeToLeft(val: number) {
      left.value += val

      const board = document.querySelector('.commission-board-scroll ul') as HTMLElement
      if (left.value > 300) {
        left.value = 0
      }
      board.style.transform = `translateX(${-left.value}%)`
    },
    whenPageChange(container: string) {
      const page = document.getElementById(container)
      if (page) {
        page.style.animation = 'heidinleft 0.5s ease-in-out'
      }
    },

    /*
     * 项目平台图标
     */

    getPlatformIcon(platform: string) {
      switch (
        true // 以 boolean 类型作为判断基准
      ) {
        case /linux/i.test(platform):
          return linux
        case /windows/i.test(platform):
          return windows
        case /windows7/i.test(platform):
          return windows7
        case /windowsxp/i.test(platform):
          return windowsxp
        case /mac/i.test(platform):
          return mac
        case /android/i.test(platform):
          return android
        case /freebsd/i.test(platform):
          return freeBsd
        case /archlinux/i.test(platform):
          return archlinux
        case /debian/i.test(platform):
          return debian
        case /32BIT|ARM8/i.test(platform):
          return arm_8051
        case /ARM/i.test(platform):
          return embedded
        case /arduino|ESP/i.test(platform):
          return arduino
        case /8051/i.test(platform):
          return intel
        case /docker/i.test(platform):
          return docker
        case /chrome/i.test(platform):
          return chrome
        default:
          return unknown
      }
    },
  },
})
