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
                path: "proportion",
                name: '占比',
                component: () => import("../views/Proportion"),
            },
            {
                path: "list",
                name: '分类列表',
                component: () => import("../views/List"),
            },
            {
                path : 'details',
                name : '案件详情',
                component : ()=> import("../views/details")

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


//通过全局导航守卫检查权限？
router.beforeEach((to, from, next) => {
    var userAuth = sessionStorage.getItem('user');



    //	验证登录状态
    if (! userAuth && to.path !== '/login') {
        console.log('登陆成功')
        next({
            path: '/login',//离线时屏蔽
        });
    }else if(to.path == '/login' ) {

        next();

    }else{
        next();
    }
})


export default router
