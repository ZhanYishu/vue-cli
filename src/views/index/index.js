import Vue from 'vue'
import App from './app.vue'

new Vue({
  name: 'admin',
  render: createElement => createElement(App)
}).$mount('#app')
