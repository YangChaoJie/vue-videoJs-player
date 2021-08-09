import { createApp } from 'vue'
import App from './App.vue'
import { Popup } from 'vant';

const app = createApp(App);
app.use(Popup);
app.mount('#app')
