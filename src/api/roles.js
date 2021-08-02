export function getRolesList() {
  return request({
    url: 'roles',
    method: 'get'
  }).catch(err => err)
}

export function addRoleInfo(addForm) {
  return request({
    url: 'roles',
    method: 'post',
    data: addForm
  }).catch(err => err)
}

export function getRoleInfo(id) {
  return request({
    url: 'roles/' + id,
    method: 'get'
  }).catch(err => err)
}

export function editRoleInfo(editForm) {
  return request({
    url: 'roles/' + editForm.roleId,
    method: 'put',
    data: editForm

  }).catch(err => err)
}

export function removeRoleInfo(id) {
  return request({
    url: 'roles/' + id,
    method: 'delete'
  }).catch(err => err)
}

export function setRoleList() {
  return request({
    url: 'rights/tree',
    method: 'get'
  }).catch(err => err)
}

export function setRoleSure(id, rids) {
  return request({
    url: `roles/${id}/rights`,
    method: 'post',
    data: { rids }
  }).catch(err => err)
}