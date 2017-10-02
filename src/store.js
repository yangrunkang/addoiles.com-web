import Vue from 'vue'; //引入vue模块
import Vuex from 'vuex'; //集中式管理

Vue.use(Vuex);

/*需要写以上内容,否则会出现Vuex is not defined的错误[核心,组件化概念]*/

export default new Vuex.Store({
    state: {
        /*管理用户状态*/
        userName: '',
        userId: '',
        sessionId: ''
    },
    mutations: {
        setUserName (state, userName) {
            state.userName = userName;
        },
        setUserId (state, userId) {
            state.userId = userId;
        },
        setSessionId (state, sessionId) {
            state.sessionId = sessionId;
        }
    },
    getters: {
        getUserName: state => {
            return state.userName;
        },
        getUserId: state => {
            return state.userId;
        },
        getSessionId: state => {
            return state.sessionId;
        }
    }
});
