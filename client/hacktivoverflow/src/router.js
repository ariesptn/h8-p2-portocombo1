import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import Question from './views/question.vue'
import Answer from './views/answer.vue'
import LoginRegister from './views/loginRegister.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'questionsHome',
      component: Question
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question,
    },
    {
      path: '/search/:searchQuery',
      name: 'findBysearchQuery',
      component: Question,
    },
    {
      path: '/tag/:tag',
      name: 'findByTag',
      component: Question,
    },
    {
      path: '/answers/:questionId',
      name: 'answers',
      component: Answer
    },
    {
      path: '/loginregister',
      name: 'loginregister',
      component: LoginRegister
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
