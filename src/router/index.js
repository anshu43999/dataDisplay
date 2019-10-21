import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login";
import Index from "../pages/index";

// import Layout from "./components/common/layout/Layout";
// import RoleAdd from "./components/authorityManagement/role/RoleAdd";



Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};




const routes = [
    {
        path: '/',
        redirect: '/login',
        name: '',
    },
    {
        path: '/login',
        name: '登录',
        component: Login,
        meta: {title: "登录"}
    },
    {
        path: '/index',
        component: Index,
        children: [
            // {
            //     path: "home",
            //     name: '首页',
            //     component: () => import("./views/Home"),
            // },
            
            


        ]
    },
   
]


const router = new Router({ routes })

//通过全局导航守卫检查权限？
// router.beforeEach((to, from, next) => {
//     var userAuth = router.app.$store.getters.userAuth


//     //	验证登录状态
//     if (!userAuth && to.path !== '/login') {
//         console.log('没登陆')
//         next({
//             path: '/login',//离线时屏蔽
//         })
//     } else if (userAuth && to.path == '/index') {
//         next()
//     } else if (to.matched.some(record => record.meta.needAuth)) {
//         //		验证用户权限
//         //		console.log('needAuth')
//         userAuth = userAuth.split(',');
//         if (!userAuth.includes(to.meta.needAuth)) {
//             console.log('没权限')
//             next({
//                 path: '/index/error403'
//             })
//         } else {
//             next()
//         }
//     } else {
//         //		console.log('最终')
//         next()
//     }
// })











export default router;
