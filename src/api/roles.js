export function getRolesList() {
  return request({
    url: 'roles',
    method: 'get'
  }).catch(err => err)
}