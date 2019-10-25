import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import App from "../App";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: '登录',
    },
    {
        path: '/login',
        name: '登录',
        component: Login,
        meta: {title: "登录"}
    },
    {
        path: '/index',
        name: '',
        component: App,
        children: [
            {
                path: "home",
                name: '首页',
                component: () => import("../views/Home"),
            },
          {
            path: "pjqsjfx",
            name: '全省接警类型数据分析',
            component: () => import("../views/PJQSJFX"),
          },
            {
                path: "pjqsjfx",
                name: '全省报警方式数据分析',
                component: () => import("../views/PJQSJFX"),
            },
            {
                path: "pjqsjfx",
                name: '全省来话类型数据分析',
                component: () => import("../views/PJQSJFX"),
            },
            {
                path: "pjqfsjfx",
                name: '全省警情分类数据分析',
                component: () => import("../views/PJQFLSJFX"),
            },
        ]
    },
    /*{
      path: '/pjqsjfx',
      name: '全省警情数据分析',
      component: PJQSJFX,
    }*/
]

const router = new VueRouter({
    routes
})

export default router
