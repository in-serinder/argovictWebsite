import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/Root.vue'
import RootView from '../views/Root.vue'
import BriefSelf from '@/views/BriefSelf.vue'
import Project from '@/views/MyProject.vue'
import Tools from '@/views/Tools.vue'
import Blog from '@/views/Blog.vue'
import Commission from '@/views/Commission.vue'

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
      component: Blog,
    },
    {
      path: '/commission',
      name: 'commission',
      component: Commission,
    },
  ],
})

export default router
