import request from '@/utils/request'
import qs from 'qs';
export function getFolderView(fid) {
	return request({ // Promise
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: 'homeController/getFolderView.ajax',
		method: 'post',
		data: {
			fid
		},
	})
}

export function selectInCompletePath(fid, keyworld) {
	return request({ // Promise
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: '/homeController/sreachInCompletePath.ajax',
		method: 'post',
		data: { //	fid : locationpath, keyworld : keyworld
			fid,
			keyworld
		},
	})
}

export function getPackTime(strIdList, strFidList) {
	return request({ // Promise
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: '/homeController/getPackTime.ajax',
		method: 'post',
		data: { //	fid : locationpath, keyworld : keyworld
			strIdList,
			strFidList
		},
	})
}

export function downloadCheckedFiles(strIdList, strFidList) {
	return request({ // Promise
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: '/homeController/downloadCheckedFiles.ajax',
		method: 'post',
		data: { //	fid : locationpath, keyworld : keyworld
			strIdList,
			strFidList
		},
	})
}

export function downloadCheckedFilesZip(zipId) {
	return request({ // Promise
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		transformRequest: [function(data) {
			data = qs.stringify(data);
			return data;
		}],
		url: '/homeController/downloadCheckedFilesZip.do',
		method: 'post',
		data: { //	fid : locationpath, keyworld : keyworld
			zipId 
		},
	})
}
