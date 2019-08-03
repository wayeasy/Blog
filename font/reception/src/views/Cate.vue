<template>
  <transition name="fade">
  <div class="index">
    <div class="item" v-for="(item, index) in artList" :key="index">
      <div class="item-mbl"></div>
      <h4 @click="handleTitle(item._id, item.artCate.catename)">{{item.artname}}</h4>
      <div class="content">
        <div class="left-content">
          <img :src="item.imgSrc" alt width="190" height="105">
        </div>
        <div class="right-content">
          <div class="content" v-html="item.content"></div>
          <p class="item-bottom">{{item.artCate.catename}}&emsp;{{item.createDate}}</p>
        </div>
      </div>
    </div>
    <div v-if="pagenum > pageindex" class="loadMore" @click="getMore"><span style="cursor:pointer">加载更多</span></div>
  </div>
  </transition>
</template>

<script>
import { getAdminListApi } from "@/api/admin";
import { getArtListApi, getArtInfoByCateApi } from "@/api/article";

export default {
  beforeRouteUpdate(to, from, next) {
    this.cateId = to.params.id;
    this.getArtInfoByCate(this.cateId, 1, this.pagesize);
    this.pagenum = ''
    this.pageindex = 1
    next();
  },
  data() {
    return {
      total: 0,
      pageindex: 1,
      pagesize: 2,
      blogInfo: {},
      artList: [],
      cateId: this.$route.params.id,
      catename: "",
      total: '',
      pagenum: ''
    };
  },
  created() {},
  mounted() {
    // this.getAdminInfo();
    this.artList = []
    this.getArtInfoByCate(this.cateId, this.pageindex, this.pagesize);
  },
  methods: {
    getMore() {
      this.pageindex ++
      if (this.pageindex <= this.pagenum) {
        this.getArtInfoByCate(this.cateId, this.pageindex, this.pagesize, 'loadmore')
      }
    },
    changeIndex(pageindex) {
      this.getArtInfoByCate(this.cateId, this.pageindex, this.pagesize);
    },
   
    // 根据分类获取文章
    getArtInfoByCate(cateId, pageindex, pagesize, type) {
      let data = {};
      data.pageindex = pageindex;
      data.pagesize = pagesize;
      data.cateId = cateId;
      getArtInfoByCateApi(data).then(res => {
        const data = res.data;
        if (data.status) {
          for (let item of data.data) {
            item.imgSrc =
              "http://127.0.0.1:9000" + item.imgSrc.replace(/\\/g, "/");
            item.artCate = JSON.parse(item.artCate);
            this.catename = item.artCate.catename;
          }
          // this.artList = data.data;
          type == 'loadmore' ? this.artList = this.artList.concat(data.data) : this.artList = data.data
          this.total = data.total;
          this.pagenum = Math.ceil(data.total / this.pagesize)
        }
      });
    },
    // 点击文章标题跳转到文章详情页
    handleTitle(artId, catename) {
      this.$router.push({
        name: "ArticleDetails",
        query: {
          artId: artId,
          catename: catename
        }
      });
    }
  }
};
</script>

<style lang="less">
.index {
  
  .item {
    padding: 20px;
    position: relative;
    min-height: 180px;
    box-shadow: 0 0 10px #ccc;
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
    .item-mbl {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url("../../public/b1.jpg") 50% center no-repeat fixed;
      // background: rebeccapurple;
      filter: blur(20px);
      z-index: -1;
    }
    h4 {
      cursor: pointer;
      display: inline-block;
    }
    .content {
      overflow: hidden;
      margin-top: 16px;
      .left-content {
        width: 190px;
        height: 105px;
        float: left;
        box-shadow: 0 0 5px 1px #ccc;
        img {
          border-radius: 4px;
        }
      }
      .right-content {
        width: 456px;
        float: right;
        min-height: 105px;
        padding-top: 2px;
        position: relative;
        .content {
          margin: 0;
          padding: 0;
        }
        .item-bottom {
          position: absolute;
          bottom: 1px;
          padding-top: 10px;
          color: #ad763d;
        }
      }
    }
  }
  .loadMore {
    text-align: center;
    padding: 7px;
    box-shadow: 0 0 10px #ccc;
    margin-bottom: 20px;
    // display: inline-.block;
    // cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>

