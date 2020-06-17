//导入Axios
import Axios from "axios";


export function request(config,success,failure) {
  //1. 创建Axios的实例
  const instance1 = Axios.create({
    baseURL: "http://123.207.32.32:8000",

    timeout: 5000
  })
  //2-1. 请求拦截
  instance1.interceptors.request.use(config =>{
    // console.log(config); //将config拦截，需要若想要接收需return
    return config
  },error => {
    console.log(error);
  })
  // console.log('--------------------------');
  //2-2. 响应拦截
  instance1.interceptors.response.use(
    result => {
      // console.log(result.data);
      return result.data
    },
    error => {
      console.log(error);
    })
  //3. 发送真正的网络请求
  return instance1(config)
}




