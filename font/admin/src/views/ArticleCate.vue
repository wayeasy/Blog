<template>
  <div class="user-list">
    <div class="search">
      <div class="search-wrapper">
        <i-input size="large" placeholder="搜索" v-model="keyword"></i-input>
        <div class="search-button" @click="search">搜索</div>
        <Icon type="ios-search"></Icon>
      </div>
      <Button type="primary" class="addBtn" @click="addCate">新增分类</Button>
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
                <FormItem label="分类名" label-position="top" prop="catename">
                  <Input v-model="formData.catename" placeholder="请输入"/>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="是否启用" label-position="top" prop="orderNum"><br>
                  <i-switch v-model="formData.isEnable" size="large" @on-change="isEnable" :false-value="false" :true-value="true">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="排序号" label-position="top" prop="orderNum"><br>
                  <InputNumber :max="10" :min="1" v-model="formData.orderNum"></InputNumber>
                </FormItem>
              </Col>
              
            </Row>
            <FormItem label="分类描述" label-position="top">
              <Input type="textarea" v-model="formData.description" :rows="4" placeholder="请输入" />
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
import { addCateApi, getCateListApi, deleteCateApi, getCateInfoByIdApi, updateCateByIdApi } from "@/api/artCate";
import moment from "moment";
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
        catename: "",
        orderNum: 1,
        description: "",
        isEnable: true
      },
      keyword: "",
      pageindex: 1,
      pagesize: 10,
      columns7: [
        {
          title: "分类名",
          key: "catename"
        },
        {
          title: "排序",
          key: "orderNum"
        },
        {
          title: "分类描述",
          key: "description"
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
      total: 0
    };
  },
  created() {
    this.getCateList(this.pageindex, this.pagesize);
  },
  methods: {
    // 是否启用分类
    isEnable(status) {
      // console.log(status);
      status ? this.formData.isEnable = 1 : this.formData.status = 0
    },
    // 点击新增按钮
    addCate() {
      this.value3 = true;
      this.drawerTitle = "新增分类";
      this.$refs['formData'].resetFields();
      this.formData.description = ''
    },
    doAddCate() {
      let formdata = {};
      formdata.catename = this.formData.catename;
      formdata.orderNum = this.formData.orderNum;
      formdata.description = this.formData.description;
      formdata.isEnable = this.formData.isEnable;
      formdata.isEnable ? formdata.isEnable = 1 : formdata.isEnable = 0
      addCateApi(formdata).then(res => {
        // console.log(res.data)
        const data = res.data;
        if (data.status) {
          this.$Notice.success({
            title: "添加成功"
          });
          this.value3 = false
          this.getCateList(this.pageindex, this.pagesize)
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
          if (this.drawerTitle == "新增分类") {
            this.doAddCate();
          } else {
            this.doEdit()
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    getCateList(pageindex, pagesize, keyword) {
      let params = {};
      params.pageindex = pageindex;
      params.pagesize = pagesize;
      params.keyword = keyword;
      getCateListApi(params)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.total = data.total;
            this.data6 = data.data;
            for (let item of data.data) {
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
      this.drawerTitle = "编辑分类";
      this.value3 = true;
      getCateInfoByIdApi(params._id).then(res => {
        const data = res.data;
        if (data.status) {
          
          for (let item in data.data) {
            if (item == 'isEnable') {
              data.data.isEnable == 1 ? data.data.isEnable = true : data.data.isEnable = false
            }
          }
          this.formData = data.data     
        } else {
          this.$Notice.error({
            title: "请求失败!"
          });
        }
      });
    },
    delete(params) {
      deleteCateApi(params._id)
        .then(res => {
          const data = res.data;
          if (data.status) {
            this.$Notice.success({
              title: "删除成功!"
            });
            this.getCateList(this.pageindex, this.pagesize);
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
      this.getCateList(this.pageindex, this.pagesize, this.keyword);
    },
    // 执行修改的操作
    doEdit() {
      updateCateByIdApi(this.formData).then(res => {
        const data = res.data;
        if (data.status) {
          this.$Notice.success({
            title: "修改成功!"
          });
          this.getCateList(this.pageindex, this.pagesize);
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
