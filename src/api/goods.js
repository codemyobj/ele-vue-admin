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

export function removeGoods(id) {
  return request({
    url: 'goods/' + id,
    method: 'delete'
  }).catch(err => err)
}

export function getCateList() {
  return request({
    url: 'categories',
    method: 'get'
  }).catch(err => err)
}

export function getManyTableData(id, type) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel: type
    }
  }).catch(err => err)
}

export function getOnlyTableData(id, type) {
  return request({
    url: `categories/${id}/attributes`,
    params: { type }
  }).catch(err => err)
}