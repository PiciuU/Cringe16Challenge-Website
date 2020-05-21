import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueDragscroll from 'vue-dragscroll';
import VueTouch from 'vue-touch';

axios.defaults.baseURL = 'https://cringe16.dream-speak.pl/public';
// axios.defaults.baseURL = 'http://127.0.0.1:8000';

Vue.use(VueDragscroll); // Używane
Vue.use(VueTouch); // Używane


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
