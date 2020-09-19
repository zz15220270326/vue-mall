<template>
  <div class="profile">
    <!-- NavBar -->
    <nav-bar class="profile-nav-bar">
      <div slot="center">个人</div>
    </nav-bar>
    <div class="userBaseInfo" @click="ifTologin">
      <!-- 单独封装UserInfo -->
    <user-info />
    <!-- section -->
    <section class="account" >
      <div class="account-item">
        <div class="number">
          <span class="balance">---</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">---</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">---</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    </div>
    <!-- 底部整体封装 -->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  // import commonComponents
  import NavBar from "components/common/navbar/NavBar";
  // childComponents
  import UserInfo from "./childComponents/UserInfo";
  import ListView from "./childComponents/ListView";

  // import image
  /*import message from "assets/img/profile/message.svg";
  import pointer from "assets/img/profile/pointer.svg";
  import vip from "assets/img/profile/vip.svg";
  import cart from "assets/img/profile/cart.svg";
  import shopping from "assets/img/profile/shopping.svg";*/

  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data() {
      return {
        orderList: [
          {icon: require("assets/img/profile/message.svg"), iconColor: '#fff', info: '我的消息'},
          {icon: require("assets/img/profile/pointer.svg"), iconColor: '#fff', info: '积分商城'},
          {icon: require("assets/img/profile/vip.svg"), iconColor: '#fff', info: '会员卡'},
        ],
        serviceList: [
          {icon: require("assets/img/profile/cart.svg"), iconColor: '#fff', info: '我的购物车'},
          {icon: require("assets/img/profile/shopping.svg"), iconColor: '#fff', info: '下载购物APP'},
        ],
        isLogin: false
      }
    },
    methods: {
      ifTologin() {
        console.log('jump to login');
        if (!this.isLogin) {
          this.$router.replace('/login')
        }
      }
    }
  }
</script>

<style scoped>
  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 20px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
