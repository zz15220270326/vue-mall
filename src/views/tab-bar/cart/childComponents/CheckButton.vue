<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
          // 在模型中记录选中或者不选中 -> true / false
          // v-model
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid rgba(100,100,100,0.2);
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    /*overflow: auto;*/
  }
  .checked {
    border-radius: 50%;
    background-color: orangered;
    position: absolute;
    /*border-color: orange;*/
    top: 0;
  }
</style>