//引入vue模块
import Vue from 'vue';
//集中式管理
import Vuex from 'vuex';
Vue.use(Vuex);
import Cookies from 'js-cookie';

const business = {
    state: {
        /*用户名*/
        userName: '',
        /*用户id*/
        userId: '',
        /*邮箱*/
        email:'',
        /*导航栏*/
        navList:[],
    },
    mutations: {
        setUserName (state, userName) {
            sessionStorage.setItem("userName",userName);
        },
        setUserId (state, userId) {
            sessionStorage.setItem("userId",userId);
        },
        setNavList (state, navListJson) {
            Cookies.set("navList",navListJson);
        },
        setEmail (state, email) {
            Cookies.set("email",email);
        }
    },
    getters: {
        getUserName: state => {
            //转换成String,否则有些地方判断getUserId后是Object对象
            return sessionStorage.getItem("userName")+'';
        },
        getUserId: state => {
            return sessionStorage.getItem("userId")+'';
        },
        getNavList: state => {
            return JSON.parse(Cookies.get("navList"));
        },
        getEmail: state => {
            Cookies.get("email");
        }
    },
};

export default business;
