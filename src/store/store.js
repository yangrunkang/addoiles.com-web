import Vue from 'vue'; //引入vue模块
import Vuex from 'vuex'; //集中式管理
import Cookies from 'js-cookie';

Vue.use(Vuex);

/*需要写以上内容,否则会出现Vuex is not defined的错误[核心,组件化概念]*/

export default new Vuex.Store({
    state: {
        /*用户名*/
        userName: '',
        /*用户id*/
        userId: '',
        /*邮箱*/
        email:'',
        /*导航栏*/
        navList:[]
    },
    mutations: {
        setUserName (state, userName) {
            sessionStorage.setItem("userName",userName);
        },
        setUserId (state, userId) {
            sessionStorage.setItem("userId",userId);
        },
        setNavList (state, navList) {
            Cookies.set("navList",JSON.stringify(navList));
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

    }
});
