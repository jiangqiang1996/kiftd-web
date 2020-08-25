import request from '@/utils/request';
import qs from 'qs';
export function getDownloadURL(fId) {
	return request({ // Promise

		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: '/externalLinksController/getDownloadKey.ajax',
		method: 'post',
		data: {
			fId
		}
	})
}
