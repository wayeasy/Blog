<template>
  <div class="user-list">
    <div class="search">
      <div class="search-wrapper">
        <i-input size="large" placeholder="搜索" v-model="keyword"></i-input>
        <div class="search-button" @click="search">搜索</div>
        <Icon type="ios-search"></Icon>
      </div>
      <Button type="primary" class="addBtn" @click="addLink">添加链接</Button>
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
        <Drawer :title="drawerTitle" v-model="value3" width="720" :mask-closable="false" :styles="styles">
          <Form :model="formData" ref="formData" :rules="ruleValidate">
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="站长" label-position="top" prop="stationmaster">
                  <Input v-model="formData.stationmaster" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="linkname" label-position="top" prop="linkname">
                  <Input v-model="formData.linkname" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="linkurl" label-position="top" prop="linkurl">
                  <Input v-model="formData.linkurl" placeholder="请输入"/>
                </FormItem>
              </Col>
            </Row>
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
import { addLinkApi, getLinkListApi, deleteLinkApi, getLinkInfoByIdApi, updateLinkByIdApi } from "@/api/link";
import moment from "moment";
import mixin from "@/mixin"
export default {
  mixins: [mixin],
  data() {
    return {
      drawerTitle: '',
      value3: false,
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      formData: {
        stationmaster: "",
        linkname: "",
        linkurl: "",
      },
      keyword: "",
      pageindex: 1,
      pagesize: 10,
      columns7: [
        {
          title: "stationmaster",
          key: "stationmaster"
        },
        {
          title: "链接名称",
          key: "linkname"
        },
        {
          title: "链接地址",
          key: "linkurl"
        },
        {
          title: "添加时间",
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
    this.getLinkList(this.pageindex, this.pagesize);
  },
  methods: {
    // 点击添加按钮
    addLink() {
      this.value3 = true
      this.drawerTitle = '新增链接'
      this.formData.linkname = ''
      this.formData.linkurl = ''
      this.formData.stationmaster = ''
    },
    doAddLink() {
      let formData = {}
      formData.linkurl = this.formData.linkurl
      formData.linkname = this.formData.linkname
      formData.stationmaster = this.formData.stationmaster
      addLinkApi(formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$Notice.success({
            title: '添加成功'
          })
          this.getLinkList(this.pageindex, this.pagesize);
          this.value3 = false
        } else {
          this.$Notice.error({
            title: '添加失败'
          })
        }
      })
    },
    getLinkList(pageindex, pagesize, keyword) {
      let params = {};
      params.pageindex = pageindex;
      params.pagesize = pagesize;
      params.keyword = keyword;
      getLinkListApi(params)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.total = data.total;
            this.data6 = data.data;
            for (let item of data.data) {
              // item.sex == 1 ? (item.sex = "男") : (item.sex = "女");
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
    // 点击编辑按钮
    edit(params) {
      this.value3 = true;
      this.drawerTitle = '编辑链接'
      getLinkInfoByIdApi(params._id).then(res => {
        const data = res.data;
        if (data.status) {
          this.formData = data.data;
        } else {
          this.$Notice.error({
            title: "请求失败!"
          });
        }
      });
    },
    delete(params) {
      deleteLinkApi(params._id)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.$Notice.success({
              title: "删除成功!"
            });
            this.getLinkList(this.pageindex, this.pagesize);
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
      this.getUserList(pageindex, this.pagesize);
    },
    changeSize(pagesize) {
      this.getUserList(this.pageindex, pagesize);
    },
    search() {
      this.getLinkList(this.pageindex, this.pagesize, this.keyword);
    },
    // 执行修改的操作
    doEdit() {
      updateLinkByIdApi(this.formData).then(res => {
        const data = res.data
        if (data.status) {
          this.$Notice.success({
            title: '修改成功!'
          })
          this.getLinkList(this.pageindex, this.pagesize)
          this.value3 = false
        } else {
          this.$Notice.success({
            title: '修改失败!'
          })
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          if (this.drawerTitle == '新增链接') {
            this.doAddLink()
          } else {
            this.doEdit()
          }
        } else {
          this.$Message.error("Fail!");
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
    .addBtn {
      position: absolute;
      right: 0;
      top: 4px;
    }
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
