import request from '@/utils/request';
import qs from 'qs';
export function getPrePicture(fileId) {
	return request({ // Promise

		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: 'homeController/getPrePicture.ajax',
		method: 'post',
		data: {
			fileId
		}
	})
}
