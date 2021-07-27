export function getMenuList() {
  return request({
    url: "menus",
    method: "get"
  }).catch(err => err);
}
