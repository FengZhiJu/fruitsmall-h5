import Vue from "vue"
import { request } from "./request.js"

export function getSearchEntry(entry){
	return request('/search/filter/' + entry);
}

export function getParamSearch(belong) {
	return request('/search/' + belong);
}
