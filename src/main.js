import Vue from 'vue'
import VueRamda from 'vue-ramda';
import App from './App.vue'

Vue.use(VueRamda);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
