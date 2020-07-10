<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button
         class="check-button"
         :is-checked="isSelectAll"
         @click.native="checkClick"/>
      <span >全选</span>
    </div>
    <span class="total-price">合计：{{totalPrice}}</span>
    <div class="is-selected" @click="isCount">去计算 ({{itemNumbers}})</div>
  </div>
</template>

<script>
  // import components
  import CheckButton from "./CheckButton";
  // import mapGetters
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '$' + this.cartList.filter(item => {
          return item.checked
        }).reduce((previousValue,item) => {
          return previousValue + item.price * item.count
        }, 0).toFixed(2)
      },
      itemNumbers() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) {
          return false
        }
        // return !this.cartList.filter(item => !item.checked).length
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        /*console.log('checkClick');*/
        if (this.isSelectAll) {
          for (let item of this.cartList) {
            item.checked = false
          }
        }
        else {
          for (let item of this.cartList) {
            item.checked = true
          }
        }
      },
      isCount() {
        if(!this.isSelectAll) {
          this.$toast.showToast('请在首页选择商品! ', 1000)
          setTimeout(() => {
            this.$router.replace('/home')
          }, 1000)
        }
        else {
          this.$toast.showToast('正在跳转...', 1000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height:44px;
    position: fixed;
    bottom: 50px;
    align-items: center;
    line-height: 44px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: #333333;
    display: flex;
  }
  .select-all {
    height: 44px;
    font-size: 13px;
    margin-left: 5px;
    align-items: center;
    display: flex;
    padding: 7px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-left: 3px;
    margin-right: 7px;
  }

  .total-price {
    flex: 1;
    color: orangeRed;
    font-size: 15px;
    margin-left: 40px;
    font-weight: bold;
  }
  .is-selected {
    width: 75px;
    height: 100%;
    color: #fff;
    text-align: center;
    background-color: darkorange;
    font-size: 13px;
    /*border-radius: 25%;*/
  }
</style>