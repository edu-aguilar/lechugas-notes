import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
