import Vue from "vue"
import { baseCart } from "@/network/cart.js"
export default {
	
	isCart({ state, commit }, goodsInfo) {
		let TAG = state.cart.find(item => item.id == goodsInfo.goods.id);
		if(goodsInfo.isFinish) {
			baseCart('addCart', goodsInfo).then(res => commit('setCart', res.data));
		}else if(TAG) {
			TAG.count += goodsInfo.count;
			TAG.goods = TAG;
			console.log(TAG)
			baseCart('setCount', TAG).then(res => commit('setCart', res.data));
		}else {
			baseCart('addCart', goodsInfo).then(res => commit('setCart', res.data));
		}
	}
}