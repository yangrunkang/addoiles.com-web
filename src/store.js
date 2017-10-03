import Vue from 'vue'; //引入vue模块
import Vuex from 'vuex'; //集中式管理

Vue.use(Vuex);

/*需要写以上内容,否则会出现Vuex is not defined的错误[核心,组件化概念]*/

export default new Vuex.Store({
    state: {
        /*管理用户*/
        userName: '',
        userId: '',
        /*导航栏--存储没有实际的作用,作用在于获取时做个引子,实际是获取session中的值*/
        navList:[]
    },
    mutations: {
        setUserName (state, userName) {
            sessionStorage.removeItem("userName");
            sessionStorage.setItem("userName",userName);
        },
        setUserId (state, userId) {
            sessionStorage.removeItem("userId");
            sessionStorage.setItem("userId",userId);
        },
        setNavList (state, navList) {
            sessionStorage.removeItem("navList");
            sessionStorage.setItem("navList",JSON.stringify(navList));
        }
    },
    getters: {
        getUserName: state => {
            return sessionStorage.getItem("userName")+''; ////转换成String,否则有些地方判断getUserId后是Object对象
        },
        getUserId: state => {
            return sessionStorage.getItem("userId")+''; 
        },
        getNavList: state => {
            return JSON.parse(sessionStorage.getItem("navList"));
        }

    }
});
