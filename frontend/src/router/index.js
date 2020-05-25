import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'

import Application from '../components/Application.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      guardLogin(to, from, next);
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
]

const guard = function(to, from, next) {
  axios.get('/api/admin/token/check')
  .then(() => {
    next();
  })
  .catch(() => {
    window.location.href = "/login";
  })
};

const guardLogin = function(to, from, next) {
  if(localStorage.getItem('usertoken')) {
    axios.get('/api/admin/token/check')
    .then(() => {
      window.location.href = "/admin";
    })
    .catch(() => {
      next();
    })
  }
  else {
    next();
  }
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
