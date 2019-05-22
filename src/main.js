import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http.defaults.headers.get['Content-Type'] = 'application/json'
Vue.prototype.$http.defaults.headers.patch['Content-Type'] = 'application/json'
Vue.prototype.$http.defaults.headers.delete['Content-Type'] = 'application/json'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
