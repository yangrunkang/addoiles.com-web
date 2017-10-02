import Vue from 'vue'; //引入vue模块
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';
import Routers from './router'; // 引入路由配置文件
import Util from './libs/util';
import Index from './views/index.vue'; // //引入vue组件

import 'iview/dist/styles/iview.css'; // 使用 CSS

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Util);

// axios教程:http://blog.csdn.net/binginsist/article/details/65630547
// Promise API:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://localhost:8081/addoiles.com';

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

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	Util.title(to.meta.title);
	next();
});

router.afterEach((to, from, next) => {
	iView.LoadingBar.finish();
	window.scrollTo(0, 0);
});

new Vue({ // 创建一个 Vue 的根实例
	el: '#app', //挂载id,这个实例下所有的内容都会在index.html 一个id为app的div下显示
	router: router, // 注入路由配置
	render: h => h(Index)
});