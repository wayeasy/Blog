
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="selectMenu">
        <MenuGroup title="用户管理">
          <MenuItem name="UserList">
            <Icon type="ios-bowtie-outline" />
            用户列表
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-chatboxes-outline" />
            留言列表
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-paper-plane-outline" />
            评论管理
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="文章管理">
          <MenuItem name="ArticleCate">
            <Icon type="ios-keypad"></Icon>
            文章分类
          </MenuItem>
          <MenuItem name="ArticleList">
            <Icon type="md-bowtie" />
            文章列表
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="系统设置">
          <MenuItem name="AdminList">
            <Icon type="ios-ionitron-outline" />
            管理员列表
          </MenuItem>
          <MenuItem name="LinkList">
            <Icon type="ios-link-outline" />
            友情链接
          </MenuItem>
        </MenuGroup>
        
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="header">
        白茶清欢无别事
      </div>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="height: 720px">
            <router-view></router-view>
          </div>
        </Card>
        <div class="footer">博客</div>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  methods: {
    selectMenu(name) {
      // console.log(name)
      this.$router.push({
        name: name
      })
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.ivu-menu {
  height: 100%;
}
.header {
  background: white;
  height: 64px;
  box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
  line-height: 64px;
}
.footer {
  height:40px;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
}
</style>