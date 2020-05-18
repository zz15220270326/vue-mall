//首页数据请求
import {request} from "./request";

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}