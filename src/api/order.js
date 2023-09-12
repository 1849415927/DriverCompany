import request from '@/utils/request'

export function OrderList(data) {
  return request({
    url: 'http://192.168.56.1:8088/order/list',
    method: 'post',
    data
  })
}
