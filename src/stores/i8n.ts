// src/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import zh from '@/locales/zh.json'
import de from '@/locales/de.json'

const LocalesList = ['en', 'zh', 'de'] as const
type LocalesListType = (typeof LocalesList)[number]

export const getBrowserLanguage = (): LocalesListType => {
  const browserLang = navigator.language.slice(0, 2) as LocalesListType
  console.log(browserLang)
  return LocalesList.includes(browserLang) ? browserLang : 'en'
}

const i18n = createI18n({
  legacy: false, // 组合式 API 必须设置为 false
  locale: getBrowserLanguage(), // 初始语言（浏览器语言）
  fallbackLocale: 'en', // 备用语言
  messages: {
    en,
    zh,
    de, // 若导入则添加
  },
})

export default i18n
export { LocalesList, type LocalesListType }
