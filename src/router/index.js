import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import AgeInputView from '../views/AgeInputView.vue'
import QuestionView from '../views/QuestionView.vue'
import LoadingView from '../views/LoadingView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/age',
      name: 'age',
      component: AgeInputView
    },
    {
      path: '/question',
      name: 'question',
      component: QuestionView
    },
    {
      path: '/loading',
      name: 'loading',
      component: LoadingView
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView
    }
  ]
})

export default router