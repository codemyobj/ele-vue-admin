const formRules = {
  goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
  goods_number: [{ required: true, message: '请输入库存', trigger: 'blur' }],
  goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }]
}

const addFormRules = {
  goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
  goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
  goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
  goods_cat: [{ required: true, message: '请选择商品分类', trigger: ['change', 'blur'] }]
}

const editAndAddRules = {
  attr_name: [{ required: true, message: `请输入参数名称`, trigger: 'blur' }]
}

export { formRules, addFormRules, editAndAddRules }
