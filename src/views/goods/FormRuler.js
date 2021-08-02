export const formRules = {
  goods_name: [
    { required: true, message: "请输入商品名称", trigger: "blur" },
  ],
  goods_price: [
    { required: true, message: "请输入商品价格", trigger: "blur" },
  ],
  goods_number: [
    { required: true, message: "请输入库存", trigger: "blur" },
  ],
  goods_weight: [
    { required: true, message: "请输入商品重量", trigger: "blur" },
  ],
}