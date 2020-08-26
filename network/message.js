import { request } from "./request.js"

export function getMessage(){
	return request('/message/getAllMessage', {}, 'POST')
}

export function addMessage(info){
	return request('/message/addMessage', info, 'POST')
}