import Vue from 'vue'
import '../public/static/style/common.scss'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import 'element-ui/lib/theme-chalk/index.css'
// import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'echarts-gl'
// import '../public/static/style/common.scss'
// import './assets/style/common/common.css'
import './assets/style/font/iconfont.css'
// import 'element-ui/lib/theme-chalk/display.css'
import store from './store/index'
import axios from 'axios'
import router from './router/index'

//import 'vue2-animate/dist/vue2-animate.min.css';
// import 'babel-polyfill'
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

// Vue.use(ElementUI);
//温馨提示注意同步修改ueditor.config.js

// Vue.prototype.apiRoot = 'http://192.168.1.248:8083/dataDisplay/'//kun
Vue.prototype.apiRoot = 'http://192.168.1.252:8082/dataDisplay/'//su


// Vue.prototype.apiRoot ='http://my.ityyedu.com/alarmSystem/';

// Vue.prototype.apiRoot ='http://10.94.68.188:8086/alarmSystem/'; //这是打包的地址

// Vue.prototype.apiRoot ='http://10.94.68.187:80/dataDisplay/'; //这是打包的地址
// Vue.prototype.apiRoot ='http://10.94.68.188:8082/dataDisplay/'; //这是打包的地址





//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
//axios.defaults.withCredentials=true;

// http request 拦截器
axios.interceptors.request.use(function (config) {
  if (store.getters.Token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization= store.getters.Token
  }
//	console.log(response)
  return config;
}, function (error) {
//	console.log(error)
  return Promise.reject(error);
});


//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// http response 拦截器
axios.interceptors.response.use(function (response) {
//  console.log('全局的拦截测试，好简单')
//	console.log(response.data.code==1000000)
  if(response.data.code==1000000){

//		console.log(store.state.userName)
    store.state.userName='';
    store.state.userId='';
    store.state.userAuth='';
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userAuth');
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('breadcrumbHistory');
//		console.log(store.state.userName)
    app.$router.push({ path: '/login'});

  }
  // if(response.data.access=='unauthorized'){
  //     console.log(response.data.access)
  //     app.$notify.error({
  //         title: '错误',
  //         message: '你没有权限进行此项操作！！！'
  //     });
  //     throw "你没有权限进行此项操作！！！";

  // }
  return response;
}, function (error) {
//		console.log(error)

//		console.log(error.response.status)
//			if(error)
//			this.$router.replace({path: '/403'})
  return Promise.reject(error);
});





/**权限指令**/


var app=new Vue({
  el: '#app',
  router,//使用路由
  store,//使用store
  render: h => h(App),
  data:{
    eventHub:new Vue(),//添加事件中心
  },

})