import './plugins/vuetify'
import Vuelidate from 'vuelidate'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(Vuelidate);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
