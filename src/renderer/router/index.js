import Vue from 'vue'
import Router from 'vue-router'
import Reimbursement from '../components/Reimbursement/index'
import Review from '../components/Review/index'
import Pay from '../components/Pay/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reimbursement',
      component: Reimbursement
    },
    {
      path: '/review',
      name: 'Review',
      component: Review
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    
  ]
})
