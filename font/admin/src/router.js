import Vue from 'vue'
import Router from 'vue-router'
import UserList from './views/UserList.vue'
import AdminList from './views/AdminList.vue'
import ArticleCate from './views/ArticleCate.vue'
import ArticleList from './views/ArticleList.vue'
import LinkList from './views/LinkList.vue'
import Layout from './views/Layout.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/userlist',
          name: 'UserList',
          component: UserList,
        },
        {
          path: '/adminlist',
          name: 'AdminList',
          component: AdminList,
        },
        {
          path: '/ArticleCate',
          name: 'ArticleCate',
          component: ArticleCate,
        },
        {
          path: '/ArticleList',
          name: 'ArticleList',
          component: ArticleList,
        },
        {
          path: '/LinkList',
          name: 'LinkList',
          component: LinkList,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
