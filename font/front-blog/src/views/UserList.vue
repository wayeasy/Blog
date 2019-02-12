<template>
  <div class="user-list">
    <div class="search">
      <div class="search-wrapper">
        <i-input size="large" placeholder="搜索"></i-input>
        <div class="search-button">搜索</div>
        <Icon type="ios-search"></Icon>
      </div>
    </div>
    <div class="content">
      <template>
        <i-table border :columns="columns7" :data="data6"></i-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns7: [
        {
          title: "姓名",
          key: "name"
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
          title: "操作",
          key: "action",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  style: {
                    "margin-left": "5px"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居"
        }
      ]
    };
  },
  methods: {
    edit(params) {
      console.log(params)
    },
    saveUser() {
      // console.log(this.$axios)
      let formData = {};
      formData.username = this.formItem.username,
      formData.age = this.formItem.age;
      formData.sex = this.formItem.sex;
      formData.address = this.formItem.address,
      formData.password = this.formItem.password,
      formData.email = this.formItem.email;
      console.log(formData);
      this.$axios
        .post("http://127.0.0.1:9000/users/addUser", formData)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    show(index) {
      this.$Modal.info({
        title: "用户信息",
        content: `姓名：${this.data6[index].name}<br>年龄：${
          this.data6[index].age
        }<br>地址：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>

<style lang="less">
.user-list {
  .search {
    // text-align: center;
    // position: relative;
    .search-wrapper {
      position: relative;
      width: 240px;
      margin: 0 auto;
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
        font-size: 28px;
        position: absolute;
        top: 6px;
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
}
</style>
