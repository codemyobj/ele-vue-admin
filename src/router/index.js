import Vue from "vue";
import VueRouter from "vue-router";

const login = () => import("../views/login.vue");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: login
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
