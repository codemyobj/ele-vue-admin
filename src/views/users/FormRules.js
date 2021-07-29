let checkMobile = (rule, value, callback) => {
  const RegExpMobile = /^[1]([3-9])[0-9]{9}$/;
  if (RegExpMobile.test(value)) {
    return callback()
  }
  callback(new Error('请输入中国大陆11位手机号码'))
}

export const addRules = {
  // 添加用户的表单验证规则
  username: [
    { required: true, message: "请输入用户名称", trigger: "blur" },
    {
      min: 3,
      max: 16,
      message: "长度在 3 到 16 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: checkMobile, trigger: "blur" },
  ]
}
