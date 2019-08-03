
<template>
  <div class="reg">
    <div class="top">
      <div class="top1-mbl"></div>
      <header class="header">
        <div class="logo">
          <img src="../../public/logo.png" alt width="80" height="48">
        </div>
        <div class="nav">
          <a class="aBtn" href="#" @click="handleGo('index', $event)">首页</a>
          <a
            @click="handleGo(item._id, $event)"
            class="aBtn"
            href="#"
            v-for="(item, index) in cateList"
            :key="index"
          >{{item.catename}}</a>
        </div>
        <div class="search">
          <input v-model="keyword" type="text" class="search-input" placeholder="搜索">
          <Icon type="ios-search-outline"/>
        </div>
      </header>
    </div>
    <div class="main">
      <div class="main-mbl"></div>
      <Card class="card">
        <p slot="title">
          <Icon type="ios-bowtie-outline"/> 用户注册
        </p>
        <ul>
          <Form ref="formValidate" :model="ruleForm" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户名" prop="username">
              <Input @on-blur="isReg" v-model="ruleForm.username" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
              <Input v-model="ruleForm.email" placeholder="请输入"></Input>
            </FormItem>

            <FormItem label="年龄" prop="age">
              <Input v-model="ruleForm.age" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
              <Input v-model="ruleForm.address" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="ruleForm.sex">
                <Radio label="1">男</Radio>
                <Radio label="0">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="ruleForm.password" placeholder="请输入" type="password"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password1">
              <Input v-model="ruleForm.password1" placeholder="请输入" type="password"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
              <Button @click="cancel" style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
        </ul>
      </Card>
    </div>
  </div>
</template>
<script>
import { getArtInfoByIdApi } from "@/api/article";
import { getCateListApi } from "@/api/artCate";
import { isRegApi } from "@/api/user";
import moment from "moment";
import mixin from "@/mixin";
import { addUserApi } from "@/api/user";
export default {
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        address: "",
        sex: "",
        age: "",
        password: "",
        password1: ""
      },
      cateList: [],
      keyword: ''
    };
  },
  created() {
    this.getCateList()
    this.ruleForm.address = ' '
    // this.ruleForm
  },
  methods: {
     // 判断用户名是否被注册
    isReg() {
      // console.log('reg')
      let query = {
        username: this.ruleForm.username
      }
      isRegApi(query).then(res => {
        // console.log(res.data)
        const data = res.data
        if (data.status == 2) {
          this.$Notice.info({
            title: data.message
          })
          this.ruleForm.username = ''
        } 
      })
    },
    // 新增用户
    addUser() {
      let formData = {};
      formData.username = this.ruleForm.username;
      formData.email = this.ruleForm.email;
      formData.address = this.ruleForm.address;
      formData.sex = this.ruleForm.sex;
      formData.age = this.ruleForm.age;
      formData.password = this.ruleForm.password;
      addUserApi(formData)
        .then(res => {
          // console.log(res.data)
          const data = res.data;
          if (data.status) {
            this.$Notice.success({
              title: "注册成功"
            });
            this.$refs['formValidate'].resetFields();
            this.$route.push({
              name: 'Index'
            })
          } else {
            this.$Notice.success({
              title: "注册失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          this.addUser();
        } else {
          this.$Notice.error({
            title: "请把数据补充完整"
          });
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "Index"
      });
    },

    handleGo(cate, e) {
      if (cate == "index") {
        this.$router.push({
          name: "Index"
        });
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
    }
  }
};
</script>
<style lang="less">
.reg {
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
      background: url("../../public/b1.jpg") 100% center no-repeat fixed;
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
    min-height: 850px;
    width: 1032px;
    margin: auto;
    margin-top: 70px;
    box-shadow: 0 0 10px #ccc;
    padding: 20px;
    .main-mbl {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../../public/b1.jpg") 50% center no-repeat fixed;
      filter: blur(10px);
      z-index: -1;
    }
    .card {
      position: absolute;
      // width: 900px;
      width: 100%;
      height: 600px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>


