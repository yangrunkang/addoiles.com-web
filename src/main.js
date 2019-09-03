import Vue from 'vue'; //引入vue模块
import store from './store/store';//集中式管理仓库
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';
import Routers from './router/router'; // 引入路由配置文件
import Util from './libs/util';
import Index from './index.vue'; // //引入vue组件
import VueClipboards from 'vue-clipboards';
import 'iview/dist/styles/iview.css'; // 使用 CSS
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Vue2Editor from 'vue2-editor';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Util);
Vue.use(VueClipboards);
//经历分享和技术页面图片超出范围，在main提前导入，所有的js，css就不会丢失
//编辑页也可以去除import了，因为已经公共导入了
Vue.use(Vue2Editor);

// axios教程:http://blog.csdn.net/binginsist/article/details/65630547
// Promise API:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Vue.prototype.axios = axios;

//###########################dev#############################################
//网站网址
// axios.defaults.webSite = 'http://localhost:8080/';
//网站数据请求地址
// axios.defaults.baseURL = 'http://localhost:8081/addoiles.com';
//图片上传url dev
// Vue.prototype.uploadImage = 'http://localhost:8081/addoiles.com/uploadImage';
//###########################dev_end#########################################

//###########################prd#############################################
//网站网址
axios.defaults.webSite = 'http://www.addoiles.com/';
//网站数据请求地址
axios.defaults.baseURL = 'http://www.addoiles.com:8081/addoiles.com-1.5.3';
//图片上传url prd
Vue.prototype.uploadImage = 'http://www.addoiles.com:8081/addoiles.com-1.5.3/uploadImage';
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

//note: get 是后台manager操作
let requestUrlRegex = /^.*(add|update|delete|get|edit).[A-Za-z0-9]+$/;
/**
 * 请求拦截器
 */
axios.interceptors.request.use(function (req) {
    if(requestUrlRegex.test(req.url)){
        let userId = sessionStorage.getItem("userId");
        let tokenId = sessionStorage.getItem("tokenId");
        if(userId == null || tokenId == null){
            window.vm.$store.commit('validateLogin',window.vm);
            return Promise.reject('亲,您还未登录,已拦截您的当前请求');
        }
    }
    return req;
}, function (error) {
    return Promise.reject(error)
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function (resp) {
    //直接取到data
    let response = resp.data;

    if(response.code === 9){
        window.vm.$Notice.warning({
            title:'亲,您还未登录,已拦截您的当前请求',
            desc:'提示'
        });
        return Promise.reject('亲,您还未登录,已拦截您的当前请求');
    }else if(response.code === 2){
        window.vm.$Notice.warning({
            title:'系统异常~',
            desc:'提示'
        });
        return Promise.reject('系统异常~');
    }else if(response.code === 6){
        window.vm.$Notice.warning({
            title:'非法请求~',
            desc:'提示'
        });
        return Promise.reject('非法请求~');
    }else if(response.code === 9){
        window.vm.$Notice.warning({
            title:'令牌验证失败~',
            desc:'提示'
        });
        return Promise.reject('令牌验证失败~');
    }

    return response;
}, function (error) {
    return Promise.reject(error)
});

// 定义window for vue, 主要是做一些全局管控
Vue.prototype.window = window;

window.vm = new Vue({ // 创建一个 Vue 的根实例
    el: '#app', //挂载id,这个实例下所有的内容都会在index.html 一个id为app的div下显示
    store: store,//使用仓库
    router: router, // 注入路由配置
    render: h => h(Index)
});
