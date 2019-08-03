<template>
  <div class="layout">
    <div class="top">
      <div class="top1-mbl"></div>
      <header class="header">
        <div class="logo">
          <img src="../../public/logo.png" alt="" width="80" height="48">
        </div>
        <div class="nav">
          <a class="aBtn" href="#" @click="handleGo('index', $event)">首页</a>
          <a @click="handleGo(item._id, $event)" class="aBtn" href="#" v-for="(item, index) in cateList" :key="index">
            {{item.catename}}
          </a>
        </div>
        <div class="search">
          <input v-model="keyword" type="text" class="search-input" placeholder="搜索">
          <Icon type="ios-search-outline" />
        </div>
      </header>
    </div>
    <div class="main">
      <div class="main-mbl"></div>
      <div class="left-main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
      <div class="right-maim">
        <!-- <div class="reg-login">
          <div class="login" @click="login"><span>登录</span></div>
          <div class="login" @click="reg"><span>注册</span></div>
          <div class="login"><span>留言</span></div>
        </div> -->
        <div class="bloger">
          <div class="bloger-top">
            <img src="../../public/b7.jpg" alt="" srcset="" height="150" width="310">
            <div class="portrait">
              <img src="../../public/b2.jpg" alt="" height="120" width="120">
            </div>
            <div class="name">{{blogInfo.username}}</div>
            <p class="introduct" v-html="blogInfo.synopsis"></p>
          </div>
        </div>
        <div class="link">
          <p class="title">友情链接</p>
          <div class="item" v-for="(item, index) in linkList" :key="index" @click="handleLink(item)">{{item.linkname}}</div>
        </div>
        <div class="ba">
          <a href="http://www.miitbeian.gov.cn/">蜀ICP备19007188号</a>
        </div>
      </div>

      <BackTop :duration="150"></BackTop>
    </div>
    <!-- 登录模态框 -->
    <Modal
      v-model="loginModal"
      title="账号登录"
      class-name="vertical-center-modal"
      :closable="false"
      width="400"
      @on-ok="doLogin"
      @on-cancel="cancel">
      <div style="text-align:center">
        <Input v-model="username" placeholder="账号" style="width: 300px;margin-bottom:20px;" />
        <Input v-model="password" placeholder="密码" type="password" style="width: 300px" />
        <!-- <p class="loginBtn" style="width:300px;background:#2d8cf0;margin:20px auto 0;height:32px;line-height:32px;color:white;border-radius:4px;cursor:pointer"><span>登录</span></p> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import { getCateListApi } from "@/api/artCate";
import { getLinkListApi } from "@/api/link";
import { getAdminListApi } from "@/api/admin";
import { loginApi, isRegApi } from "@/api/user";
export default {
  data() {
    return {
      cateList: [],
      linkList: [],
      blogInfo: {},
      loginModal: false,
      username: '',
      password: '',
      keyword: ''
    };
  },
  created() {
    this.getCateList();
    this.getLinkList();
    
    this.getAdminInfo()
    this.keyword = ' '
  },
  methods: {
   
    doLogin() {
      // console.log('login')
      let fromData = {}
      fromData.username = this.username
      fromData.password = this.password
      loginApi(fromData).then(res => {
        console.log(res.data)
      })
    },
    cancel() {

    },
    reg() {
      this.$router.push({
        name: "Reg"
      })
    },
    login() {
      this.loginModal = true
    },
    // 获取博主信息
    getAdminInfo() {
      let data = {
        pageindex: 1,
        pagesize: 1
      };
      getAdminListApi(data).then(res => {
        const data = res.data;
        if (data.status) {
          this.blogInfo = data.data[0];
        }
      });
    },
    handleGo(cate, e) {
      if (cate == "index") {
        this.$router.push({
          name: "Index"
        });
      } else if (cate == 'reg') {
        this.$router.push({
          name: "Reg"
        })
      } else {
        this.$router.push({
          name: "Cate",
          params: {
            id: cate
          }
        });
      }
      var alist = document.getElementsByClassName("aBtn");
      for (var i = 0; i < alist.length; i++) {
        alist[i].style.color = "#5e5a6e";
      }
      e.target.style.color = "#ff7f21";
    },
    // 获取所有文章分类
    getCateList() {
      let data = {
        pageindex: 1,
        pagesize: 10
      };
      getCateListApi(data).then(res => {
        const data = res.data;
        if (data.status) {
          this.cateList = data.data;
        }
      });
    },
    // 获取友情链接
    getLinkList() {
      let params = {
        pageindex: 1,
        pagesize: 10
      };
      getLinkListApi(params).then(res => {
        const data = res.data;
        if (data.status) {
          this.linkList = data.data;
        }
      });
    },
    handleLink(item) {
      window.open(item.linkurl);
    }
  }
};
</script>
<style lang="less">
.layout {
  
  .loginBtn {
    width: 300px;
    background: #2d8cf0;
    &:hover {
      color: red;
    }
  }
  .top {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    border-bottom: 1px solid #aaa;
    border-top: 1px solid #ccc;
    .top1-mbl {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      filter: blur(30px);
      z-index: -1;
      background: url('../../public/b1.jpg') 100% center no-repeat fixed;
    }
    .header {
      width: 1032px;
      height: 50px;
      margin: auto;
      overflow: hidden;
      .logo {
        height: 50px;
        width: 80px;
        line-height: 50px;
        float: left;
      }
      .nav {
        float: left;
        font-size: 16px;
        line-height: 50px;
        margin-left: 100px;
        .aBtn {
          display: inline-block;
          margin: 0 15px;
          text-decoration: none;
          color: #5e5a6e;
        }
        
      }
      .search {
        float: left;
        min-width: 326px;
        margin-top: 8px;
        height: 34px;
        position: relative;
        margin-left: 15px; 
        .search-input {
          height: 100%;
          width: 326px;
          outline: none;
          padding-top: 4px;
          padding-bottom: 4px;
          border: 1px solid #c5c5c6;
          border-radius: 3px;
          background: #e8e8e8;
          padding-left: 16px;
          transition: width 200ms ease, background 300ms ease; 
          &:focus {
            width: 400px;
            background: white;
            // border: 1px solid #b590a6;
            border: 1px solid #ccc;
          }
        }
        .ivu-icon {
          position: absolute;
          right: 0px;
          top: 8px;
          display: inline-block;
          font-size: 20px;
          padding-left: 12px;
          padding-right: 12px;
          cursor: pointer;
        }
      }
      .aBtn {
        display: inline-block;
        margin: 0 15px;
        text-decoration: none;
        color: #5e5a6e;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
  .main {
    position: relative;
    // min-height: 500px;
    width: 1032px;
    margin: auto;
    margin-top: 70px;
    box-shadow: 0 0 10px #bbb;
    &::after {
      content: "";
      display: block;
      height: 0;
      width: 0;
      clear: both;
    }
    .main-mbl {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../../public/b1.jpg") 50% center no-repeat fixed;
      filter: blur(15px);
      z-index: -9;
    }
    .left-main {
      width: 700px;
      min-height: 900px;
      float: left;
    }
    .right-maim {
      width: 310px;
      min-height: 400px;
      // box-shadow: 0 0 10px #ccc;
      float: right;
      // padding: 10px;
      .reg-login {
        box-shadow: 0 0 10px #ccc;
        overflow: hidden;
        margin-bottom: 20px;
        .login {
          width: 103px;
          float: left;
          text-align: center;
          padding: 10px;
          span {
            cursor: pointer;
          }
        }
        // .reg {
        //   width: 155px;
        //   float: left;
        //   text-align: center;
        // }
      }
      .bloger {
        box-shadow: 0 0 10px #ccc;
        height: 290px;
        position: relative;
        // padding: 5px;
        .bloger-top {
          height: 150px;
        }
        .portrait {
          img {
            border-radius: 50%;
          }
          position: absolute;
          height: 120px;
          width: 120px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          margin-top: 70px;
          box-shadow: 0 0 10px #ccc;
        }
        .name {
          margin-top: 44px;
          text-align: center;
        }
        .introduct {
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 6px;
        }
      }
      .link {
        margin-top: 20px;
        box-shadow: 0 0 10px #ccc;
        min-height: 30px;
        padding: 10px;
        margin-bottom: 20px;
        .title {
          text-align: center;
        }
        .item {
          display: inline-block;
          margin-right: 10px;
          margin-top: 6px;
          cursor: pointer;
          &:hover {
            color: #ad763d;
          }
        }
      }
      .ba {
        text-align: center;
        a {
          color: #515a6e;
          &:hover {
            color: red;
          }
        }
        // box-shadow: 0 0 10px #ccc;
        // padding-top: 10px;
        // padding-bottom: 10px;
      }
    }
  }
}
</style>
