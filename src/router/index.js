import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
  ],
})
