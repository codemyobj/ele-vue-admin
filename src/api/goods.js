export function getGoodsList(queryInfo) {
  return request({
    url: 'goods',
    method: 'get',
    params: queryInfo
  }).catch(err => err)
}

export function getEditGoods(id) {
  return request({
    url: 'goods/' + id,
    method: 'get'
  }).catch(err => err)
}

export function editGoodsSubmit(id, editForm) {
  return request({
    url: 'goods/' + id,
    data: editForm,
    method: 'put'
  }).catch(err => err)
}