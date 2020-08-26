import { request } from "./request.js"

export function findUsername(username) {
	return request('/user/find/' + username, {}, 'POST')
}

export function sendSingup(username, password) {
	return request('/user/signup', {username, password}, 'POST')
}

export function sendLogin(username, password) {
	return request('/user/login', {username, password}, 'POST')
}

export function verifyLoginTo(){
	return request('/user/verifyLoginto', {}, 'POST')
}

export function WXVerifyoLogin(userInfo){
	return request('/user/login', userInfo, 'POST')
}

export function logout(){
	return request('/user/logout', {}, 'POST')
}

export function updateAvatar(imgHttp){
	return request('/user/avatar', { imgHttp }, 'POST')
}

// 地址相关
export function addSite(siteInfo){
	return request('/user/addSite', siteInfo, 'POST')
}

export function removeSite(siteID) {
	return request('/user/removeSite', { id : siteID}, 'POST')
}

export function defaultSite(idInfo){
	return request('/user/defaultSite', idInfo, 'POST')
}