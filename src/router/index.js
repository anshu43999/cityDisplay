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
                path: "particulars",
                name: '全省占比数据分析',
                component: () => import("../views/percentage"),
                redirect: '/particulars/province',
                children :[
                    {
                        path : 'province',
                        name : '省占比数据分析',
                        component : ()=>import("../views/province")
                    },
                    {
                        path : 'city',
                        name : '市占比数据分析',
                        component: () => import("../views/city"),
                    }
            
                ]
            },
            {
                path: "home",
                name: '首页',
                component: () => import("../views/Home"),
            },
            {
                path : "handling",
                name : "执法办案",
                component : () => import("../views/Handling"),
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
                path: "pjqflsjfx",
                name: '全省警情分类数据分析',
                component: () => import("../views/PJQFLSJFX"),
                children : [
                    {
                        path : 'province_dataAnalyze',
                        name : '省警情分类数据分析',
                        component: () => import("../views/small_proRight"),
                    },
                    {
                        path : 'city_dataAnalyze',
                        name : '市警情分类数据分析',
                        component: () => import("../views/small_cityRight"),
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