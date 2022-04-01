import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// RouteRecordRaw
const routes: Array<RouteRecordRaw> = 
 [
    {
      path: '/',
      name: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home/index.vue')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../pages/play/index.vue')
    },
    {
      path: '/cpa',
      name: 'cpa',
      component: () => import('../pages/compositionApi/index.vue')
    }
]
export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
