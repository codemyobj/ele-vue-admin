export function loginRequst({ username, password }) {
  return request({
    url: "login",
    method: "post",
    params: {
      username,
      password
    }
  }).catch(err => err);
}
