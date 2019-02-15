<template>
  <div class="user-list">
    <div class="search">
      <div class="search-wrapper">
        <i-input size="large" placeholder="搜索" v-model="keyword"></i-input>
        <div class="search-button" @click="search">搜索</div>
        <Icon type="ios-search"></Icon>
      </div>
      <Button type="primary" class="addBtn" @click="addAdmin">新增管理员</Button>
    </div>
    <div class="content">
      <template>
        <i-table border :columns="columns7" :data="data6"></i-table>
      </template>
      <Page
        :total="total"
        show-sizer
        show-total
        :current="pageindex"
        :page-size="pagesize"
        @on-change="changeIndex"
        @on-page-size-change="changeSize"
      />
    </div>

    <!-- 编辑抽屉 -->
    <template>
      <div>
        <Drawer
          :title="drawerTitle"
          v-model="value3"
          width="720"
          :mask-closable="false"
          :styles="styles"
        >
          <Form :model="formData" ref="formData" :rules="ruleValidate">
            <Row :gutter="32">
              <Col span="12" v-if="this.drawerTitle == '新增管理员'">
                <FormItem label="用户名" label-position="top" prop="username">
                  <Input @on-blur="isRegiste(formData.username)" v-model="formData.username" placeholder="请输入用户名"/>
                </FormItem>
              </Col>
              <Col span="12" v-if="this.drawerTitle == '编辑信息'">
                <FormItem label="用户名" label-position="top" prop="username">
                  <Input v-model="formData.username" placeholder="请输入用户名"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="年龄" label-position="top" prop="age">
                  <Input v-model="formData.age" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="邮箱" label-position="top" prop="email">
                  <Input v-model="formData.email" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="地址" label-position="top" prop="address">
                  <Input v-model="formData.address" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="密码" label-position="top" prop="password">
                  <Input v-model="formData.password" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="性别" label-position="top" prop="sex">
                  <br>
                  <RadioGroup v-model="formData.sex">
                    <Radio :label="1">男</Radio>
                    <Radio :label="0">女</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="博主简介" label-position="top">
              <br>
              <div class="toolbar" id="div1" style="border: 1px solid #ccc;"></div>
              <p style="height:10px;"></p>
              <div class="text" id="div2" style="border: 1px solid #ccc;height:390px;"></div>
            </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
            <Button type="primary" @click="handleSubmit('formData')">确定</Button>
          </div>
        </Drawer>
      </div>
    </template>
  </div>
</template>

<script>
import { addAdminApi, getAdminListApi, deleteAdminApi, getAdminInfoByIdApi, updateAdminByIdApi, isRegisteApi } from "@/api/admin";
import moment from "moment";
import E from 'wangeditor'
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      isRegis: false,
      drawerTitle: "",
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        username: "",
        email: "",
        password: "",
        address: "",
        sex: "",
        age: ""
      },
      keyword: "",
      pageindex: 1,
      pagesize: 10,
      columns7: [
        {
          title: "姓名",
          key: "username"
        },
        {
          title: "博主简介",
          key: "synopsis",
          width: 300
        },
        {
          title: "性别",
          key: "sex"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "注册时间",
          key: "createDate"
        },
        {
          title: "操作",
          key: "action",
          width: 140,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Poptip",
                {
                  props: {
                    title: "确认删除?",
                    confirm: true
                  },
                  style: {
                    "margin-left": "5px"
                  },
                  on: {
                    "on-ok": () => {
                      this.delete(params.row);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      data6: [],
      total: 0
    };
  },
  created() {
    this.getAdminList(this.pageindex, this.pagesize);
  },
  methods: {
    // 查询用户名是否被注册
    isRegiste(username) {
      console.log(username)
      isRegisteApi(username).then(res => {
        const data = res.data
        if (data.status) {
          this.$Notice.info({
            title: data.message
          })
          this.isRegis = true
        }
      })
    },
    // 点击新增按钮
    addAdmin() {
      this.value3 = true;
      this.drawerTitle = "新增管理员";
      this.$refs['formData'].resetFields();
      this.editor.txt.html(' ')
    },
    doAddAdmin() {
      let formdata = {};
      formdata.username = this.formData.username;
      formdata.email = this.formData.email;
      formdata.password = this.formData.password;
      formdata.address = this.formData.address;
      formdata.sex = this.formData.sex;
      formdata.age = this.formData.age;
      formdata.synopsis = this.editor.txt.html()
      if (this.isRegis) {
        this.$Notice.info({
          title: '该用户名已被注册'
        })
        return false
      }
      console.log(222)
      addAdminApi(formdata).then(res => {
        // console.log(res.data)
        const data = res.data;
        if (data.status) {
          this.$Notice.success({
            title: "添加成功"
          });
          this.value3 = false
          this.getAdminList(this.pageindex, this.pagesize)
        } else {
          this.$$Notice.error({
            title: "添加失败"
          });
        }
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.drawerTitle == "新增管理员") {
            this.doAddAdmin();
          } else {
            this.doEdit()
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    getAdminList(pageindex, pagesize, keyword) {
      let params = {};
      params.pageindex = pageindex;
      params.pagesize = pagesize;
      params.keyword = keyword;
      getAdminListApi(params)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.total = data.total;
            this.data6 = data.data;
            for (let item of data.data) {
              item.sex == 1 ? (item.sex = "男") : (item.sex = "女");
              item.createDate = moment(item.createDate).format(
                "YYYY-MM-DD HH:mm"
              );
            }
          } else {
            this.$Notice.error({
              title: "请求失败!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(params) {
      // console.log(params);
      this.drawerTitle = "编辑信息";
      this.value3 = true;
      getAdminInfoByIdApi(params._id).then(res => {
        const data = res.data;
        if (data.status) {
          this.formData = data.data;
          this.editor.txt.html(data.data.synopsis)
          for (let item in data.data) {
            data.sex = String(data.sex);
          }

        } else {
          this.$Notice.error({
            title: "请求失败!"
          });
        }
      });
    },
    delete(params) {
      deleteAdminApi(params._id)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.$Notice.success({
              title: "删除成功!"
            });
            this.getAdminList(this.pageindex, this.pagesize);
          } else {
            this.$Notice.success({
              title: "删除失败!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeIndex(pageindex) {
      this.getAdminList(pageindex, this.pagesize);
    },
    changeSize(pagesize) {
      this.getAdminList(this.pageindex, pagesize);
    },
    search() {
      this.getAdminList(this.pageindex, this.pagesize, this.keyword);
    },
    // 执行修改的操作
    doEdit() {
      let formData = {}
      formData = JSON.parse(JSON.stringify(this.formData))
      formData.synopsis = this.editor.txt.html()
      updateAdminByIdApi(formData).then(res => {
        const data = res.data;
        if (data.status) {
          this.$Notice.success({
            title: "修改成功!"
          });
          this.getAdminList(this.pageindex, this.pagesize);
          this.value3 = false;
        } else {
          this.$Notice.success({
            title: "修改失败!"
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.user-list {
  .search {
    position: relative;
    .search-wrapper {
      position: relative;
      width: 240px;
      margin: 0 auto;
      margin-bottom: 20px;
      .ivu-input {
        width: 240px !important;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        border-right: 0;
        text-indent: 22px;
      }
      .ivu-icon-ios-search {
        font-size: 22px;
        position: absolute;
        top: 7px;
        left: 5px;
      }
      .search-button {
        height: 36px;
        width: 60px;
        border: 1px solid #dcdee2;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        text-align: center;
        line-height: 34px;
        position: absolute;
        border: 0;
        top: 0;
        left: 180px;
        background: #3399ff;
        color: white;
        border-left: 0;
        &:hover {
          cursor: pointer;
          background: #5cadff;
          transition: background 0.2s;
        }
      }
    }
    .addBtn {
      position: absolute;
      right: 0;
      top: 4px;
    }
  }
  .ivu-page {
    margin-top: 10px;
  }
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
}
</style>
