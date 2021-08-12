import { createApp } from 'vue'
import App from './App.vue'
import { Popup, Dialog  } from 'vant';
// import '../dist/yy-lib.es.js';
// import '../dist/yy-lib.umd.js';
const app = createApp(App);
app.use(Popup);
app.use(Dialog);
app.mount('#app')
