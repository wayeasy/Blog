<template>
  <div class="user-list">
    <div class="search">
      <div class="search-wrapper">
        <i-input size="large" placeholder="搜索" v-model="keyword"></i-input>
        <div class="search-button" @click="search">搜索</div>
        <Icon type="ios-search"></Icon>
      </div>
      <Button type="primary" class="addBtn" @click="publishArticles">发布文章</Button>
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
              <Col span="12">
                <FormItem label="文章标题" label-position="top" prop="artname">
                  <Input v-model="formData.artname" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="文章作者" label-position="top" prop="author">
                  <Input v-model="formData.author" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="文章封面">
              <br>
              <template>
                <Upload
                  :before-upload="handleBeforeUpload"
                  type="drag"
                  action="http://127.0.0.1:9000/addArticle">
                  <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>拖拽或点击上传</p>
                  </div>
                </Upload>
                <div v-if="file !== null">Upload file: {{ file.name }} 
                </div>
              </template>
            </FormItem>
            <FormItem label="文章内容" label-position="top">
              <br>
              <div class="toolbar" id="div1" style="border: 1px solid #ccc;"></div>
              <p style="height:10px;"></p>
              <div class="text" id="div2" style="border: 1px solid #ccc;height:360px;"></div>
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
import {
  addArticleApi,
  getArtListApi,
  deleteArticleApi,
  getArtInfoByIdApi,
  updateArtByIdApi,
  updateArticleApi
} from "@/api/article";
import moment from "moment";
import E from 'wangeditor'
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      drawerTitle: "",
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        artname: "",
        author: "",
        content: ""
      },
      keyword: "",
      pageindex: 1,
      pagesize: 10,
      columns7: [
        {
          title: "文章标题",
          key: "artname"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "文章内容",
          key: "content"
        },
        {
          title: "创建时间",
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
      total: 0,

      file: null 
    }; 
  },
  created () {
    this.getArtList(1,10)
  },
  methods: {
    // 点击新增按钮
    publishArticles() {
      this.value3 = true;
      this.drawerTitle = "发布文章";
      this.editor.txt.html(' ')
      this.$refs['formData'].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.drawerTitle == '发布文章') {
            this.addArticle()
          } else {
            if (this.file == null) {
              this.doEdit()
            } else {
              this.doEditArticle()
            }
          }
          
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    getArtList(pageindex, pagesize, keyword) {
      let params = {};
      params.pageindex = pageindex;
      params.pagesize = pagesize;
      params.keyword = keyword;
      getArtListApi(params)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.total = data.total;
            this.data6 = data.data;
            for (let item of data.data) {
              item.createDate = moment(item.createDate).format(
                "YYYY-MM-DD HH:mm"
              );
              item.content = item.content.substr(0, 120)
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
    // 点击编辑按钮
    edit(params) {
      // console.log(params);
      this.drawerTitle = "编辑文章";
      this.value3 = true;
      getArtInfoByIdApi(params._id).then(res => {
        const data = res.data;
        if (data.status) {
          // for (let item in data.data) {
          //   if (item == "isEnable") {
          //     data.data.isEnable == 1
          //       ? (data.data.isEnable = true)
          //       : (data.data.isEnable = false);
          //   }
          // }
          this.formData = data.data;
          this.editor.txt.html(data.data.content)
          console.log(this.formData, this.file)
        } else {
          this.$Notice.error({
            title: "请求失败!"
          });
        }
      });
    },
    delete(params) {
      deleteArticleApi(params._id)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.$Notice.success({
              title: "删除成功!"
            });
            this.getArtList(this.pageindex, this.pagesize);
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
      this.getCateList(pageindex, this.pagesize);
    },
    changeSize(pagesize) {
      this.getCateList(this.pageindex, pagesize);
    },
    search() {
      this.getArtList(this.pageindex, this.pagesize, this.keyword);
    },
    // 执行修改的操作9(没有修改文章封面)
    doEdit() {
      let formData = {}
      formData.artname = this.formData.artname
      formData.author = this.formData.author
      formData.content = this.editor.txt.html()
      formData._id = this.formData._id
      updateArtByIdApi(formData).then(res => {
        const data = res.data;
        if (data.status) {
          this.$Notice.success({
            title: "修改成功!"
          });
          this.getArtList(this.pageindex, this.pagesize);
          this.value3 = false;
        } else {
          this.$Notice.success({
            title: "修改失败!"
          });
        }
      });
    },
    // 执行修改的操作9(修改文章封面)
    doEditArticle() { 
      var formData = new FormData()
      formData.append('file', this.file)
      formData.append('artname', this.formData.artname)
      formData.append('author', this.formData.author)
      formData.append('content', this.editor.txt.html())
      formData.append('id', this.formData._id)
      updateArticleApi(formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.value3 = false
          this.getArtList(this.pageindex, this.pagesize)
          this.file = null
        } else {
          this.$Notice.error({
            title: '修改失败'
          })
        }
      })
    },
    // 阻止文件自动上传
    handleBeforeUpload(file) {
      this.file = file;
      return false
    },
    // 上传文章
    addArticle() {
      var formData = new FormData()
      formData.append('file', this.file)
      formData.append('artname', this.formData.artname)
      formData.append('author', this.formData.author)
      formData.append('content', this.editor.txt.html())
      if (this.file == null) {
        this.$Notice.info({
          title: '必须上传文章封面'
        })
        return false
      }
      addArticleApi(formData).then(res => {
        // console.log(res.data)
        const data = res.data
        if (data.status) {
          this.$Notice.success({
            title: '发布成功'
          })
          this.value3 = false
          this.getArtList(this.pageindex, this.pagesize)
        } else {
          this.$Notice.error({
            title: '发布失败'
          })
        }
      })
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
  .toolbar {
    border: 1px solid #ccc !important;
  }
  .text {
    border: 1px solid #ccc !important;
    height: 400px !important;
  }
}
</style>
