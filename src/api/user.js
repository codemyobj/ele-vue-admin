export function getUserList(queryInfo) {
  return request({
    url: 'users',
    method: 'get',
    params: queryInfo
  }).catch(err => err)
}

export function addUserList(addForm) {
  return request({
    url: 'users',
    method: 'post',
    data: addForm
  }).catch(err => err)
}

export function userStateChange(userInfo) {
  return request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  }).catch(err => err)
}