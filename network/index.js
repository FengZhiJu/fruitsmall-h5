
import { request } from "./request.js"

export function getHomeBaseData(){
	return request('/home');
}

export function getRecommend(){
	return request('/cart/elseGoods');
}