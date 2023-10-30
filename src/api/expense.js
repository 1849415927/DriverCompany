import request from '@/utils/request'

export function selectList(data) {
  return request({
    url: 'http://58.87.91.31:8088/expense/selectList',
    method: 'get',
    data
  })
}

export function expenseApproval(data) {
  return request({
    url: 'http://58.87.91.31:8088/expense/expenseApproval',
    method: 'put',
    data
  })
}
