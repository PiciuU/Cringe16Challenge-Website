import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueDragscroll from 'vue-dragscroll'; // Bibloteka do przesuwania diagramu myszką
import VueTouch from 'vue-touch'; // Biblioteka do wykrywania gestów na telefonie
import uploader from 'vue-simple-uploader' // Biblioteka do Uploadu zdjęć
import AOS from "aos"; // Biblioteka Animation On Scroll
import "aos/dist/aos.css"; // Biblioteka Animation On Scroll


axios.defaults.baseURL = 'https://cringe16.dream-speak.pl/public';
// axios.defaults.baseURL = 'http://127.0.0.1:8000';

axios.interceptors.request.use(
  request => {
      const token = localStorage.getItem('usertoken')
      if (token) {
          request.headers['Authorization'] = 'Bearer ' + token;
      }
      return request;
  },
  error => {
    console.log(error)
      Promise.reject(error)
});

let isRefreshing = false;
let subscribers = [];

axios.interceptors.response.use(
  response => {
    return response;
  }, error => {
    const {
      config,
      response: { status, data }
    } = error;

    const originalRequest = config;

    if(originalRequest.url.includes("token/check") && data.status !== "Token is Expired") {
      return Promise.reject(error);
    }

    if(data.status === "Authorization Token not found" || data.status === "Token is Invalid")
    {
      store.dispatch('logout');
      return Promise.reject(false);
    }

    if(originalRequest.url.includes("login")) {
      return Promise.reject(error);
    }


    if(status === 401 && data.status === "Token is Expired") {
      if(!isRefreshing) {
        isRefreshing = true;
        store.dispatch('refreshToken')
        .then(({status}) => {
          if(status === 200 || status === 204) {
            isRefreshing = false;
          }
          subscribers = [];
        })
        .catch(error => {
          console.log(error);
        })
      }

      const requestSubscribers = new Promise(resolve => {
        subscribeTokenRefresh(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();

      return requestSubscribers;
    }
  });

  function subscribeTokenRefresh(cb) {
    subscribers.push(cb)
  }

  function onRefreshed() {
    subscribers.map(cb => cb());
  }

Vue.use(VueDragscroll);
Vue.use(VueTouch);
Vue.use(uploader);


Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
