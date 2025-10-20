import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/Root.vue'
// import RootView from '../views/Root.vue'
import BriefSelf from '@/views/BriefSelf.vue'
import Project from '@/views/MyProject.vue'
import Tools from '@/views/Tools.vue'
import Blog from '@/views/Blog.vue'
import Commission from '@/views/Commission.vue'
import Page404 from '@/views/404.vue'
import AssestUse from '@/views/AssestUse.vue'

// import Blog = () => import('@/views/Blog.vue')

// child route
import BlogDetail from '@/views/Blog/BlogDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BriefSelf,
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog, //使用预加载策略
    },
    {
      path: '/blog/detail/:id',
      name: 'blogDetail',
      component: BlogDetail,
    },
    {
      path: '/commission',
      name: 'commission',
      component: Commission,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Page404,
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssestUse,
    },
  ],
})

export default router
