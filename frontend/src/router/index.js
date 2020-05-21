import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Answer from '../components/Answer.vue'
import List from '../components/List.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/answer',
    name: 'Answer',
    component: Answer
  },
  {
    path: '/lista',
    name: 'List',
    component: List
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
