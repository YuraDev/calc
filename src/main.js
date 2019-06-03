import Vue from 'vue'
import App from './components/main'
import router from './router'
import UI from '@/plugins/ui'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false
Vue.use(UI)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
