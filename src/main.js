import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'es6-promise/auto'
import Vuex from 'vuex'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import './assets/app.css'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
}).$mount('#app')
