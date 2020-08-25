import request from '@/utils/request';
import qs from 'qs';
export function getMusic(fileId) {
	return request({ // Promise

		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: 'homeController/playAudios.ajax',
		method: 'post',
		data: {
			fileId
		}
	})
}
