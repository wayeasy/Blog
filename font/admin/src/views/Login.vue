<template>
  <div class="login">
    <div class="login-mbl"></div>
    <div class="main">
      <p class="top">isu的博客</p>
      <div class="form">
        <Input v-model="username" placeholder="账号" style="width: 300px" />
        <Input v-model="password" placeholder="密码" type="password" style="width: 300px" />
        <div class="login-btn" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, isLoginApi } from '@/api/admin'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const query = {
        username: this.username,
        password: this.password
      }
      loginApi(query).then(res => {
        // console.log(res.data)
        const data = res.data
        if (data.status == 1) {
          localStorage.setItem('user_token', data.user_token)
          localStorage.setItem('id', data.id)
          this.$router.push({
            name: 'AdminList'
          })
          // console.log(data.user_token)
        } else if (data.status == 2) {
          this.$Notice.info({
            title: '该用户不是管理员'
          })
        } else {
          this.$Notice.info({
            title: data.message
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  background: url('../../public/b1.jpg');
  height: 100%;
  position: relative;
  .login-mbl {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    z-index: -1;
    // background: rebeccapurple;
    background: url('../../public/b1.jpg') 100% center no-repeat fixed;

  }
  .main {
    width: 400px;
    height: 300px;;
    // border: 1px solid red;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-shadow: 0 0 10px #bbb;
    .top {
      padding: 10px;
      text-align: center;
      box-shadow: 0 0 10px #bbb;
      margin-bottom: 50px;
    }
    .form {
      width: 300px;
      margin: auto;
      .ivu-input {
        margin-bottom: 20px;
        height: 36px;
      }
      .login-btn {
        text-align: center;
        background: #928366;
        color: white;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s all ease;
        &:hover {
          background: #1f0000;
        }
      }
    }
  }
}
</style>
