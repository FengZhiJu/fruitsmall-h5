export function request(addURL, data = {}, method = 'GET') {
	return new Promise((res, rej) => {
		uni.request({
			// url: "http://localhost:3000/api" + addURL,
			url: "http://39.101.173.169/api" + addURL,
			method,
			data,
			withCredentials: true,
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				// #ifdef MP-WEIXIN
				'Cookie': uni.getStorageSync('cookies')
				// #endif
			},
			success(data) {
				res(data);
			}
		})
	})
}
