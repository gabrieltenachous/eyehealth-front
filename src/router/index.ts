import Vue from 'vue'
import Router from 'vue-router'

import ExamListPage from '@/modules/exams/pages/ExamListPage.vue'
import ExamSummaryPage from '@/modules/exams/pages/ExamSummaryPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/exams/selection',
    },
    {
      path: '/exams/selection',
      name: 'ExamSelection',
      component: ExamListPage,
    },
    {
      path: '/exams/summary',
      name: 'ExamSummary',
      component: ExamSummaryPage,
    },
    {
      path: '/exams/solicitation',
      name: 'solicitation',
      component: () => import('@/modules/exams/pages/SolicitationPage.vue'),
    }


  ],
})
