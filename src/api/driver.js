import request from '@/utils/request'

export function DriverList(data) {
  return request({
    url: 'http://58.87.91.31:8088/driver/list',
    method: 'post',
    data
  })
}

export function importData(data) {
  return request({
    url: 'http://58.87.91.31:8088/driver/importData',
    method: 'post',
    data
  })
}
