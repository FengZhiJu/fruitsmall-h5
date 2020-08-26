
import { request } from "./request.js"

export function getDetailData(id){
	return request('/detail/' + id);
}
