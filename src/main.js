import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import Router from 'vue-router'
import axios from './httpconfig/http'
import VueAxios from "vue-axios"

Vue.use(ElementUi)
Vue.use(VueAxios,axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}