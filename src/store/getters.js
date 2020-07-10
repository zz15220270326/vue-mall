export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}

// const getters = {
//   cartLength(state) {
//     return state.cartList.length
//   },
//   cartCount(state, getters) {
//     return getters.cartList.length
//   }
// }
// export default getters