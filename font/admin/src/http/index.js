import router from '@/router'
import Vue from 'vue'
const login_name = 'login'
import { isLoginApi } from "@/api/admin";


router.beforeEach((to, from, next) => {
  if (to.name != login_name) {
    const data = {
      id: localStorage.getItem('id'),
      user_token: localStorage.getItem('user_token')
    }
    isLoginApi(data).then(res => {
      const data = res.data
      if (data.status == 1) {
        next()
      } else {
        next({
          name: 'login'
        })
        Vue.prototype.$Notice.info({
          title: '登录过期,请重新登录!'
        })
      }
    })
  } else {
    next()
  }
})