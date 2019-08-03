<template>
  <div class="details">
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
          <input type="text" class="search-input" placeholder="搜索">
          <Icon type="ios-search-outline"/>
        </div>
        <a class="aBtn msgBtn" href="#" @click="handleGo('index', $event)">留言</a>
        <!-- <a class="aBtn msgBtn" href="#" @click="handleGo('index', $event)">登录</a>
        <a class="aBtn msgBtn" href="#" @click="handleGo('reg', $event)">注册</a>-->
      </header>
    </div>
    <div class="main">
      <div class="main-mbl"></div>
      <p class="title">{{articleInfo.artname}}</p>
      <p class="author">
        <span style="color:#b96641">{{catename}}</span>&emsp;{{articleInfo.createDate}}
      </p>
      <div class="content" v-html="articleInfo.content"></div>
    </div>
    <!-- 留言 -->
    <div class="leave-message">
      <div class="leave-mbl"></div>
      <Input type="textarea" placeholder="Enter something..." :rows="7"/>
      <p style="text-align:right;padding-top:10px;">
        <Button type="primary" size="large">确定</Button>
      </p>
      <p style="font-size:14px;">
        <span>全部留言</span>&emsp;&emsp;
        <span style="color:#ff7f21">5</span>
      </p>
      <div class="message">
        <div class="name-time">
          <div class="name">苏泽东</div>
          <div class="time">2019-01-01 14:26</div>
        </div>
        <p>
          敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。
          自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！
        </p>
      </div>
      <div class="message">
        <div class="name-time">
          <div class="name">苏泽东</div>
          <div class="time">2019-01-01 14:26</div>
        </div>
        <p>
          敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。
          自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！
        </p>
      </div>
      <div class="message">
        <div class="name-time">
          <div class="name">苏泽东</div>
          <div class="time">2019-01-01 14:26</div>
        </div>
        <p>
          敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。
          自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！
        </p>
      </div>
      <div class="message">
        <div class="name-time">
          <div class="name">苏泽东</div>
          <div class="time">2019-01-01 14:26</div>
        </div>
        <p>敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不</p>
      </div>
      <Page :total="100" show-total/>
    </div>
  </div>
</template>
<script>
import { getArtInfoByIdApi } from "@/api/article";
import { getCateListApi } from "@/api/artCate";
import moment from "moment";
export default {
  data () {
    return {
      artId: this.$route.query.artId,
      catename: this.$route.query.catename,
      articleInfo: {},
      cateList: [],
    }
  },
  created () {
    this.getArticleInfo()
    this.getCateList()
  },
  mounted() {
    // window.removeEventListener('scroll')
    // window.removeEventListener('scroll')
  },
  methods: {
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
    // 获取文章信息
    getArticleInfo() {
      getArtInfoByIdApi(this.artId).then(res => {
        // console.log(111, res.data)
        const data = res.data
        if (data.status) {
          data.data.createDate = moment(data.data.createDate).format('YYYY-MM-DD HH:mm')
          this.articleInfo = data.data
        }
      })
    }
  }
};
</script>
<style lang="less">
.details {
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
    min-height: 900px;
    width: 1032px;
    margin: auto;
    margin-top: 70px;
    box-shadow: 0 0 10px #ccc;

    .main-mbl {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../../public/b1.jpg") 50% center no-repeat fixed;
      filter: blur(10px);
      z-index: -1;
    }
    .title {
      text-align: center;
      font-weight: 550;
      padding: 12px;
    }
    .author {
      text-align: center;
      // margin-top: 15px;
    }
    .content {
      padding: 20px;
      // height: 20px;
    }
  }
  .leave-message {
    box-shadow: 0 0 10px #ccc;
    width: 1032px;
    position: relative;
    min-height: 300px;
    margin: 0 auto;
    margin-top: 20px;
    padding-bottom: 50px;
    padding: 30px;
    border-radius: 4px;
    .leave-mbl {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("../../public/b1.jpg") 50% center no-repeat fixed;
      filter: blur(20px);
      z-index: -1;
    }
    .ivu-page {
      margin-top: 30px;
      text-align: center;
      // margin-bottom: 50px;
    }
    .message {
      width: 100%;
      padding-top: 90px;
      padding-bottom: 30px;
      // margin-bottom:20px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      .name-time {
        overflow: hidden;
        margin-bottom: 15px;
        .name {
          width: 100px;
          float: left;
        }
        .time {
          width: 150px;
          text-align: right;
          float: right;
        }
      }
    }
  }
}
</style>
