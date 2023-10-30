import request from '@/utils/request'

export function TruckList(data) {
  return request({
    url: 'http://58.87.91.31:8088/truck/list',
    method: 'post',
    data
  })
}
