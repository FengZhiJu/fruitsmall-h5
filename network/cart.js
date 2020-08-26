import Vue from "vue"
import { request } from "./request.js"

export function baseCart(url, params) {
	let discount = params.goods.decorate ? 0.6 : 1;
	params.totalPrice = (params.goods.price * discount * params.count).toFixed(2) * 1;
	if(url == 'setCount') {
		Vue.delete(params, 'site');
		params.timestamp = params.goods.timestamp
	} 
	Vue.delete(params, 'goods')
	console.log(params.count)
	return request('/cart/' + url, params, 'POST')
}

export function removeCart(cartInfo) {
	return request('/cart/removeCart', cartInfo, 'POST')
}