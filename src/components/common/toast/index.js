// 导入Toast组件
import Toast from "./Toast";
import Vue from "vue"
// 创建toastObject对象
const toastObject = {}
toastObject.install = function () {
  /*console.log('toast install', vue);
  document.body.appendChild(Toast.$el)
  Vue.prototype.$toast = Toast;*/
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2. 根据组件构造器new一个组件对象
  const toast = new toastConstructor()
  // 3. 将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4. toast.$el挂载到上述元素中
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
// .....
export default toastObject