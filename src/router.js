import store from './store'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
