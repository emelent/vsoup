import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TableManager from '@/components/TableManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableManager',
      component: TableManager
    }
  ]
})
