import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
export default {
  addToCart(context, payload) {
    //  1. 循环遍历
    //  判断是否有之前的商品
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // // 判断oldProduct
    // if (oldProduct) {
    //   oldProduct.count += 1
    // }
    // else {
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
    // 2. indexOf()
    // 3. find()
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断商品是否已经存在
      if (oldProduct) {
        // oldProduct.count ++
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1！')
      }
      else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品成功！')
      }
    }))

  }
}