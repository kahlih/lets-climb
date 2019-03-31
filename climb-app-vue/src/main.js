import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios; // now we can simply do this.$http for axios calls
const token = localStorage.getItem('token')
if (token) {
  // set axios Authorization header to the token so all calls are authorized
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount('#app')
