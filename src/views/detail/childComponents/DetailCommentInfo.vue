<template lang="html">
  <div v-if="Object.keys(commentInfo).length !== 0" class="commentInfo">
    <div class="headerInfo">
      <div class="headerTitle">
        用户评价
      </div>
      <div class="headerMore">
        更多...
        <i class="arrowRight"></i>
      </div>
    </div>
    <div class="userInfo">
      <img :src="commentInfo.user.avatar" alt=""/>
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="detailInfo">
      <p>{{commentInfo.content}}</p>
      <div class="otherInfo">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span class="userStyle">{{commentInfo.style}}</span>
      </div>
      <div class="imageInfo">
        <img v-for="(item, index) in commentInfo.images" :src="item" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
// 引入计算日期的工具
  import { formatDate } from "@/common/utils";


export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate: function(value) {
      let date = new Date(1000*value);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created() {
    // console.log(this.commentInfo);
  }
}
</script>

<style lang="css" scoped>
  .commentInfo {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .headerInfo {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .headerTitle {
    float: left;
    font-size: 15px;
  }
  .headerMore {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .userInfo {
    padding: 10px 0 5px;
    color: darkorange;
  }
  .userInfo img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .userInfo span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .detailInfo {
    padding: 0 5px 15px;
  }
  .detailInfo p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .detailInfo .otherInfo {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .otherInfo .date {
    margin-right: 8px;
  }
  .otherInfo .userStyle{
    color: orange;
  }
  .imageInfo {
    margin-top: 10px;
  }
  .imageInfo img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
