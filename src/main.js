import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'

const httpMethods = ['post', 'get', 'patch', 'delete']
httpMethods.forEach(method => { axios.defaults.headers[method]['Content-Type'] = 'application/json' })

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
