export function getOrderList(queryInfo) {
  return request({
    url: 'orders',
    method: 'get',
    params: queryInfo
  }).catch(err => err)
}
