<template>
  <div class="index" id="index" ref="index">
    <div class="item" v-for="(item, index) in artList" :key="index">
      <div class="item-mbl"></div>
      <h4 @click="handleTitle(item._id, item.artCate.catename)">{{item.artname}}</h4>
      <div class="content" v-show="notShowDetails">
        <div class="left-content">
          <img :src="item.imgSrc" alt width="190" height="105">
        </div>
        <div class="right-content">
          <p class="content" v-html="item.content"></p>
            <!-- <span >123123</span>
            <a style="" href="#" @click="viewMore">阅读更多</a> -->
            <p class="item-bottom">{{item.artCate.catename}}&emsp;{{item.createDate}}</p> 
        </div>
      </div>
      <!-- <div class="details" v-show="showDetails">
        <span class="retract" @click="retract">收起</span>
      </div> -->
    </div>
    <div v-if="pagenum > pageindex" class="loadMore" @click="getMore"><span style="cursor:pointer">加载更多</span></div>
  </div>
</template>

<script>
import { getAdminListApi } from "@/api/admin";
import { getArtListApi, getArtInfoByCateApi } from "@/api/article";
import moment from 'moment'
export default {
  data() {
    return {
      blogInfo: {},
      pageindex: 1,
      pagesize: 10,
      artList: [],
      cate: this.$store.state.cate,
      total: 0,
      showDetails: false,
      notShowDetails: true,
      pageFlag: true,
      currentPage: 'index',
      pagenum: ''
    };
  },
  mounted() {
    this.getAdminInfo();
    this.getArtList(this.pageindex, this.pagesize);
    console.log('screenHeight', window.screen.height)
    console.log('scrollY',window.scrollY)
    console.log('indexHeight', this.$refs.index.scrollHeight);
    
  },
  methods: {
    // viewMore() {
    //   this.showDetails = true
    //   this.notShowDetails = false
    // },
    // retract() {
    //   this.showDetails = false
    //   this.notShowDetails = true
    // },
    changeIndex(pageindex) {
      this.getArtList(pageindex, this.pagesize);
    },
    getMore() {
      this.pageindex ++
      if (this.pageindex <= this.pagenum) {
        this.getArtList(this.pageindex, this.pagesize, 'loadmore')
      }
      // this.pageindex > this.pagenum ? 
      
    },
    // 获取博主信息
    getAdminInfo() {
      let data = {
        pageindex: 1,
        pagesize: 1
      };
      getAdminListApi(data).then(res => {
        // console.log(res.data)
        const data = res.data;
        if (data.status) {
          this.blogInfo = data.data[0];
        }
      });
    },
    // 获取所有文章
    getArtList(pageindex, pagesize, type) {
      const _this = this
      let flag = true
      let data = {
        pageindex: pageindex,
        pagesize: pagesize
      };
       this.pagenum ++ 
      getArtListApi(data).then(res => {
        const data = res.data;
        if (data.status) {
          for (let item of data.data) {
            item.imgSrc =
              "http://127.0.0.1:9000" + item.imgSrc.replace(/\\/g, "/");
            item.artCate = JSON.parse(item.artCate);
            item.createDate = moment(item.createDate).format('YYYY-MM-DD HH:mm')
          }
          type == 'loadmore' ? this.artList = this.artList.concat(data.data) : this.artList = data.data
          
          this.total = data.total
          // 总页数
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
    .details {
      margin-top: 14px;
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
        // vertical-align: center;
        .content {
          margin: 0;
          padding: 0;
          display: inline-block;
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
    transition: all 0.2s;
    &:hover {
      transform: scale(1.03);
    }
    // display: inline-.block;
    // cursor: pointer;
  }
}
</style>

