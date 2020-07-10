<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      /*message: {
        type: String,
        default() {
          return ''
        }
      },
      show: {
        type: Boolean,
        default: false
      }*/
    },
    data() {
      return {
        message: '',
        show: false
      }
    },
    methods: {
      showToast(message = 'default', duration = 2000) {
        this.show = true;
        this.message = message
        setTimeout(() => {
          this.show = false;
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0, 0.6);
    color: #fff;
    padding: 8px 10px;
    align-items: center;
    z-index: 999;
  }
</style>