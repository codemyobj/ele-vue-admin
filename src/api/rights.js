export function getRolesList() {
  return request({
    url: 'rights/list',
    method: 'get'
  }).catch(err => err)
}