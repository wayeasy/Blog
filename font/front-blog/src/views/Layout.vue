<template>
  <div class="layout">
    <div class="menu-left">
      
      <Menu :theme="theme2" :open-keys="['1']" accordion @on-select="selectMenu">
        <div class="header" style="">XXX的博客</div>
        <Submenu key="1" name="5">
          <template slot="title">
            <Icon type="ios-paper"></Icon>内容管理
          </template>
          <Menu-item key="1-1" name="1">文章管理</Menu-item>
          <Menu-item key="1-2" name="2">评论管理</Menu-item>
          <Menu-item key="1-3" name="3">举报管理</Menu-item>
        </Submenu>
        <Submenu key="2" name="6">
          <template slot="title">
            <Icon type="ios-people"></Icon>用户管理
          </template>
          <Menu-item key="UserList" name="UserList">用户列表</Menu-item>
          <Menu-item key="2-2" name="4">活跃用户</Menu-item>
        </Submenu>
      </Menu>
    </div>
    <div class="main">
      <Breadcrumb>
        <Breadcrumb-item href="/">Home</Breadcrumb-item>
        <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
        <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
      </Breadcrumb>

      <div style="" class="content">
        <router-view></router-view>
      </div>

      <div class="footer">博客</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme2: "light"
    };
  },
  methods: {
    selectMenu(name) {
      this.$router.push({
        name: name
      })
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .menu-left {
    float: left;
    width: 13%;
    height: 100%;
    .header {
      background:#f5f7f9;
      height: 43px;
      line-height: 43px;
      text-align: center;
    }
    .ivu-menu-light {
      height: 100%;
      width: 100% !important;
      margin-right: 0;
    }
  }
  .main {
    width: 87%;
    float: right;
    height: 100%;
    position: relative;
    .content {
      min-height: 500px;
      padding: 10px;
      // padding-top: 0;
    }
    .ivu-breadcrumb {
      margin: 10px;
    }
    .footer {
      height: 36px;
      text-align: center;
      background-color: #f5f7f9;
      line-height: 36px;
      position: absolute;
      bottom:0;
      width: 100%;
      color: #a9a7ba;
    }
  }
}
</style>
