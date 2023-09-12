import request from '@/utils/request'

export function TruckList(data) {
  return request({
    url: 'http://192.168.56.1:8088/truck/list',
    method: 'post',
    data
  })
}
