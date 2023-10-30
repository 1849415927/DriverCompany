import request from '@/utils/request'

export function OrderList(data) {
  return request({
    url: 'http://58.87.91.31:8088/order/list',
    method: 'post',
    data
  })
}
