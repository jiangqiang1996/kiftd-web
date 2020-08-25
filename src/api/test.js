import request from '@/utils/request'


export function test() {
	return request({ // Promise
		url: '/resourceController/getWordView/56a4d81e-40bb-4f82-9577-b36b9bec90bb',
		method: 'get'
	})
}

export function getUserInfo(token) {
	return request({
		url: `/user/info`,
		method: 'get',
		params: {
			token
		}
	})
}

export function logout(token) {
	return request({
		url: `/user/logout`,
		method: 'post',
		data: {
			token //token: token
		}
	})
}
