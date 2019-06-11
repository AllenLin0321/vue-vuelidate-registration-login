import store from './store'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      redirect: 'account',
      children: [
        {
          path: 'account',
          nanm: 'account',
          component: () => import('./components/AccountInfo')
        },
        {
          path: 'password',
          nanm: 'password',
          component: () => import('./components/ChangePW')
        }
      ],
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
      redirect: '/login'
    }
  ]
})
