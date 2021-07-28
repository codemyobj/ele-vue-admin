import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import("../views/login");
const Home = () => import("../views/home");
const Welcome = () => import("../views/welcome");
const Users = () => import('../views/users')
const Roles = () => import('../views/power/Roles.vue')
const Rights = () => import('../views/power/Rights.vue')
const GoodsList = () => import('../views/goods/GoodsList.vue')
const GoodsParams = () => import('../views/goods/GoodsParams.vue')
const GoodsCategory = () => import('../views/goods/GoodsCategory.vue')
const AddGoods = () => import('../views/goods/AddGoods.vue')
const Order = () => import('../views/orders')

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children: [
      { path: "/welcome", component: Welcome },
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights },
      { path: '/goods', component: GoodsList },
      { path: '/params', component: GoodsParams },
      { path: '/categories', component: GoodsCategory },
      { path: '/goods/add', component: AddGoods },
      { path: '/orders', component: Order },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
