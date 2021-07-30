//请求用户数据
export function getUserList(queryInfo) {
  return request({
    url: 'users',
    method: 'get',
    params: queryInfo
  }).catch(err => err)
}

//添加用户请求
export function addUserList(addForm) {
  return request({
    url: 'users',
    method: 'post',
    data: addForm
  }).catch(err => err)
}

//修改用户状态
export function userStateChange(userInfo) {
  return request({
    url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
    method: 'put'
  }).catch(err => err)
}

//编辑用户信息
export function editUserData(id) {
  return request({
    url: 'users/' + id,
    method: 'get'
  }).catch(err => err)
}

//用户信息上传
export function userInfoChange(id, info) {
  return request({
    url: 'users/' + id,
    method: 'put',
    data: info
  }).catch(err => err)
}

//获取角色
export function getUserRole() {
  return request({
    url: 'roles',
    method: 'get'
  }).catch(err => err)
}

//保存角色
export function saveUserRole(id, rid) {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  }).catch(err => err)
}

//删除角色
export function removeUser(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  }).catch(err => err)
}