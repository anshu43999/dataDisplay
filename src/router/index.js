import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import App from "../App";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};




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
                redirect: '/pjqsjfx/province_dataAnalyze',
                children : [
                    {
                        path : 'province_dataAnalyze',
                        name : '省接警类型数据分析',
                        component: () => import("../views/big_proRight"),
                    },
                    {
                        path : 'city_dataAnalyze',
                        name : '市接警类型数据分析',
                        component: () => import("../views/big_cityRight"),
                    }
                ]
            },
            {
                path: "pjqsjfx",
                name: '全省报警方式数据分析',
                component: () => import("../views/PJQSJFX"),
                children : [
                    {
                        path : 'province_dataAnalyze',
                        name : '省报警方式数据分析',
                        component: () => import("../views/big_proRight"),
                    },
                    {
                        path : 'city_dataAnalyze',
                        name : '市报警方式数据分析',
                        component: () => import("../views/big_cityRight"),
                    }
                ]
            },
            {
                path: "pjqsjfx",
                name: '全省来话类型数据分析',
                component: () => import("../views/PJQSJFX"),
                children : [
                    {
                        path : 'province_dataAnalyze',
                        name : '省来话类型数据分析',
                        component: () => import("../views/big_proRight"),
                    },
                    {
                        path : 'city_dataAnalyze',
                        name : '市来话类型数据分析',
                        component: () => import("../views/big_cityRight"),
                    }
                ]
            },
            {
                path: "pjqfsjfx",
                name: '全省警情分类数据分析',
                component: () => import("../views/PJQFLSJFX"),

                children : [
                    {
                        path : 'province_dataAnalyze',
                        name : '省接警类型数据分析',
                        component: () => import("../views/PJQFLSJFX"),
                    },
                    {
                        path : 'city_dataAnalyze',
                        name : '市接警类型数据分析',
                        component: () => import("../views/PJQFLSJFX"),
                    }
                ]
            }
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
