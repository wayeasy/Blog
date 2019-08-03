import Vue from 'vue'
import Router from 'vue-router'
import Cate from './views/Cate.vue'
import Layout from './views/Layout.vue'
import ArticleDetails from './views/ArticleDetails.vue'
import Reg from './views/Reg.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Index',
          component: () => import('./views/Index.vue'),
        },
        {
          path: '/cate/:id',
          name: 'Cate',
          component: Cate
        }
        
      ]
    },
    {
      path: '/details',
      name: 'ArticleDetails',
      component: ArticleDetails,
    },
    {
      path: '/Reg',
      name: 'Reg',
      component: Reg,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
