import request from '@/utils/request'


export function getPublicKey() {
    return request({ // Promise
        url: 'homeController/getPublicKey.ajax',
        method: 'post',
        data: {

        }
    })
}

export function ping() {
    return request({ // Promise
        url: 'homeController/ping.ajax',
        method: 'post',
        data: {

        }
    })
}
export function getServerOS() {
    return request({ // Promise
        url: '/homeController/getServerOS.ajax',
        method: 'post',
        data: {

        }
    })
}
