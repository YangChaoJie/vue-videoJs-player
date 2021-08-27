// import { createApp } from 'vue'
// import App from './App.vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '../dist/yy-lib.es.js';
// import '../dist/yy-lib.umd.js';
// const app = createApp(App);
// Vue.use(Popup);
// Vue.use(Dialog);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

