import request from '@/utils/request'

// 列表
export function list(data) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/list',
    method: 'post',
    data
  })
}

// 新增
export function save(data) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/save',
    method: 'post',
    data
  })
}

// 修改
export function update(data) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/update',
    method: 'post',
    data
  })
}

// 详情
export function detail(id) {
  return request({
    url: `http://58.87.91.31:8088/luoJiaoyue/${id}`,
    method: 'get',
    id
  })
}

// 删除
export function deleted(idList) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/delete',
    method: 'delete',
    data: idList
  })
}

// 导入
export function importExcel(data) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/importExcel',
    method: 'post',
    data
  })
}

// 导出
export function exportExcel(data) {
  return request({
    url: 'http://58.87.91.31:8088/luoJiaoyue/exportExcel',
    method: 'post',
    responseType: 'blob',
    data
  })
}
