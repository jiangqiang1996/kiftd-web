import request from '@/utils/request'
import qs from 'qs';

export function login(data) {
    return request({ // Promise
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
        url: 'homeController/doLogin.ajax',
        method: 'post',
        data
    })
}

export function getUserInfo(token) {
    return request({
        url: `/user/info`,
        method: 'get',
        params: {token}
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

