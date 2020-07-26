<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <span class="privateImage-svg left">
          <img src="~assets/img/profile/avatar.svg" alt="">
        </span>
        <!--<svg class="privateImage-svg left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>-->
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录 / 注册</div>
        </slot>
        <div class="phone">
          <!--<span>-->
            <span class="icon-mobile">
              <img src="~assets/img/profile/phone.svg" alt="">
            </span>
            <!--<svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
            </svg>-->
          <!--</span>-->
          <span class="phone-span">
            <slot name="user-phone">暂无绑定手机号</slot>
          </span>
        </div>
      </div>
      <span class="arrow-svg right">
        <img src="~assets/img/common/arrow-right.svg" alt="">
      </span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  .privateImage-svg img {
    width: 60px;
    height: 60px;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
    height: 20px;
    width: 150px;
    align-items: center;
  }

  .icon-mobile img {
    width: 20px;
    height: 20px;
  }

  .phone-span {
    margin-left: 7px;
  }

  #user-info .login-info .phone .icon-mobile {
    background-color: var(--color-tint);
    position: absolute;
    width: 20px;
    height: 25px;
    left: -15px;
    top: 0;
  }
</style>