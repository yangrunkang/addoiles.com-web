import Vue from 'vue'; //引入vue模块
import store from './store/store';//集中式管理仓库
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';
import Routers from './router/router'; // 引入路由配置文件
import Util from './libs/util';
import Index from './index.vue'; // //引入vue组件

import 'iview/dist/styles/iview.css'; // 使用 CSS

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Util);

// axios教程:http://blog.csdn.net/binginsist/article/details/65630547
// Promise API:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Vue.prototype.axios = axios;

//###########################dev#############################################
axios.defaults.baseURL = 'http://localhost:8081/addoiles.com';
//图片上传url dev
Vue.prototype.uploadImage = 'http://localhost:8081/addoiles.com/uploadImage';
//###########################dev_end#########################################

//###########################prd#############################################
//axios.defaults.baseURL = 'http://www.addoiles.com:8081/addoiles.com-1.3';
//图片上传url prd
//Vue.prototype.uploadImage = 'http://www.addoiles.com:8081/addoiles.com-1.3/';
//###########################prd_end#########################################
//工具类
Vue.prototype.addoileUtil = Util;

//图灵机器人
Vue.prototype.tulingAPI = "http://www.tuling123.com/openapi/api";
Vue.prototype.tulingKey = "cce3e88c3a84482794a41a114df5c027";//已加密

Vue.config.productionTip = false; // 关闭生产模式下给出的提示

// 路由配置
const RouterConfig = {
	mode: 'history',
	routes: Routers
};
//vue router
const router = new VueRouter(RouterConfig);

/**
 * @param to    到那个url去
 * @param from  从那个url来
 */
router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	Util.title(to.meta.title);
	next();
});

/**
 * @param to    到那个url去
 * @param from  从那个url来
 */
router.afterEach((to, from, next) => {
	iView.LoadingBar.finish();
	window.scrollTo(0, 0); 
});

/**
 * 请求拦截器
 */
axios.interceptors.request.use(function (req) {
	console.log(req);
	let urlMethod = req.url.substring(req.url.lastIndexOf('/') + 1,req.url.length);
	console.log(urlMethod);
    return req
}, function (error) {
    return Promise.reject(error)
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function (resp) {

    return resp
}, function (error) {
    return Promise.reject(error)
});

new Vue({ // 创建一个 Vue 的根实例
	el: '#app', //挂载id,这个实例下所有的内容都会在index.html 一个id为app的div下显示
	store: store,//使用仓库
	router: router, // 注入路由配置
	render: h => h(Index)
});