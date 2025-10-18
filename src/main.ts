import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { createI18n } from 'vue-i18n'
import i18n from '@/stores/i8n'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'

/* 引入全局样式 */
import './style/index.css'
import './style/markdown.css'
import '@/style/animation.css'
/*i18n引入*/
// import en from '@/locales/en.json'
// import zh from '@/locales/zh.json'
// import du from '@/locales/du.json'
//语言包结构

// const i18n = createI18n({
//   locale: 'en', //默认语言
//   fallbackLocale: 'en', //备用语言
//   messages: {
//     en,
//     // zh,
//     // du,
//   } as Record<string, any>,
// })

/**
 * 启动应用
 */
const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueLazyload)

app.mount('#app')
