import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'es6-promise/auto'
import Vuex from 'vuex'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import './assets/app.css'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
